import { EmailVerificationRepositoryPrisma } from "@/repository/prisma/email-verification-repository-prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { SendVerificationEmailService } from "./send.service";
import { SendVerificationEmailController } from "./send.controller";

const sendEmail = async (req: FastifyRequest, reply: FastifyReply) => {
  const emailVerificationRepository = new EmailVerificationRepositoryPrisma();

  const sendVerificationEmailService = new SendVerificationEmailService(
    emailVerificationRepository
  );
  const sendVerificationEmailController = new SendVerificationEmailController(
    sendVerificationEmailService
  );

  await sendVerificationEmailController.handler(req, reply);
};

export { sendEmail };
