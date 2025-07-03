import { FastifyRequest, FastifyReply } from "fastify";
import { SendVerificationEmailService } from "./send.service";

class SendVerificationEmailController {
  constructor(
    private readonly sendVerificationEmailService: SendVerificationEmailService
  ) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.user.sub;

    await this.sendVerificationEmailService.handler({ userId });

    return reply.status(200).send({ message: "Email sent." });
  }
}

export { SendVerificationEmailController };
