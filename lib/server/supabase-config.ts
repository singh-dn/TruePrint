type SupabaseRuntimeEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_STORAGE_BUCKET?: string;
  SUPABASE_MAX_UPLOAD_BYTES?: string;
};

export type SupabaseConfig = {
  url: string;
  serviceRoleKey: string;
  storageBucket: string;
  maxUploadBytes: number;
};

const DEFAULT_STORAGE_BUCKET = "trueprint-requirement-files";
const DEFAULT_MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export class SupabaseConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseConfigurationError";
  }
}

function readRuntimeValue(name: keyof SupabaseRuntimeEnv): string {
  const runtimeEnv = process.env as SupabaseRuntimeEnv;
  return runtimeEnv[name]?.trim() ?? "";
}

function normalizeSupabaseUrl(value: string): string {
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    throw new SupabaseConfigurationError("SUPABASE_URL must be a valid absolute URL.");
  }

  const isLocal = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
  if (parsed.protocol !== "https:" && !(isLocal && parsed.protocol === "http:")) {
    throw new SupabaseConfigurationError("SUPABASE_URL must use HTTPS outside local development.");
  }

  return parsed.toString().replace(/\/$/, "");
}

function parseUploadLimit(value: string): number {
  if (!value) return DEFAULT_MAX_UPLOAD_BYTES;

  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1024 || parsed > DEFAULT_MAX_UPLOAD_BYTES) {
    throw new SupabaseConfigurationError("SUPABASE_MAX_UPLOAD_BYTES must be between 1 KB and 8 MB.");
  }

  return parsed;
}

export function getSupabaseConfig(): SupabaseConfig {
  const url = readRuntimeValue("SUPABASE_URL");
  const serviceRoleKey = readRuntimeValue("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    throw new SupabaseConfigurationError(
      "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to the server runtime.",
    );
  }

  return {
    url: normalizeSupabaseUrl(url),
    serviceRoleKey,
    storageBucket: readRuntimeValue("SUPABASE_STORAGE_BUCKET") || DEFAULT_STORAGE_BUCKET,
    maxUploadBytes: parseUploadLimit(readRuntimeValue("SUPABASE_MAX_UPLOAD_BYTES")),
  };
}
