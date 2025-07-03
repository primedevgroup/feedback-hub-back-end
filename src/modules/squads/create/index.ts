import { FastifyReply, FastifyRequest } from "fastify";
import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";
import { CreateSquadService } from "./create.service";
import { CreateSquadController } from "./create.controller";

export const createSquad = async (req: FastifyRequest, reply: FastifyReply) => {
  const squadsRepository = new SquadsRepositoryPrisma();

  const createSquadService = new CreateSquadService(squadsRepository);
  const createSquadController = new CreateSquadController(createSquadService);

  await createSquadController.handler(req, reply);
};
