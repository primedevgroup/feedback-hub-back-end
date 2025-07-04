import { Prisma } from "@prisma/client";

export abstract class FeedbacksRepository {
  abstract create(data: Prisma.FeedbackUncheckedCreateInput): Promise<void>;
}
