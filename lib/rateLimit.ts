import { NextRequest } from "next/server";

interface WindowCounter {
  count: number;
  windowStartMs: number;
}

const WINDOW_MS = 60_000;
const MAX_BUCKETS = 5_000;
const BUCKET_IDLE_MS = 10 * 60_000;

const buckets = new Map<string, WindowCounter>();

function pruneStaleBuckets(now: number): void {
  if (buckets.size < MAX_BUCKETS) return;
  buckets.forEach((bucket, key) => {
    if (now - bucket.windowStartMs > BUCKET_IDLE_MS) {
      buckets.delete(key);
    }
  });
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function consumeRate(
  key: string,
  limitPerMinute: number,
  now: number = Date.now()
): RateLimitResult {
  pruneStaleBuckets(now);

  const existing = buckets.get(key);
  if (!existing || now - existing.windowStartMs >= WINDOW_MS) {
    buckets.set(key, { count: 1, windowStartMs: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > limitPerMinute) {
    const resetAtMs = existing.windowStartMs + WINDOW_MS;
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((resetAtMs - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || "unknown";
}
