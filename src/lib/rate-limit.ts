const rateMap = new Map<string, { count: number; reset: number }>();

export function rateLimit(
  key: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): { allowed: boolean } {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || now > entry.reset) {
    rateMap.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false };
  }

  entry.count++;
  return { allowed: true };
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of Array.from(rateMap.entries())) {
    if (now > entry.reset) rateMap.delete(key);
  }
}, 60000);
