import { Prisma } from "@prisma/client";
import { FeedbacksRepository } from "../feedbacks-repository";
import { prisma } from "@/libs/prisma";

export class FeedbacksRepositoryPrisma implements FeedbacksRepository {
  async create(data: Prisma.FeedbackUncheckedCreateInput): Promise<void> {
    await prisma.feedback.create({ data });
  }
}
