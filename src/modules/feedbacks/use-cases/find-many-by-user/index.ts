import { FastifyReply, FastifyRequest } from "fastify";
import { FindManyByUserController } from "./find-many-by-user.controller";
import { FindManyByUserService } from "./find-many-by-user.service";
import { FeedbacksRepositoryPrisma } from "@/repositories/prisma/feedbacks-repository-prisma";

export const findManyByUser = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const feedbacksRepository = new FeedbacksRepositoryPrisma();
  const findManyByUserService = new FindManyByUserService(feedbacksRepository);
  const findManyByUserController = new FindManyByUserController(
    findManyByUserService
  );

  await findManyByUserController.handle(req, reply);
};
