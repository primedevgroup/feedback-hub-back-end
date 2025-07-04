import { FeedbacksRepository } from "@/repositories/feedbacks-repository";
import { FeedbacksMapper } from "../../mappers";

class FindManyByTargetService {
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async handle(targetId: string) {
    const feedbacks = await this.feedbacksRepository.findManyByTargetId(
      targetId
    );

    return feedbacks.map(FeedbacksMapper.toPresentation);
  }
}

export { FindManyByTargetService };
