import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { CreateSquadService } from "./create.service";

const createSquadRequestBodySchema = z.object({
  name: z.string(),
});

export type createSquadRequestBodySchema = z.infer<
  typeof createSquadRequestBodySchema
>;

class CreateSquadController {
  constructor(private readonly createSquadService: CreateSquadService) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const { name } = createSquadRequestBodySchema.parse(req.body);
    const ownerId = req.user.sub;

    await this.createSquadService.handler({ name, ownerId });

    return reply.status(201).send();
  }
}

export { CreateSquadController };
