import { FeedbacksRepository } from "@/repositories/feedbacks-repository";
import { FeedbacksMapper } from "../../mappers";

class FindByIdService {
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async handle(id: string) {
    const feedbacks = await this.feedbacksRepository.findById(id);

    return FeedbacksMapper.toPresentation(feedbacks);
  }
}

export { FindByIdService };
