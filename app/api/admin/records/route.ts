import { adminFailure, adminJson, assertAdminOrigin, requireAdmin } from "../../../../lib/server/admin-auth";
import { changeStatus, getRecords } from "../../../../lib/server/admin-data";
import { readFormJson } from "../../../../lib/server/form-request";
export const dynamic = "force-dynamic";
export async function GET(request: Request) { try { await requireAdmin(request); return adminJson(await getRecords(new URL(request.url).searchParams)); } catch (error) { return adminFailure(error); } }
export async function PATCH(request: Request) { try { assertAdminOrigin(request); await requireAdmin(request); return adminJson({ row: await changeStatus(await readFormJson(request)) }); } catch (error) { return adminFailure(error); } }
