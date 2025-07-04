import { FeedbacksRepository } from "@/repositories/feedbacks-repository";
import { CreateFeedbackRequestBodySchema } from "./create.controller";
import { SquadsRepository } from "@/repositories/squads-repository";
import { AppError } from "@/utils/errors/app-error";
import { JoinSquadsRepository } from "@/repositories/join-squads-repository";

interface CreateFeedbackServiceProps extends CreateFeedbackRequestBodySchema {
  ownerId: string;
  squadId: string;
}

class CreateFeedbackService {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly squadsRepository: SquadsRepository,
    private readonly joinSquadsRepository: JoinSquadsRepository
  ) {}

  async handle(data: CreateFeedbackServiceProps) {
    const squad = await this.squadsRepository.findById(data.squadId);

    if (!squad) {
      throw new AppError("Squad not found", 404);
    }

    const isMember = await this.joinSquadsRepository.isMember(
      data.squadId,
      data.ownerId
    );

    if (!isMember) {
      throw new AppError("User is not a member of the squad", 403);
    }

    await this.feedbacksRepository.create({
      title: data.title,
      content: data.content,
      ownerId: data.ownerId,
      squadId: data.squadId,
    });
  }
}

export { CreateFeedbackService };
