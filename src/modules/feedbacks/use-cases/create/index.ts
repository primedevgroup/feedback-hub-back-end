import { FeedbacksRepositoryPrisma } from "@/repositories/prisma/feedbacks-repository-prisma";
import { JoinSquadsRepositoryPrisma } from "@/repositories/prisma/join-squads-repository-prisma";
import { SquadsRepositoryPrisma } from "@/repositories/prisma/squads-repository-prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateFeedbackController } from "./create.controller";
import { CreateFeedbackService } from "./create.service";
import { UsersRepositoryPrisma } from "@/repositories/prisma/users-repository-prisma";

const createFeedback = async (req: FastifyRequest, reply: FastifyReply) => {
  const feedbacksRepository = new FeedbacksRepositoryPrisma();
  const squadsRepository = new SquadsRepositoryPrisma();
  const joinSquadsRepository = new JoinSquadsRepositoryPrisma();
  const usersRepository = new UsersRepositoryPrisma();
  const createFeedbackService = new CreateFeedbackService(
    feedbacksRepository,
    squadsRepository,
    joinSquadsRepository,
    usersRepository
  );

  const createFeedbackController = new CreateFeedbackController(
    createFeedbackService
  );

  await createFeedbackController.handle(req, reply);
};

export { createFeedback };
