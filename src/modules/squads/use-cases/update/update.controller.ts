import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateSquadService } from "./update.service";
import {
  UpdateSquadPathParamsSchema,
  UpdateSquadRequestBodySchema,
  updateSquadRequestBodySchema,
  updateSquadPathParamsSchema,
} from ".";

class UpdateSquadController {
  constructor(private readonly updateSquadService: UpdateSquadService) {}

  async handler(
    req: FastifyRequest<{
      Params: UpdateSquadPathParamsSchema;
      Body: UpdateSquadRequestBodySchema;
    }>,
    reply: FastifyReply
  ) {
    const { name } = updateSquadRequestBodySchema.parse(req.body);
    const { squadId } = updateSquadPathParamsSchema.parse(req.params);
    const ownerId = req.user.sub;

    await this.updateSquadService.handler({ name, squadId, ownerId });

    return reply.status(204).send();
  }
}

export { UpdateSquadController };
