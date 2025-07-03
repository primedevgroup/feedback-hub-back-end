import { FastifyReply, FastifyRequest } from "fastify";
import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";
import { CreateSquadService } from "./create.service";
import { CreateSquadController } from "./create.controller";
import { JoinSquadsRepositoryPrisma } from "@/repositories/prisma/join-squads-repository-prisma";

export const createSquad = async (req: FastifyRequest, reply: FastifyReply) => {
  const squadsRepository = new SquadsRepositoryPrisma();
  const joinSquadsRepository = new JoinSquadsRepositoryPrisma();

  const createSquadService = new CreateSquadService(
    squadsRepository,
    joinSquadsRepository
  );
  const createSquadController = new CreateSquadController(createSquadService);

  await createSquadController.handler(req, reply);
};
