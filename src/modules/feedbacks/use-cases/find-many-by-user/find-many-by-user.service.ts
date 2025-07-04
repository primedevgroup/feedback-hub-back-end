import { FeedbacksRepository } from "@/repositories/feedbacks-repository";
import { FeedbacksMapper } from "../../mappers";

class FindManyByUserService {
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async handle(userId: string) {
    const feedbacks = await this.feedbacksRepository.findManyByUserId(userId);

    return feedbacks.map(FeedbacksMapper.toPresentation);
  }
}

export { FindManyByUserService };
