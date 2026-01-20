import { NextRequest, NextResponse } from "next/server";
import { securityHeaders } from "./lib/securityHeaders";
import { checkRateLimit } from "./lib/rateLimit";

export const config = {
  matcher: ["/api/:path*"]
};

export function middleware(req: NextRequest) {
  const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown";
  const key = `${ip}:${req.nextUrl.pathname}`;

  const rl = checkRateLimit(key);
  if (!rl.ok) {
    return new NextResponse(
      JSON.stringify({
        ok: false,
        message:
          "Estamos recibiendo muchas solicitudes. Por favor intenta de nuevo en un momento."
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((rl.retryAfterMs || 1000) / 1000))
        }
      }
    );
  }

  const res = NextResponse.next();
  for (const [k, v] of Object.entries(securityHeaders)) res.headers.set(k, v);
  return res;
}