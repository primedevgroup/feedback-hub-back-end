import {
  FeedbacksRepository,
  FeedbackType,
} from "@/repositories/feedbacks-repository";
import { FindReceivedFeedbacksBySquadRequestParamsSchema } from "./find-received-feedbacks-by-squad.controller";
import { AppError } from "@/utils/errors/app-error";
import { SquadsRepository } from "@/repositories/squads-repository";
import { FeedbacksMapper } from "@/modules/feedbacks/mappers";
import { JoinSquadsRepository } from "@/repositories/join-squads-repository";

interface FindReceivedFeedbacksBySquadServiceProps
  extends FindReceivedFeedbacksBySquadRequestParamsSchema {
  userId: string;
}

class FindReceivedFeedbacksBySquadService {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly squadsRepository: SquadsRepository,
    private readonly joinSquadsRepository: JoinSquadsRepository
  ) {}

  async handler({ squadId, userId }: FindReceivedFeedbacksBySquadServiceProps) {
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
      FeedbackType.RECEIVED
    );

    return feedbacks.map(FeedbacksMapper.toPresentation);
  }
}

export { FindReceivedFeedbacksBySquadService };
