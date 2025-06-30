import { FastifyRequest, FastifyReply } from "fastify";
import { SendVerificationEmailService } from "./send.service";
import { z } from "zod";

const sendVerificationEmailRequestBody = z.object({
  email: z.string().email(),
});

export type SendVerificationEmailRequestBody = z.infer<
  typeof sendVerificationEmailRequestBody
>;

class SendVerificationEmailController {
  constructor(
    private readonly sendVerificationEmailService: SendVerificationEmailService
  ) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const { email } = sendVerificationEmailRequestBody.parse(req.body);

    await this.sendVerificationEmailService.handler({ email });

    return reply.status(200).send({ message: "Email sent." });
  }
}

export { SendVerificationEmailController };
