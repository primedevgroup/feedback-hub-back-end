import { sendEmail } from "@/modules/verification-email/send";
import { verifyEmail } from "@/modules/verification-email/verify";
import { FastifyInstance } from "fastify";

export async function emailVerificationRoutes(server: FastifyInstance) {
  server.post("/send", sendEmail);
  server.post("/verify", verifyEmail);
}
