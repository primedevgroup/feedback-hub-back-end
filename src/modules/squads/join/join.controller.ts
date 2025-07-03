import { FastifyReply, FastifyRequest } from "fastify";
import { JoinSquadService } from "./join.service";
import { JoinSquadQueryParamsSchema } from ".";

class JoinSquadController {
  constructor(private readonly joinSquadService: JoinSquadService) {}

  async handler(
    req: FastifyRequest<{ Querystring: JoinSquadQueryParamsSchema }>,
    reply: FastifyReply
  ) {
    const { squad } = req.query;
    const userId = req.user.sub;

    await this.joinSquadService.handler({ squadId: squad, userId });

    return reply.status(201).send();
  }
}

export { JoinSquadController };
