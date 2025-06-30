import { AuthenticateRepositoryPrisma } from "@/repository/prisma/authenticate-repository-prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { SignUpController } from "./signup.controller";
import { SignUpService } from "./signup.service";

const authenticationSignUp = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const authenticateRepository = new AuthenticateRepositoryPrisma();

  const signUpService = new SignUpService(authenticateRepository);
  const signUpController = new SignUpController(signUpService);

  await signUpController.handler(req, reply);
};

export { authenticationSignUp };
