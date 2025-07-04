import { FastifyReply, FastifyRequest } from "fastify";
import { FindByIdService } from "./find-by-id.service";

class FindByIdController {
  constructor(private readonly findByIdService: FindByIdService) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };

    const feedback = await this.findByIdService.handle(id);

    return reply.status(200).send({ feedback });
  }
}

export { FindByIdController };
