import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteSquadService } from "./delete.service";
import { deleteSquadPathParamsSchema } from ".";

class DeleteSquadController {
  constructor(private readonly deleteSquadService: DeleteSquadService) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const { squadId } = deleteSquadPathParamsSchema.parse(req.params);
    const ownerId = req.user.sub;

    await this.deleteSquadService.handler({ squadId, ownerId });

    return reply.status(204).send();
  }
}

export { DeleteSquadController };
