import { env } from "@/env";
import { UserRepositoryPrisma } from "@/repositories/prisma/authenticate-repository-prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { OAuth2Client } from "google-auth-library";
import { SocialLoginService } from "./social-login.service";
import { SocialLoginController } from "./social-login.controller";

const socialLogin = async (req: FastifyRequest, reply: FastifyReply) => {
  const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);
  const userRepository = new UserRepositoryPrisma();

  const socialLoginService = new SocialLoginService(
    userRepository,
    googleClient
  );
  const socialLoginController = new SocialLoginController(socialLoginService);

  await socialLoginController.handler(req, reply);
};

export { socialLogin };
