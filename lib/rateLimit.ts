type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string) {
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || "60000");
  const max = Number(process.env.RATE_LIMIT_MAX || "30");

  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }

  if (existing.count >= max) {
    return { ok: false, remaining: 0, retryAfterMs: existing.resetAt - now };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { ok: true, remaining: max - existing.count };
}