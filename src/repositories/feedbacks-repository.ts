import { Prisma } from "@prisma/client";
import { FeedbackDTO } from "@/modules/feedbacks/dtos/feedback-dto";

export abstract class FeedbacksRepository {
  abstract create(data: Prisma.FeedbackUncheckedCreateInput): Promise<void>;
  abstract findManyByUserId(userId: string): Promise<FeedbackDTO[]>;
  abstract findById(id: string): Promise<FeedbackDTO>;
  abstract findManyByTargetId(targetId: string): Promise<FeedbackDTO[]>;
}
