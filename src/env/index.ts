import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  HOST: z.string().optional().default("0.0.0.0"),
  JWT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string().email(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  const invalid_env_var_message = "Invelid Environment Variables";
  console.error(`${invalid_env_var_message}:`, _env.error.format());
  throw new Error(`${invalid_env_var_message}.`);
}

export const env = _env.data;
