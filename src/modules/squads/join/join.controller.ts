import { FastifyReply, FastifyRequest } from "fastify";
import { JoinSquadService } from "./join.service";
import { JoinSquadPathParamsSchema } from ".";

class JoinSquadController {
  constructor(private readonly joinSquadService: JoinSquadService) {}

  async handler(
    req: FastifyRequest<{ Params: JoinSquadPathParamsSchema }>,
    reply: FastifyReply
  ) {
    const { squadId } = req.params;
    const userId = req.user.sub;

    await this.joinSquadService.handler({ squadId, userId });

    return reply.status(201).send();
  }
}

export { JoinSquadController };
