import { sendEmail } from "@/modules/verification-email/use-cases/send";
import { verifyEmail } from "@/modules/verification-email/use-cases/verify";
import { FastifyInstance } from "fastify";

export async function emailVerificationRoutes(server: FastifyInstance) {
  server.post("/send", sendEmail);
  server.post("/verify", verifyEmail);
}
