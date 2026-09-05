export type FieldErrors = Record<string, string>;

export class FormValidationError extends Error {
  readonly fields: FieldErrors;

  constructor(fields: FieldErrors) {
    super("The submitted form contains invalid fields.");
    this.name = "FormValidationError";
    this.fields = fields;
  }
}

export function readText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function positiveInteger(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number(readText(value, 12));
  return Number.isSafeInteger(parsed) && parsed > 0 && parsed <= 2147483647 ? parsed : null;
}

export function assertValid(fields: FieldErrors): void {
  if (Object.keys(fields).length > 0) throw new FormValidationError(fields);
}

export function normalizeEmail(value: string): string {
  return value.toLowerCase();
}

export function safePagePath(value: unknown, fallback: string): string {
  const path = readText(value, 500);
  return path.startsWith("/") && !path.startsWith("//") ? path : fallback;
}
