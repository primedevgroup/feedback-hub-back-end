import { FastifyReply, FastifyRequest } from "fastify";
import { FindSentFeedbacksBySquadService } from "./find-sent-feedbacks-by-squad.service";
import z from "zod";

const findSentFeedbacksBySquadRequestParamsSchema = z.object({
  squadId: z.string(),
});

export type FindSentFeedbacksBySquadRequestParamsSchema = z.infer<
  typeof findSentFeedbacksBySquadRequestParamsSchema
>;

class FindSentFeedbacksBySquadController {
  constructor(
    private readonly findSentFeedbacksBySquadService: FindSentFeedbacksBySquadService
  ) {}

  async handler(
    req: FastifyRequest<{
      Params: FindSentFeedbacksBySquadRequestParamsSchema;
    }>,
    reply: FastifyReply
  ) {
    const { squadId } = req.params;
    const userId = req.user.sub;

    const feedbacks = await this.findSentFeedbacksBySquadService.handler({
      squadId,
      userId,
    });

    return reply.status(200).send({ feedbacks });
  }
}

export { FindSentFeedbacksBySquadController };
