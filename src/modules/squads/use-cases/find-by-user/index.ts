import { FastifyReply, FastifyRequest } from "fastify";
import { FindByUserController } from "./find-by-user.controller";
import { FindByUserService } from "./find-by-user.service";
import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";

export const findByUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const findByUserService = new FindByUserService(new SquadsRepositoryPrisma());
  const findByUserController = new FindByUserController(findByUserService);

  await findByUserController.handler(req, reply);
};
