import { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "./users.service";

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async handler(
    req: FastifyRequest<{ Params: { squadId: string } }>,
    reply: FastifyReply
  ) {
    const { squadId } = req.params;
    const users = await this.usersService.handler(squadId);

    return reply.status(200).send({ users });
  }
}
