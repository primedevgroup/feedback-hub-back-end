import { MeService } from "./me.service";
import { FastifyRequest, FastifyReply } from "fastify";

class MeController {
  constructor(private readonly meService: MeService) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.user.sub;
    const user = await this.meService.handler(userId);
    return reply.status(200).send({ user });
  }
}

export { MeController };
