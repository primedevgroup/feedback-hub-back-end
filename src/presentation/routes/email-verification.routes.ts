import { sendEmail } from "@/modules/verification-email/send";
import { FastifyInstance } from "fastify";

export async function emailVerificationRoutes(server: FastifyInstance) {
  server.post("/send", sendEmail);
}
