import { Feedback } from "@prisma/client";
import { FeedbackDTO } from "../dtos/feedback-dto";

class FeedbacksMapper {
  static toDTO(feedback: Feedback): FeedbackDTO {
    return {
      id: feedback.id,
      title: feedback.title,
      content: feedback.content,
      createdAt: feedback.createdAt,
      updatedAt: feedback.updatedAt,
      ownerId: feedback.ownerId,
      squadId: feedback.squadId,
    };
  }

  static toPresentation(feedback: FeedbackDTO) {
    return {
      id: feedback.id,
      title: feedback.title,
      content: feedback.content,
      created_at: feedback.createdAt,
      updated_at: feedback.updatedAt,
      squad_id: feedback.squadId,
    };
  }
}

export { FeedbacksMapper };
