import { FastifyRequest, FastifyReply } from "fastify";
import { VerifyVerificationCodeService } from "./verify.service";
import { z } from "zod";

const verifyVerificationCodeRequestBody = z.object({
  code: z.coerce.string().length(6),
});

export type VerifyVerificationCodeRequestBody = z.infer<
  typeof verifyVerificationCodeRequestBody
>;

class VerifyVerificationCodeController {
  constructor(
    private readonly verifyVerificationCodeService: VerifyVerificationCodeService
  ) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const { code } = verifyVerificationCodeRequestBody.parse(req.body);
    const userId = req.user.sub;

    await this.verifyVerificationCodeService.handler({
      code,
      userId,
    });

    reply.status(200).send({ message: "Code verified successfully!" });
  }
}

export { VerifyVerificationCodeController };
