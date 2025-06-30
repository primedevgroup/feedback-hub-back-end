import { EmailVerificationRepositoryPrisma } from "@/repositories/prisma/email-verification-repository-prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { VerifyVerificationCodeService } from "./verify.service";
import { VerifyVerificationCodeController } from "./verify.controller";
import { UserRepositoryPrisma } from "@/repositories/prisma/authenticate-repository-prisma";

const verifyEmail = async (req: FastifyRequest, reply: FastifyReply) => {
  const userRepository = new UserRepositoryPrisma();
  const emailVerificationRepository = new EmailVerificationRepositoryPrisma();

  const verifyVerificationCodeService = new VerifyVerificationCodeService(
    userRepository,
    emailVerificationRepository
  );
  const verifyVerificationCodeController = new VerifyVerificationCodeController(
    verifyVerificationCodeService
  );

  await verifyVerificationCodeController.handler(req, reply);
};

export { verifyEmail };
