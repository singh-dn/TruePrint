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
import { resolveCatalogueDownloadTable } from "@/lib/server/catalogue-download-config";
import { insertFormRecord } from "@/lib/server/supabase-rest";
import { verifyTurnstileToken } from "@/lib/server/turnstile";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-actions";

type CataloguePayload = Record<string, unknown>;

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await readFormJson(request)) as CataloguePayload;

    if (readText(body.website, 200)) return formSuccess(crypto.randomUUID());

    const name = readText(body.name, 120);
    const email = normalizeEmail(readText(body.email, 254));
    const phone = readText(body.phone, 30);
    const categoryKey = readText(body.category_key, 60);
    const catalogueSlot = readText(body.catalogue_slot, 120);
    const catalogueTitle = readText(body.catalogue_title, 180);
    const catalogueUrl = readText(body.catalogue_url, 1000);
    const table = resolveCatalogueDownloadTable(categoryKey);
    const errors: FieldErrors = {};

    if (name.length < 2) errors.name = "Please enter your full name.";
    if (!isEmail(email)) errors.email = "Please enter a valid email address.";
    if (!isPhone(phone)) errors.phone = "Please enter a valid phone number.";
    if (!table) errors.category_key = "A valid catalogue category is required.";
    if (!catalogueSlot) errors.catalogue_slot = "Catalogue slot is required.";
    if (!catalogueTitle) errors.catalogue_title = "Catalogue title is required.";
    if (!catalogueUrl.startsWith("https://")) errors.catalogue_url = "A valid catalogue URL is required.";
    assertValid(errors);
    await verifyTurnstileToken(request, body.turnstile_token, TURNSTILE_ACTIONS.catalogueDownload);

    const result = await insertFormRecord(table!, {
      name,
      email,
      phone,
      category_key: categoryKey,
      catalogue_slot: catalogueSlot,
      catalogue_title: catalogueTitle,
      catalogue_url: catalogueUrl,
      source_page: safePagePath(body.source_page, "/categories"),
    });

    return formSuccess(result.id);
  } catch (error) {
    return formFailure(error);
  }
}
