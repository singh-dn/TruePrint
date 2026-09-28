import { adminFailure, adminJson, requireAdmin } from "../../../../lib/server/admin-auth";
import { getOverview } from "../../../../lib/server/admin-data";
export const dynamic = "force-dynamic";
export async function GET(request: Request) { try { await requireAdmin(request); return adminJson({ tables: await getOverview() }); } catch (error) { return adminFailure(error); } }
