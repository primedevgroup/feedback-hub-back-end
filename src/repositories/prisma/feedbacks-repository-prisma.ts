import { Prisma } from "@prisma/client";
import { FeedbacksRepository } from "../feedbacks-repository";
import { prisma } from "@/libs/prisma";
import { FeedbackDTO } from "@/modules/feedbacks/dtos/feedback-dto";
import { FeedbacksMapper } from "@/modules/feedbacks/mappers";

export class FeedbacksRepositoryPrisma implements FeedbacksRepository {
  async create(data: Prisma.FeedbackUncheckedCreateInput): Promise<void> {
    await prisma.feedback.create({ data });
  }

  async findManyByUserId(userId: string): Promise<FeedbackDTO[]> {
    const feedbacks = await prisma.feedback.findMany({
      where: { ownerId: userId },
    });

    return feedbacks.map(FeedbacksMapper.toDTO);
  }
}
