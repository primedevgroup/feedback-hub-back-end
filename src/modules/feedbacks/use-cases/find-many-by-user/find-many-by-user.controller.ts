import { FastifyReply, FastifyRequest } from "fastify";
import { FindManyByUserService } from "./find-many-by-user.service";

class FindManyByUserController {
  constructor(private readonly findManyByUserService: FindManyByUserService) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.user.sub;

    const feedbacks = await this.findManyByUserService.handle(userId);

    return reply.status(200).send({ feedbacks });
  }
}

export { FindManyByUserController };
