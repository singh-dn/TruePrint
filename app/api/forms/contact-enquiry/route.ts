import { readFormJson, formFailure, formSuccess } from "@/lib/server/form-request";
import {
  assertValid,
  isEmail,
  isPhone,
  normalizeEmail,
  readText,
  safePagePath,
  type FieldErrors,
} from "@/lib/server/form-validation";
import { insertFormRecord } from "@/lib/server/supabase-rest";
import { verifyTurnstileToken } from "@/lib/server/turnstile";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-actions";

type ContactPayload = Record<string, unknown>;

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await readFormJson(request)) as ContactPayload;

    if (readText(body.website, 200)) return formSuccess(crypto.randomUUID());

    const name = readText(body.name, 120);
    const email = normalizeEmail(readText(body.email, 254));
    const phone = readText(body.phone, 30);
    const organization = readText(body.organization, 180) || null;
    const requirement = readText(body.requirement, 3000);
    const errors: FieldErrors = {};

    if (name.length < 2) errors.name = "Please enter your full name.";
    if (!isEmail(email)) errors.email = "Please enter a valid email address.";
    if (!isPhone(phone)) errors.phone = "Please enter a valid phone number.";
    if (requirement.length < 10) errors.requirement = "Please add a little more detail about your requirement.";
    assertValid(errors);
    await verifyTurnstileToken(request, body.turnstile_token, TURNSTILE_ACTIONS.contactEnquiry);

    const result = await insertFormRecord("contact_enquiries", {
      name,
      email,
      phone,
      organization,
      requirement,
      source_page: safePagePath(body.source_page, "/contact"),
    });

    return formSuccess(result.id);
  } catch (error) {
    return formFailure(error);
  }
}
