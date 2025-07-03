import { UsersRepositoryPrisma } from "@/repositories/prisma/users-repository-prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { SignUpController } from "./signup.controller";
import { SignUpService } from "./signup.service";

const authenticationSignUp = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const userRepository = new UsersRepositoryPrisma();

  const signUpService = new SignUpService(userRepository);
  const signUpController = new SignUpController(signUpService);

  await signUpController.handler(req, reply);
};

export { authenticationSignUp };
