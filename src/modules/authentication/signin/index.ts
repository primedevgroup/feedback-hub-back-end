import { AuthenticateRepositoryPrisma } from "@/repository/prisma/authenticate-repository-prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { SignInService } from "./signin.service";
import { SignInController } from "./signin.controller";

const authenticationSignIn = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const authenticateRepository = new AuthenticateRepositoryPrisma();

  const signInService = new SignInService(authenticateRepository);
  const signInController = new SignInController(signInService);

  await signInController.handler(req, reply);
};

export { authenticationSignIn };
