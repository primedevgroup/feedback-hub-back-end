import { FastifyReply, FastifyRequest } from "fastify";
import { FindSentFeedbacksService } from "./sent.service";

class FindSentFeedbacksController {
  constructor(
    private readonly findSentFeedbacksService: FindSentFeedbacksService
  ) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.user.sub;

    const feedbacks = await this.findSentFeedbacksService.handle(userId);

    return reply.status(200).send({ feedbacks });
  }
}

export { FindSentFeedbacksController };
