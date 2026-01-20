export const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  // CSP simple para empezar. Puedes endurecerla en producción.
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; " +
    "style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';"
};