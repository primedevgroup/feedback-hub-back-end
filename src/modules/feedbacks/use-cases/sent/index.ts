import { FastifyReply, FastifyRequest } from "fastify";
import { FindSentFeedbacksController } from "./sent.controller";
import { FindSentFeedbacksService } from "./sent.service";
import { FeedbacksRepositoryPrisma } from "@/repositories/prisma/feedbacks-repository-prisma";

export const findSent = async (req: FastifyRequest, reply: FastifyReply) => {
  const feedbacksRepository = new FeedbacksRepositoryPrisma();
  const findSentFeedbacksService = new FindSentFeedbacksService(
    feedbacksRepository
  );
  const findSentFeedbacksController = new FindSentFeedbacksController(
    findSentFeedbacksService
  );

  await findSentFeedbacksController.handle(req, reply);
};
