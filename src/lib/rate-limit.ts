/**
 * Simple in-process sliding-window rate limiter.
 *
 * PRODUCTION NOTE: this state lives in the memory of a single server
 * instance. That's fine for a single long-running Node server (e.g. a
 * container on Render/Railway/a VM), but it does NOT share state across
 * multiple instances or serverless invocations — on a platform that scales
 * horizontally (Vercel functions, multiple containers behind a load
 * balancer), each instance gets its own counter, so the *effective* limit
 * is `MAX_REQUESTS_PER_WINDOW * instanceCount`, not the configured value.
 *
 * If you deploy behind more than one instance, swap this for a shared store
 * — Upstash Redis (`@upstash/ratelimit` + `@upstash/redis`) is a drop-in
 * that works well on serverless and requires no infrastructure to run:
 *
 *   import { Ratelimit } from '@upstash/ratelimit';
 *   import { Redis } from '@upstash/redis';
 *   const ratelimit = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(5, '10 m') });
 *   const { success } = await ratelimit.limit(key);
 *
 * Until then, this keeps the contact form and login route safe from casual
 * abuse on a single-instance deployment.
 */

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

// Periodically drop buckets with no recent activity so this Map can't grow
// unbounded over the life of a long-running process.
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.timestamps.length === 0 || now - bucket.timestamps[bucket.timestamps.length - 1] > CLEANUP_INTERVAL_MS) {
      buckets.delete(key);
    }
  }
}

/**
 * Returns true if `key` has exceeded `maxRequests` within the trailing
 * `windowMs` milliseconds, and records the current attempt either way.
 */
export function isRateLimited(key: string, windowMs: number, maxRequests: number): boolean {
  const now = Date.now();
  cleanup(now);

  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= maxRequests) {
    buckets.set(key, bucket);
    return true;
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return false;
}

/** Exposed for tests only. */
export function _resetRateLimitStateForTests() {
  buckets.clear();
  lastCleanup = Date.now();
}
