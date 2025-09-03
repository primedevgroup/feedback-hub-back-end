import { FastifyReply, FastifyRequest } from "fastify";
import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";
import { UpdateSquadService } from "./update.service";
import { UpdateSquadController } from "./update.controller";
import { JoinSquadsRepositoryPrisma } from "@/repositories/prisma/join-squads-repository-prisma";
import z from "zod";

export const updateSquadRequestBodySchema = z.object({
  name: z.string(),
});
export type UpdateSquadRequestBodySchema = z.infer<
  typeof updateSquadRequestBodySchema
>;

export const updateSquadPathParamsSchema = z.object({
  squadId: z.string().uuid(),
});
export type UpdateSquadPathParamsSchema = z.infer<
  typeof updateSquadPathParamsSchema
>;

export const updateSquad = async (
  req: FastifyRequest<{
    Params: UpdateSquadPathParamsSchema;
    Body: UpdateSquadRequestBodySchema;
  }>,
  reply: FastifyReply
) => {
  const squadsRepository = new SquadsRepositoryPrisma();
  const joinSquadsRepository = new JoinSquadsRepositoryPrisma();

  const updateSquadService = new UpdateSquadService(
    squadsRepository,
    joinSquadsRepository
  );
  const updateSquadController = new UpdateSquadController(updateSquadService);

  await updateSquadController.handler(req, reply);
};
