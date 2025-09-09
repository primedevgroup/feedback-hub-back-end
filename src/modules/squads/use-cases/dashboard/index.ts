import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { DashboardService } from "./dashboard.service";
import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";
import { JoinSquadsRepositoryPrisma } from "@/repositories/prisma/join-squads-repository-prisma";
import { FeedbacksRepositoryPrisma } from "@/repositories/prisma/feedbacks-repository-prisma";
import { DashboardController } from "./dashboard.controller";

export const dashboardPathParamsSchema = z.object({
  squadId: z.string().uuid(),
});

export type DashboardPathParamsSchema = z.infer<
  typeof dashboardPathParamsSchema
>;

export const dashboard = async (
  req: FastifyRequest<{ Params: DashboardPathParamsSchema }>,
  reply: FastifyReply
) => {
  const squadsRepository = new SquadsRepositoryPrisma();
  const joinSquadsRepository = new JoinSquadsRepositoryPrisma();
  const feedbacksRepository = new FeedbacksRepositoryPrisma();

  const dashboardService = new DashboardService(
    squadsRepository,
    joinSquadsRepository,
    feedbacksRepository
  );
  const dashboardController = new DashboardController(dashboardService);

  await dashboardController.handler(req, reply);
};
