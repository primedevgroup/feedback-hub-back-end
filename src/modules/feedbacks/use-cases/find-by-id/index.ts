import { FastifyReply, FastifyRequest } from "fastify";
import { FindByIdController } from "./find-by-id.controller";
import { FindByIdService } from "./find-by-id.service";
import { FeedbacksRepositoryPrisma } from "@/repositories/prisma/feedbacks-repository-prisma";

export const findById = async (req: FastifyRequest, reply: FastifyReply) => {
  const feedbacksRepository = new FeedbacksRepositoryPrisma();
  const findByIdService = new FindByIdService(feedbacksRepository);
  const findByIdController = new FindByIdController(findByIdService);

  await findByIdController.handle(req, reply);
};
