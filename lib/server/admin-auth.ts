import { getSupabaseConfig, SupabaseConfigurationError } from "./supabase-config";
import { FormRequestError, readFormJson } from "./form-request";
export class AdminError extends Error { constructor(message: string, readonly status: number) { super(message); } }
export const ADMIN_HEADERS = { "cache-control": "no-store, private, max-age=0", "pragma": "no-cache", "x-robots-tag": "noindex, nofollow, noarchive", "x-content-type-options": "nosniff", "referrer-policy": "no-referrer", "vary": "Cookie" };
export function adminJson(value: unknown, status = 200, extra: Record<string, string> = {}) { return Response.json(value, { status, headers: { ...ADMIN_HEADERS, ...extra } }); }
export function adminFailure(error: unknown) {
  if (error instanceof AdminError || error instanceof FormRequestError) return adminJson({ message: error.message }, error.status);
  if (error instanceof SupabaseConfigurationError) return adminJson({ message: "Admin access is not configured on this server yet." }, 503);
  console.error("Admin request failed", error instanceof Error ? error.name : "UnknownError");
  return adminJson({ message: "The admin service is temporarily unavailable. Please retry." }, 503);
}
function adminIds() { const ids = (process.env.TRUEPRINT_ADMIN_USER_IDS || "").split(",").map(x => x.trim()).filter(Boolean); if (!ids.length) throw new AdminError("Admin access is not configured on this server yet.", 503); return ids; }
export function adminConfigured() { try { getSupabaseConfig(); adminIds(); return true; } catch { return false; } }
function cookieName(request: Request) { return new URL(request.url).protocol === "https:" ? "__Host-trueprint-admin" : "trueprint-admin-local"; }
export function sessionCookie(request: Request, token: string, maxAge: number) { return `${cookieName(request)}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`; }
export function sessionToken(request: Request) { const name = cookieName(request); const raw = (request.headers.get("cookie") || "").split(";").map(x => x.trim()).find(x => x.startsWith(`${name}=`))?.slice(name.length + 1); if (!raw || raw.length > 12000) return ""; try { return decodeURIComponent(raw); } catch { return ""; } }
export function assertAdminOrigin(request: Request) { if (request.headers.get("origin") !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") throw new AdminError("This action must be made from the admin page.", 403); }
export async function authRequest(path: string, init: RequestInit = {}, token?: string) { const config = getSupabaseConfig(); return fetch(`${config.url}/auth/v1/${path}`, { ...init, headers: { apikey: config.serviceRoleKey, "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}), ...init.headers }, cache: "no-store", signal: AbortSignal.timeout(12_000) }); }
export async function requireAdmin(request: Request) {
  const token = sessionToken(request); if (!token) throw new AdminError("Please sign in to continue.", 401);
  const ids = adminIds(); const response = await authRequest("user", {}, token);
  if (!response.ok) throw new AdminError(response.status >= 500 || response.status === 429 ? "Sign-in verification is temporarily unavailable." : "Your session has expired. Please sign in again.", response.status >= 500 || response.status === 429 ? 503 : 401);
  const user = await response.json() as { id?: string; email?: string; email_confirmed_at?: string };
  if (!user.id || !user.email_confirmed_at || !ids.includes(user.id)) throw new AdminError("This account does not have admin access.", 403);
  return { id: user.id, email: user.email || "Admin" };
}
export async function loginAdmin(request: Request) {
  assertAdminOrigin(request); const ids = adminIds(); const body = await readFormJson(request);
  if (typeof body.email !== "string" || typeof body.password !== "string" || body.email.length > 254 || !body.email.trim() || body.password.length > 256 || !body.password) throw new AdminError("Enter your email and password.", 400);
  const response = await authRequest("token?grant_type=password", { method: "POST", body: JSON.stringify({ email: body.email.trim().toLowerCase(), password: body.password }) });
  if (!response.ok) throw new AdminError(response.status === 429 ? "Too many sign-in attempts. Please wait before trying again." : response.status >= 500 ? "Sign-in is temporarily unavailable." : "Unable to sign in with these credentials.", response.status === 429 ? 429 : response.status >= 500 ? 503 : 401);
  const data = await response.json() as { access_token?: string; expires_in?: number; user?: { id?: string; email?: string; email_confirmed_at?: string } };
  if (!data.access_token || !data.user?.id || !data.user.email_confirmed_at || !ids.includes(data.user.id)) { if (data.access_token) await authRequest("logout?scope=local", { method: "POST" }, data.access_token).catch(() => {}); throw new AdminError("Unable to sign in with these credentials.", 401); }
  return adminJson({ user: { email: data.user.email } }, 200, { "set-cookie": sessionCookie(request, data.access_token, Math.max(1, Math.min(Number(data.expires_in) || 3600, 3600))) });
}
