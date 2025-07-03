import { FastifyReply, FastifyRequest } from "fastify";
import { JoinSquadService } from "./join.service";
import { JoinSquadsRepositoryPrisma } from "@/repositories/prisma/join-squads-repository-prisma";
import { JoinSquadController } from "./join.controller";
import z from "zod";

const joinSquadQueryParamsSchema = z.object({
  squad: z.string().uuid(),
});

export type JoinSquadQueryParamsSchema = z.infer<
  typeof joinSquadQueryParamsSchema
>;

export const joinSquad = async (
  req: FastifyRequest<{ Querystring: JoinSquadQueryParamsSchema }>,
  reply: FastifyReply
) => {
  const joinSquadsRepository = new JoinSquadsRepositoryPrisma();

  const joinSquadService = new JoinSquadService(joinSquadsRepository);
  const joinSquadController = new JoinSquadController(joinSquadService);

  await joinSquadController.handler(req, reply);
};
