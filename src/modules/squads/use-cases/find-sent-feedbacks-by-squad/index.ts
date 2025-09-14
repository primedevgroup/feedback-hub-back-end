import { FeedbacksRepositoryPrisma } from "@/repositories/prisma/feedbacks-repository-prisma";
import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { FindSentFeedbacksBySquadService } from "./find-sent-feedbacks-by-squad.service";
import {
  FindSentFeedbacksBySquadController,
  FindSentFeedbacksBySquadRequestParamsSchema,
} from "./find-sent-feedbacks-by-squad.controller";
import { JoinSquadsRepositoryPrisma } from "@/repositories/prisma/join-squads-repository-prisma";

export const findSentFeedbacksBySquad = async (
  req: FastifyRequest<{
    Params: FindSentFeedbacksBySquadRequestParamsSchema;
  }>,
  reply: FastifyReply
) => {
  const feedbacksRepository = new FeedbacksRepositoryPrisma();
  const squadsRepository = new SquadsRepositoryPrisma();
  const joinSquadsRepository = new JoinSquadsRepositoryPrisma();
  const findSentFeedbacksBySquadService = new FindSentFeedbacksBySquadService(
    feedbacksRepository,
    squadsRepository,
    joinSquadsRepository
  );
  const findSentFeedbacksBySquadController =
    new FindSentFeedbacksBySquadController(findSentFeedbacksBySquadService);

  await findSentFeedbacksBySquadController.handler(req, reply);
};
