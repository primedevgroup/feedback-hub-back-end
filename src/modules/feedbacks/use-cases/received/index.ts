import { FastifyReply, FastifyRequest } from "fastify";
import { FeedbacksRepositoryPrisma } from "@/repositories/prisma/feedbacks-repository-prisma";
import { FindReceivedFeedbacksController } from "./sent.controller";
import { FindReceivedFeedbacksService } from "./sent.service";

export const findReceived = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const feedbacksRepository = new FeedbacksRepositoryPrisma();
  const findReceivedFeedbacksService = new FindReceivedFeedbacksService(
    feedbacksRepository
  );
  const findReceivedFeedbacksController = new FindReceivedFeedbacksController(
    findReceivedFeedbacksService
  );

  await findReceivedFeedbacksController.handle(req, reply);
};
