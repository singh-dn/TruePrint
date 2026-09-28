import { NextResponse } from "next/server";
export function middleware() { const response = NextResponse.next(); response.headers.set("Cache-Control", "no-store, private, max-age=0"); response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive"); response.headers.set("X-Frame-Options", "DENY"); response.headers.set("Content-Security-Policy", "frame-ancestors 'none'; object-src 'none'; base-uri 'self'"); response.headers.set("Referrer-Policy", "no-referrer"); return response; }
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
