import { FastifyReply, FastifyRequest } from "fastify";
import { FindByUserService } from "./find-by-user.service";

class FindByUserController {
  constructor(private readonly findByUserService: FindByUserService) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.user.sub;

    const squads = await this.findByUserService.handler(userId);

    return reply.status(200).send({
      squads,
    });
  }
}

export { FindByUserController };
