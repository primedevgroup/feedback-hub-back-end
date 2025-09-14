import { FeedbacksRepositoryPrisma } from "@/repositories/prisma/feedbacks-repository-prisma";
import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { FindReceivedFeedbacksBySquadService } from "./find-received-feedbacks-by-squad.service";
import { FindReceivedFeedbacksBySquadController } from "./find-received-feedbacks-by-squad.controller";
import { FindReceivedFeedbacksBySquadRequestParamsSchema } from "./find-received-feedbacks-by-squad.controller";
import { JoinSquadsRepositoryPrisma } from "@/repositories/prisma/join-squads-repository-prisma";

export const findReceivedFeedbacksBySquad = async (
  req: FastifyRequest<{
    Params: FindReceivedFeedbacksBySquadRequestParamsSchema;
  }>,
  reply: FastifyReply
) => {
  const feedbacksRepository = new FeedbacksRepositoryPrisma();
  const squadsRepository = new SquadsRepositoryPrisma();
  const joinSquadsRepository = new JoinSquadsRepositoryPrisma();
  const findReceivedFeedbacksBySquadService =
    new FindReceivedFeedbacksBySquadService(
      feedbacksRepository,
      squadsRepository,
      joinSquadsRepository
    );
  const findReceivedFeedbacksBySquadController =
    new FindReceivedFeedbacksBySquadController(
      findReceivedFeedbacksBySquadService
    );

  await findReceivedFeedbacksBySquadController.handler(req, reply);
};
