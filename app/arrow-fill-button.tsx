"use client";

import { useEffect, useRef, useState } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PointerEvent as ReactPointerEvent,
} from "react";

type SharedProps = {
  label: string;
  className?: string;
};

type ArrowFillLinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className">;

type ArrowFillButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

const COMPACT_BREAKPOINT = 1280;
const RELEASE_DELAY = 450;

function ArrowPair() {
  return (
    <>
      <svg className="afb__arrow afb__arrow--in" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
      <svg className="afb__arrow afb__arrow--out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </>
  );
}

function ArrowFillContents({ label }: { label: string }) {
  return (
    <>
      <span className="afb__label">{label}</span>
      <span className="afb__fill" aria-hidden="true" />
      <span className="afb__overlay" aria-hidden="true"><span className="afb__label">{label}</span></span>
      <span className="afb__icon" aria-hidden="true"><ArrowPair /></span>
    </>
  );
}

function useTouchPress(disabled = false) {
  const [pressed, setPressed] = useState(false);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
  }, []);

  const isCompactTouch = (event: ReactPointerEvent<HTMLElement>) =>
    !disabled && event.pointerType !== "mouse" && window.innerWidth < COMPACT_BREAKPOINT;

  const press = (event: ReactPointerEvent<HTMLElement>) => {
    if (!isCompactTouch(event)) return;
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
    releaseTimer.current = null;
    setPressed(true);
  };

  const release = (event: ReactPointerEvent<HTMLElement>) => {
    if (!isCompactTouch(event)) return;
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(() => {
      setPressed(false);
      releaseTimer.current = null;
    }, RELEASE_DELAY);
  };

  return { pressed, press, release };
}

export function ArrowFillLink({ label, className = "", onPointerDown, onPointerUp, onPointerCancel, ...props }: ArrowFillLinkProps) {
  const { pressed, press, release } = useTouchPress();

  return (
    <a
      className={`afb afb--fixed ${className}`.trim()}
      data-pressed={pressed ? "true" : undefined}
      onPointerDown={(event) => { press(event); onPointerDown?.(event); }}
      onPointerUp={(event) => { release(event); onPointerUp?.(event); }}
      onPointerCancel={(event) => { release(event); onPointerCancel?.(event); }}
      {...props}
    >
      <ArrowFillContents label={label} />
    </a>
  );
}

export function ArrowFillButton({ label, className = "", disabled = false, onPointerDown, onPointerUp, onPointerCancel, ...props }: ArrowFillButtonProps) {
  const { pressed, press, release } = useTouchPress(disabled);

  return (
    <button
      className={`afb afb--fixed ${className}`.trim()}
      data-pressed={pressed ? "true" : undefined}
      disabled={disabled}
      onPointerDown={(event) => { press(event); onPointerDown?.(event); }}
      onPointerUp={(event) => { release(event); onPointerUp?.(event); }}
      onPointerCancel={(event) => { release(event); onPointerCancel?.(event); }}
      {...props}
    >
      <ArrowFillContents label={label} />
    </button>
  );
}
