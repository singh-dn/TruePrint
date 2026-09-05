import {
  readFormJson,
  readFormData,
  FormRequestError,
  formFailure,
  formSuccess,
} from "@/lib/server/form-request";
import {
  assertValid,
  isEmail,
  isPhone,
  normalizeEmail,
  positiveInteger,
  readText,
  safePagePath,
  type FieldErrors,
} from "@/lib/server/form-validation";
import {
  deleteRequirementFile,
  assertFormRecordExists,
  insertFormRecord,
  updateFormRecord,
  uploadRequirementFile,
} from "@/lib/server/supabase-rest";
import { verifyTurnstileToken } from "@/lib/server/turnstile";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-actions";

type IntakePayload = Record<string, unknown>;

function createContinuationToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashToken(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

async function startIntake(request: Request): Promise<Response> {
  const body = (await readFormJson(request)) as IntakePayload;

  if (readText(body.website, 200)) return formSuccess(crypto.randomUUID());

  const name = readText(body.name, 120);
  const email = normalizeEmail(readText(body.email, 254));
  const phone = readText(body.phone, 30);
  const requirement = readText(body.requirement, 3000);
  const errors: FieldErrors = {};

  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (!isPhone(phone)) errors.phone = "Please enter a valid phone number.";
  if (requirement.length < 10) errors.requirement = "Please add a little more detail about your requirement.";
  assertValid(errors);
  await verifyTurnstileToken(request, body.turnstile_token, TURNSTILE_ACTIONS.projectIntake);

  const continuationToken = createContinuationToken();
  const result = await insertFormRecord("homepage_project_intakes", {
    name,
    email,
    phone,
    requirement,
    source_page: safePagePath(body.source_page, "/"),
    completion_status: "incomplete",
    completion_token_hash: await hashToken(continuationToken),
    status: "incomplete",
  });

  return Response.json(
    { ok: true, id: result.id, continuation_token: continuationToken },
    { status: 201 },
  );
}

async function completeIntake(request: Request): Promise<Response> {
  const form = await readFormData(request);

  if (readText(form.get("website"), 200)) return formSuccess(crypto.randomUUID());

  const intakeId = readText(form.get("intake_id"), 80);
  const continuationToken = readText(form.get("continuation_token"), 160);
  const quantity = positiveInteger(form.get("quantity"));
  const organization = readText(form.get("organization"), 180) || null;
  const consent = form.get("consent") === "true" || form.get("consent") === "on";
  const errors: FieldErrors = {};

  if (!isUuid(intakeId)) errors.intake_id = "This form session is invalid.";
  if (continuationToken.length < 40) errors.continuation_token = "This form session has expired.";
  if (!quantity) errors.quantity = "Please enter a valid estimated quantity.";
  if (!consent) errors.consent = "Consent is required before submitting.";
  assertValid(errors);

  const filters = {
    id: intakeId,
    completion_token_hash: await hashToken(continuationToken),
    completion_status: "incomplete",
  };
  await assertFormRecordExists("homepage_project_intakes", filters);

  let uploadedPath: string | null = null;
  try {
    const fileValue = form.get("reference");
    const referenceFile = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;
    const upload = referenceFile ? await uploadRequirementFile(referenceFile) : null;
    uploadedPath = upload?.path ?? null;

    const result = await updateFormRecord(
      "homepage_project_intakes",
      filters,
      {
        estimated_quantity: quantity,
        organization,
        reference_file_path: upload?.path ?? null,
        reference_file_name: upload?.name ?? null,
        reference_file_type: referenceFile?.type || null,
        reference_file_size: referenceFile?.size ?? null,
        consent: true,
        completion_status: "complete",
        completion_token_hash: null,
        status: "new",
        completed_at: new Date().toISOString(),
        source_page: safePagePath(form.get("source_page"), "/"),
      },
    );

    return formSuccess(result.id);
  } catch (error) {
    if (uploadedPath) await deleteRequirementFile(uploadedPath);
    throw error;
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) return await startIntake(request);
    if (contentType.includes("multipart/form-data")) return await completeIntake(request);
    throw new FormRequestError("Unsupported form submission format.", 415);
  } catch (error) {
    return formFailure(error);
  }
}
