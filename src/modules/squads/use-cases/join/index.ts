import { FastifyReply, FastifyRequest } from "fastify";
import { JoinSquadService } from "./join.service";
import { JoinSquadsRepositoryPrisma } from "@/repositories/prisma/join-squads-repository-prisma";
import { JoinSquadController } from "./join.controller";
import z from "zod";

const joinSquadPathParamsSchema = z.object({
  squadId: z.string().uuid(),
});

export type JoinSquadPathParamsSchema = z.infer<
  typeof joinSquadPathParamsSchema
>;

export const joinSquad = async (
  req: FastifyRequest<{ Params: JoinSquadPathParamsSchema }>,
  reply: FastifyReply
) => {
  const joinSquadsRepository = new JoinSquadsRepositoryPrisma();

  const joinSquadService = new JoinSquadService(joinSquadsRepository);
  const joinSquadController = new JoinSquadController(joinSquadService);

  await joinSquadController.handler(req, reply);
};
