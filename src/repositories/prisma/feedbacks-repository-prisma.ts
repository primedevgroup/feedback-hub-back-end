import { Prisma } from "@prisma/client";
import { FeedbacksRepository } from "../feedbacks-repository";
import { prisma } from "@/libs/prisma";
import { FeedbackDTO } from "@/modules/feedbacks/dtos/feedback-dto";
import { FeedbacksMapper } from "@/modules/feedbacks/mappers";
import { AppError } from "@/utils/errors/app-error";

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

  async findById(id: string): Promise<FeedbackDTO> {
    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new AppError("Feedback not found", 404);
    }

    return FeedbacksMapper.toDTO(feedback);
  }

  async findManyByTargetId(targetId: string): Promise<FeedbackDTO[]> {
    const feedbacks = await prisma.feedback.findMany({
      where: { targetId },
    });

    return feedbacks.map(FeedbacksMapper.toDTO);
  }

  async findManyByUserIdInPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<FeedbackDTO[]> {
    const feedbacks = await prisma.feedback.findMany({
      where: { ownerId: userId, createdAt: { gte: startDate, lte: endDate } },
    });

    return feedbacks.map(FeedbacksMapper.toDTO);
  }

  async findManyByTargetIdInPeriod(
    targetId: string,
    startDate: Date,
    endDate: Date
  ): Promise<FeedbackDTO[]> {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        targetId: targetId,
        createdAt: { gte: startDate, lte: endDate },
      },
    });

    return feedbacks.map(FeedbacksMapper.toDTO);
  }
}
