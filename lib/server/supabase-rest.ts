import { getSupabaseConfig } from "./supabase-config";

export type FormTable =
  | "homepage_project_intakes"
  | "contact_enquiries"
  | "source_requests"
  | "diary_catalogue_downloads"
  | "visiting_cards_catalogue_downloads"
  | "pens_catalogue_downloads"
  | "joining_kits_catalogue_downloads"
  | "tech_products_catalogue_downloads"
  | "bags_catalogue_downloads"
  | "drinkware_catalogue_downloads"
  | "t_shirts_catalogue_downloads";

type SupabaseRecord = Record<string, boolean | number | string | null>;

export class SupabaseRequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "SupabaseRequestError";
    this.status = status;
  }
}

function authorizationHeaders(serviceRoleKey: string): Record<string, string> {
  return {
    apikey: serviceRoleKey,
    authorization: `Bearer ${serviceRoleKey}`,
  };
}

async function readFailure(response: Response): Promise<string> {
  const body = await response.text();
  return body.slice(0, 500) || `Supabase request failed with status ${response.status}.`;
}

export async function insertFormRecord(
  table: FormTable,
  record: SupabaseRecord,
): Promise<{ id: string }> {
  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      ...authorizationHeaders(config.serviceRoleKey),
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    throw new SupabaseRequestError(await readFailure(response), response.status);
  }

  const rows = (await response.json()) as Array<{ id?: unknown }>;
  const id = rows[0]?.id;
  if (typeof id !== "string") {
    throw new SupabaseRequestError("Supabase did not return the inserted record ID.", 502);
  }

  return { id };
}

export async function updateFormRecord(
  table: FormTable,
  filters: Record<string, string>,
  record: SupabaseRecord,
): Promise<{ id: string }> {
  const config = getSupabaseConfig();
  const query = new URLSearchParams({ select: "id" });
  Object.entries(filters).forEach(([field, value]) => query.set(field, `eq.${value}`));

  const response = await fetch(`${config.url}/rest/v1/${table}?${query.toString()}`, {
    method: "PATCH",
    headers: {
      ...authorizationHeaders(config.serviceRoleKey),
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    throw new SupabaseRequestError(await readFailure(response), response.status);
  }

  const rows = (await response.json()) as Array<{ id?: unknown }>;
  const id = rows[0]?.id;
  if (typeof id !== "string") {
    throw new SupabaseRequestError("This form session has expired or was already completed.", 409);
  }

  return { id };
}

export async function assertFormRecordExists(table: FormTable, filters: Record<string, string>): Promise<void> {
  const config = getSupabaseConfig();
  const query = new URLSearchParams({ select: "id", limit: "1" });
  Object.entries(filters).forEach(([field, value]) => query.set(field, `eq.${value}`));
  const response = await fetch(`${config.url}/rest/v1/${table}?${query}`, {
    headers: authorizationHeaders(config.serviceRoleKey),
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new SupabaseRequestError(await readFailure(response), response.status);
  const rows = (await response.json()) as Array<{ id?: unknown }>;
  if (typeof rows[0]?.id !== "string") {
    throw new SupabaseRequestError("This form session is invalid or already completed.", 409);
  }
}

function encodeObjectPath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

function safeFileName(name: string): string {
  const normalized = name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-");
  return normalized.replace(/^-+|-+$/g, "").slice(0, 100) || "reference-file";
}

async function uploadPrivateFile(
  file: File,
  directory: "project-intakes" | "source-requests",
  allowPdf: boolean,
): Promise<{ path: string; name: string }> {
  const config = getSupabaseConfig();
  if (file.size > config.maxUploadBytes) {
    throw new SupabaseRequestError(
      `Reference file must be smaller than ${Math.floor(config.maxUploadBytes / 1024 / 1024)} MB.`,
      413,
    );
  }

  const allowedType = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"].includes(file.type) || (allowPdf && file.type === "application/pdf");
  if (!allowedType) {
    throw new SupabaseRequestError(
      allowPdf ? "Only images and PDF files are accepted." : "Only image files are accepted.",
      415,
    );
  }

  const objectPath = `${directory}/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const response = await fetch(
    `${config.url}/storage/v1/object/${encodeURIComponent(config.storageBucket)}/${encodeObjectPath(objectPath)}`,
    {
      method: "POST",
      headers: {
        ...authorizationHeaders(config.serviceRoleKey),
        "content-type": file.type || "application/octet-stream",
        "x-upsert": "false",
      },
      body: file,
      signal: AbortSignal.timeout(20_000),
    },
  );

  if (!response.ok) {
    throw new SupabaseRequestError(await readFailure(response), response.status);
  }

  return { path: objectPath, name: file.name };
}

export function uploadRequirementFile(file: File): Promise<{ path: string; name: string }> {
  return uploadPrivateFile(file, "project-intakes", true);
}

export function uploadSourceRequestFile(file: File): Promise<{ path: string; name: string }> {
  return uploadPrivateFile(file, "source-requests", false);
}

export async function deleteRequirementFile(path: string): Promise<void> {
  try {
  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/storage/v1/object/${encodeURIComponent(config.storageBucket)}`, {
    method: "DELETE",
    headers: {
      ...authorizationHeaders(config.serviceRoleKey),
      "content-type": "application/json",
    },
    body: JSON.stringify({ prefixes: [path] }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error("Unable to remove orphaned Supabase upload", response.status);
  }
  } catch {
    console.error("Unable to remove orphaned Supabase upload; storage cleanup required.");
  }
}
