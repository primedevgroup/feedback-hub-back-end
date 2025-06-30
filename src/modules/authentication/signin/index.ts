import { UserRepositoryPrisma } from "@/repositories/prisma/authenticate-repository-prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { SignInService } from "./signin.service";
import { SignInController } from "./signin.controller";

const authenticationSignIn = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const userRepository = new UserRepositoryPrisma();

  const signInService = new SignInService(userRepository);
  const signInController = new SignInController(signInService);

  await signInController.handler(req, reply);
};

export { authenticationSignIn };
