import { adminFailure, adminJson, assertAdminOrigin, authRequest, loginAdmin, requireAdmin, sessionCookie, sessionToken } from "../../../../lib/server/admin-auth";
export const dynamic = "force-dynamic";
export async function GET(request: Request) { try { return adminJson({ user: await requireAdmin(request) }); } catch (error) { return adminFailure(error); } }
export async function POST(request: Request) { try { return await loginAdmin(request); } catch (error) { return adminFailure(error); } }
export async function DELETE(request: Request) { try { assertAdminOrigin(request); const token = sessionToken(request); if (token) await authRequest("logout?scope=local", { method: "POST" }, token).catch(() => {}); return adminJson({ ok: true }, 200, { "set-cookie": sessionCookie(request, "", 0) }); } catch (error) { return adminFailure(error); } }
