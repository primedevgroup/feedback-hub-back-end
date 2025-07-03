import { EmailVerificationRepositoryPrisma } from "@/repositories/prisma/email-verification-repository-prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { SendVerificationEmailService } from "./send.service";
import { SendVerificationEmailController } from "./send.controller";
import { UsersRepositoryPrisma } from "@/repositories/prisma/users-repository-prisma";

const sendEmail = async (req: FastifyRequest, reply: FastifyReply) => {
  const emailVerificationRepository = new EmailVerificationRepositoryPrisma();
  const userRepository = new UsersRepositoryPrisma();

  const sendVerificationEmailService = new SendVerificationEmailService(
    emailVerificationRepository,
    userRepository
  );
  const sendVerificationEmailController = new SendVerificationEmailController(
    sendVerificationEmailService
  );

  await sendVerificationEmailController.handler(req, reply);
};

export { sendEmail };
