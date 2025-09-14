import {
  FeedbacksRepository,
  FeedbackType,
} from "@/repositories/feedbacks-repository";
import { FindSentFeedbacksBySquadRequestParamsSchema } from "./find-sent-feedbacks-by-squad.controller";
import { AppError } from "@/utils/errors/app-error";
import { SquadsRepository } from "@/repositories/squads-repository";
import { FeedbacksMapper } from "@/modules/feedbacks/mappers";
import { JoinSquadsRepository } from "@/repositories/join-squads-repository";

interface FindSentFeedbacksBySquadServiceProps
  extends FindSentFeedbacksBySquadRequestParamsSchema {
  userId: string;
}

class FindSentFeedbacksBySquadService {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly squadsRepository: SquadsRepository,
    private readonly joinSquadsRepository: JoinSquadsRepository
  ) {}

  async handler({ squadId, userId }: FindSentFeedbacksBySquadServiceProps) {
    const squad = await this.squadsRepository.findById(squadId);
    if (!squad) {
      throw new AppError("Squad not found", 404);
    }

    const isMember = await this.joinSquadsRepository.isMember(squadId, userId);
    if (!isMember) {
      throw new AppError("User is not a member of the squad", 403);
    }

    const feedbacks = await this.feedbacksRepository.findManyBySquadIdAndUserId(
      squadId,
      userId,
      FeedbackType.SENT
    );

    return feedbacks.map(FeedbacksMapper.toPresentation);
  }
}

export { FindSentFeedbacksBySquadService };
