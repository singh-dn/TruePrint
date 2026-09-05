import { readFormData, formFailure, formSuccess } from "@/lib/server/form-request";
import {
  assertValid,
  isEmail,
  isPhone,
  normalizeEmail,
  readText,
  safePagePath,
  type FieldErrors,
} from "@/lib/server/form-validation";
import {
  deleteRequirementFile,
  insertFormRecord,
  uploadSourceRequestFile,
} from "@/lib/server/supabase-rest";
import { verifyTurnstileToken } from "@/lib/server/turnstile";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-actions";

export async function POST(request: Request): Promise<Response> {
  let uploadedPath: string | null = null;

  try {
    const form = await readFormData(request);

    if (readText(form.get("website"), 200)) return formSuccess(crypto.randomUUID());

    const name = readText(form.get("name"), 120);
    const email = normalizeEmail(readText(form.get("email"), 254));
    const phone = readText(form.get("phone"), 30);
    const organization = readText(form.get("organization"), 180);
    const requirement = readText(form.get("requirement"), 2400);
    const fileValue = form.get("reference");
    const referenceFile = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;
    const errors: FieldErrors = {};

    if (name.length < 2) errors.name = "Please enter your full name.";
    if (!isEmail(email)) errors.email = "Please enter a valid email address.";
    if (!isPhone(phone)) errors.phone = "Please enter a valid phone number.";
    if (organization.length < 2) errors.organization = "Please enter your organization.";
    if (requirement.length < 10) errors.requirement = "Please add a little more detail about what you are searching for.";
    assertValid(errors);
    await verifyTurnstileToken(
      request,
      form.get("turnstile_token"),
      TURNSTILE_ACTIONS.sourceRequest,
    );

    const upload = referenceFile ? await uploadSourceRequestFile(referenceFile) : null;
    uploadedPath = upload?.path ?? null;

    const result = await insertFormRecord("source_requests", {
      name,
      email,
      phone,
      organization,
      requirement,
      reference_file_path: upload?.path ?? null,
      reference_file_name: upload?.name ?? null,
      reference_file_type: referenceFile?.type || null,
      reference_file_size: referenceFile?.size ?? null,
      source_page: safePagePath(form.get("source_page"), "/"),
    });

    return formSuccess(result.id);
  } catch (error) {
    if (uploadedPath) await deleteRequirementFile(uploadedPath);
    return formFailure(error);
  }
}
