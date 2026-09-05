"use client";

import { useEffect, useRef, useState } from "react";
import type { TurnstileAction } from "@/lib/turnstile-actions";

const SCRIPT_ID = "trueprint-turnstile-script";
const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const finish = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Cloudflare Turnstile did not become available."));
    };
    const fail = () => reject(new Error("Cloudflare Turnstile could not be loaded."));
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", fail, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", fail, { once: true });
    document.head.appendChild(script);
  }).catch((error) => {
    scriptPromise = null;
    throw error;
  });

  return scriptPromise;
}

type TurnstileWidgetProps = {
  action: TurnstileAction;
  onToken: (token: string) => void;
  resetSignal?: number;
  theme?: "light" | "dark";
  compact?: boolean;
};

export default function TurnstileWidget({
  action,
  onToken,
  resetSignal = 0,
  theme = "light",
  compact = false,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [message, setMessage] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

  onTokenRef.current = onToken;

  useEffect(() => {
    if (!siteKey || siteKey === "your-turnstile-site-key") {
      setMessage("Security verification will be available after the Cloudflare site key is configured.");
      onTokenRef.current("");
      return;
    }

    let cancelled = false;
    setMessage("");
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme,
          size: "flexible",
          appearance: "interaction-only",
          callback: (token: string) => {
            setMessage("");
            onTokenRef.current(token);
          },
          "error-callback": () => {
            setMessage("Security verification could not be completed. Please try again.");
            onTokenRef.current("");
          },
          "expired-callback": () => {
            setMessage("Security verification expired. Please verify again.");
            onTokenRef.current("");
          },
          "timeout-callback": () => {
            setMessage("Security verification timed out. Please try again.");
            onTokenRef.current("");
          },
        });
      })
      .catch(() => {
        if (cancelled) return;
        setMessage("Security verification could not be loaded. Please refresh and try again.");
        onTokenRef.current("");
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [action, siteKey, theme]);

  useEffect(() => {
    if (!widgetIdRef.current || !window.turnstile) return;
    window.turnstile.reset(widgetIdRef.current);
    onTokenRef.current("");
  }, [resetSignal]);

  return (
    <div
      className={`turnstileShell${compact ? " turnstileShellCompact" : ""}`}
      data-turnstile-action={action}
    >
      <div className="turnstileWidget" ref={containerRef} />
      {message && <p className="turnstileMessage" role="status">{message}</p>}
    </div>
  );
}
