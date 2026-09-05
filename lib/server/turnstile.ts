import type { TurnstileAction } from "../turnstile-actions";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_TOKEN_LENGTH = 2048;

type TurnstileResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export class TurnstileConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TurnstileConfigurationError";
  }
}

export class TurnstileVerificationError extends Error {
  constructor(message = "Security verification failed.") {
    super(message);
    this.name = "TurnstileVerificationError";
  }
}

export class TurnstileServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TurnstileServiceError";
  }
}

function readSecret(): string {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";
  if (!secret || secret === "your-turnstile-secret-key") {
    throw new TurnstileConfigurationError(
      "TURNSTILE_SECRET_KEY is not configured in the server runtime.",
    );
  }
  return secret;
}

function readAllowedHostnames(request: Request): Set<string> {
  const configured = process.env.TURNSTILE_ALLOWED_HOSTNAMES?.trim() ?? "";
  const hostnames = configured
    .split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  if (hostnames.length > 0) return new Set(hostnames);
  return new Set([new URL(request.url).hostname.toLowerCase()]);
}

function readClientIp(request: Request): string {
  const cloudflareIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cloudflareIp) return cloudflareIp.slice(0, 64);

  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedIp?.slice(0, 64) ?? "";
}

export async function verifyTurnstileToken(
  request: Request,
  tokenValue: unknown,
  expectedAction: TurnstileAction,
): Promise<void> {
  const token = typeof tokenValue === "string" ? tokenValue.trim() : "";
  if (!token || token.length > MAX_TOKEN_LENGTH) {
    throw new TurnstileVerificationError();
  }

  const body = new URLSearchParams({
    secret: readSecret(),
    response: token,
    idempotency_key: crypto.randomUUID(),
  });
  const remoteIp = readClientIp(request);
  if (remoteIp) body.set("remoteip", remoteIp);

  let response: Response;
  try {
    response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    throw new TurnstileServiceError(
      error instanceof Error ? error.message : "Turnstile verification request failed.",
    );
  }

  if (!response.ok) {
    throw new TurnstileServiceError(
      `Turnstile verification service returned status ${response.status}.`,
    );
  }

  const result = (await response.json()) as TurnstileResponse;
  const hostname = result.hostname?.trim().toLowerCase() ?? "";
  const hostnameAllowed = hostname && readAllowedHostnames(request).has(hostname);

  if (!result.success || result.action !== expectedAction || !hostnameAllowed) {
    throw new TurnstileVerificationError();
  }
}
