import { FormValidationError } from "./form-validation";
import { SupabaseConfigurationError } from "./supabase-config";
import { SupabaseRequestError } from "./supabase-rest";
import {
  TurnstileConfigurationError,
  TurnstileServiceError,
  TurnstileVerificationError,
} from "./turnstile";

const MAX_JSON_BYTES = 32 * 1024;
const MAX_MULTIPART_BYTES = 9 * 1024 * 1024;

async function readBoundedBody(request: Request, kind: "json" | "multipart"): Promise<Response> {
  assertFormRequest(request, kind);
  const contentType = request.headers.get("content-type") || "";
  const expected = kind === "json" ? "application/json" : "multipart/form-data";
  if (contentType.split(";")[0].trim().toLowerCase() !== expected) {
    throw new FormRequestError("Unsupported form submission format.", 415);
  }
  const limit = kind === "json" ? MAX_JSON_BYTES : MAX_MULTIPART_BYTES;
  const reader = request.body?.getReader();
  const chunks: Uint8Array<ArrayBuffer>[] = [];
  let size = 0;
  if (reader) {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > limit) {
          await reader.cancel().catch(() => {});
          throw new FormRequestError("The submitted form is too large.", 413);
        }
        chunks.push(new Uint8Array(value));
      }
    } finally {
      reader.releaseLock();
    }
  }
  return new Response(new Blob(chunks), { headers: { "content-type": contentType } });
}

export async function readFormJson(request: Request): Promise<Record<string, unknown>> {
  const body = await readBoundedBody(request, "json");
  try {
    const value: unknown = await body.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value as Record<string, unknown>;
  } catch {
    throw new FormRequestError("Invalid JSON form body.", 400);
  }
}

export async function readFormData(request: Request): Promise<FormData> {
  const body = await readBoundedBody(request, "multipart");
  try {
    return await body.formData();
  } catch {
    throw new FormRequestError("Invalid multipart form body.", 400);
  }
}

export function assertFormRequest(request: Request, kind: "json" | "multipart"): void {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    throw new FormRequestError("Cross-origin form submissions are not accepted.", 403);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  const limit = kind === "json" ? MAX_JSON_BYTES : MAX_MULTIPART_BYTES;
  if (contentLength > limit) {
    throw new FormRequestError("The submitted form is too large.", 413);
  }
}

export class FormRequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "FormRequestError";
    this.status = status;
  }
}

export function formSuccess(id: string): Response {
  return Response.json({ ok: true, id }, { status: 201 });
}

export function formFailure(error: unknown): Response {
  if (error instanceof FormValidationError) {
    return Response.json(
      { ok: false, code: "validation_error", fields: error.fields },
      { status: 422 },
    );
  }

  if (error instanceof FormRequestError) {
    return Response.json(
      { ok: false, code: "submission_failed", message: error.message },
      { status: error.status },
    );
  }

  if (error instanceof TurnstileVerificationError) {
    return Response.json(
      {
        ok: false,
        code: "bot_verification_failed",
        message: "Please complete the security verification and try again.",
      },
      { status: 403 },
    );
  }

  if (error instanceof TurnstileConfigurationError) {
    console.error(error.message);
    return Response.json(
      { ok: false, code: "service_unavailable", message: "Security verification is not configured yet." },
      { status: 503 },
    );
  }

  if (error instanceof TurnstileServiceError) {
    console.error("Turnstile verification service failed", error.message);
    return Response.json(
      { ok: false, code: "service_unavailable", message: "Security verification is temporarily unavailable." },
      { status: 503 },
    );
  }

  if (error instanceof SupabaseRequestError) {
    console.error("Supabase form request failed", error.status);
    return Response.json(
      { ok: false, code: "submission_failed", message: "We could not save your requirement. Please try again." },
      { status: error.status >= 400 && error.status < 500 ? error.status : 502 },
    );
  }

  if (error instanceof SupabaseConfigurationError) {
    console.error(error.message);
    return Response.json(
      { ok: false, code: "service_unavailable", message: "Enquiry service is not configured yet." },
      { status: 503 },
    );
  }

  console.error("Unexpected form submission error", error);
  return Response.json(
    { ok: false, code: "submission_failed", message: "We could not save your requirement. Please try again." },
    { status: 500 },
  );
}
