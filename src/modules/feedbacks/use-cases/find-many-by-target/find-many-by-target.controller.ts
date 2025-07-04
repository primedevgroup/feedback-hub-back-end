import { FastifyReply, FastifyRequest } from "fastify";
import { FindManyByTargetService } from "./find-many-by-target.service";

class FindManyByTargetController {
  constructor(
    private readonly findManyByTargetService: FindManyByTargetService
  ) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const targetId = req.user.sub;

    const feedbacks = await this.findManyByTargetService.handle(targetId);

    return reply.status(200).send({ feedbacks });
  }
}

export { FindManyByTargetController };
