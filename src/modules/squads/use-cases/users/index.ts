import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";
import { UsersRepositoryPrisma } from "@/repositories/prisma/users-repository-prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

export const users = async (
  req: FastifyRequest<{ Params: { squadId: string } }>,
  reply: FastifyReply
) => {
  const squadsRepository = new SquadsRepositoryPrisma();
  const usersRepository = new UsersRepositoryPrisma();

  const usersService = new UsersService(squadsRepository, usersRepository);
  const usersController = new UsersController(usersService);

  await usersController.handler(req, reply);
};
