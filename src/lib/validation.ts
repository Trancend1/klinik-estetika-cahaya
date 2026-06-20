export function isValidDate(value: string): boolean {
  if (!value) return false;
  const d = new Date(value);
  return !isNaN(d.getTime());
}

const PHONE_REGEX = /^62\d{8,15}$/;

export function isValidPhone(value: string): boolean {
  if (!value) return false;
  const cleaned = value.trim().replace(/[\s\-]/g, "");
  return PHONE_REGEX.test(cleaned);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  if (!value) return false;
  return EMAIL_REGEX.test(value.trim());
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
