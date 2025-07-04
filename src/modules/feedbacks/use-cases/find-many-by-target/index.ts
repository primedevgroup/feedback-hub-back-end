import { FastifyReply, FastifyRequest } from "fastify";
import { FindManyByTargetController } from "./find-many-by-target.controller";
import { FindManyByTargetService } from "./find-many-by-target.service";
import { FeedbacksRepositoryPrisma } from "@/repositories/prisma/feedbacks-repository-prisma";

export const findManyByTarget = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const feedbacksRepository = new FeedbacksRepositoryPrisma();
  const findManyByTargetService = new FindManyByTargetService(
    feedbacksRepository
  );
  const findManyByTargetController = new FindManyByTargetController(
    findManyByTargetService
  );

  await findManyByTargetController.handle(req, reply);
};
