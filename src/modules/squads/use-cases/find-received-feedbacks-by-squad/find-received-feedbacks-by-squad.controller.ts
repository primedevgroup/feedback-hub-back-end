import { FastifyReply, FastifyRequest } from "fastify";
import { FindReceivedFeedbacksBySquadService } from "./find-received-feedbacks-by-squad.service";
import z from "zod";

const findReceivedFeedbacksBySquadRequestParamsSchema = z.object({
  squadId: z.string(),
});

export type FindReceivedFeedbacksBySquadRequestParamsSchema = z.infer<
  typeof findReceivedFeedbacksBySquadRequestParamsSchema
>;

class FindReceivedFeedbacksBySquadController {
  constructor(
    private readonly findReceivedFeedbacksBySquadService: FindReceivedFeedbacksBySquadService
  ) {}

  async handler(
    req: FastifyRequest<{
      Params: FindReceivedFeedbacksBySquadRequestParamsSchema;
    }>,
    reply: FastifyReply
  ) {
    const { squadId } = req.params;
    const userId = req.user.sub;

    const feedbacks = await this.findReceivedFeedbacksBySquadService.handler({
      squadId,
      userId,
    });

    return reply.status(200).send({ feedbacks });
  }
}

export { FindReceivedFeedbacksBySquadController };
