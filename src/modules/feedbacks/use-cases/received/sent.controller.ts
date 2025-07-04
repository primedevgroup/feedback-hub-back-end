import { FastifyReply, FastifyRequest } from "fastify";
import { FindReceivedFeedbacksService } from "./sent.service";

class FindReceivedFeedbacksController {
  constructor(
    private readonly findReceivedFeedbacksService: FindReceivedFeedbacksService
  ) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const targetId = req.user.sub;

    const feedbacks = await this.findReceivedFeedbacksService.handle(targetId);

    return reply.status(200).send({ feedbacks });
  }
}

export { FindReceivedFeedbacksController };
