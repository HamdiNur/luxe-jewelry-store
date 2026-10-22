export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Enter a password.";
  if (value.length < 8) return "Use at least 8 characters.";
  return undefined;
}

// Safely pulls a readable message out of whatever error Clerk returns.
export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const e = error as { longMessage?: string; message?: string };
    if (e.longMessage) return e.longMessage;
    if (e.message) return e.message;
  }
  return "Something went wrong. Please try again.";
}