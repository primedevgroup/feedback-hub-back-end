import { env } from "@/env";
import { UsersRepositoryPrisma } from "@/repositories/prisma/users-repository-prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { OAuth2Client } from "google-auth-library";
import { SocialLoginService } from "./social-login.service";
import { SocialLoginController } from "./social-login.controller";

const socialLogin = async (req: FastifyRequest, reply: FastifyReply) => {
  const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);
  const userRepository = new UsersRepositoryPrisma();

  const socialLoginService = new SocialLoginService(
    userRepository,
    googleClient
  );
  const socialLoginController = new SocialLoginController(socialLoginService);

  await socialLoginController.handler(req, reply);
};

export { socialLogin };
