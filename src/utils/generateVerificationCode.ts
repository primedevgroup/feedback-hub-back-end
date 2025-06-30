import { randomInt } from "node:crypto";

export function generateVerificationCode(): string {
  return randomInt(100000, 999999).toString(); // Ex: 6 dígitos
}
