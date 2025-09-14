import { FastifyRequest, FastifyReply } from "fastify";
import { MeController } from "./me.controller";
import { MeService } from "./me.service";
import { UsersRepositoryPrisma } from "@/repositories/prisma/users-repository-prisma";

export const me = async (req: FastifyRequest, reply: FastifyReply) => {
  const usersRepository = new UsersRepositoryPrisma();
  const meService = new MeService(usersRepository);
  const meController = new MeController(meService);

  return meController.handler(req, reply);
};
