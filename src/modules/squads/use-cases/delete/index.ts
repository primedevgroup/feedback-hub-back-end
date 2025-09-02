import { FastifyReply, FastifyRequest } from "fastify";
import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";
import { JoinSquadsRepositoryPrisma } from "@/repositories/prisma/join-squads-repository-prisma";
import { DeleteSquadService } from "./delete.service";
import { DeleteSquadController } from "./delete.controller";
import z from "zod";

export const deleteSquadPathParamsSchema = z.object({
  squadId: z.string().uuid(),
});

export type DeleteSquadPathParamsSchema = z.infer<
  typeof deleteSquadPathParamsSchema
>;

export const deleteSquad = async (
  req: FastifyRequest<{ Params: DeleteSquadPathParamsSchema }>,
  reply: FastifyReply
) => {
  const squadsRepository = new SquadsRepositoryPrisma();
  const joinSquadsRepository = new JoinSquadsRepositoryPrisma();

  const deleteSquadService = new DeleteSquadService(
    squadsRepository,
    joinSquadsRepository
  );
  const deleteSquadController = new DeleteSquadController(deleteSquadService);

  await deleteSquadController.handler(req, reply);
};
