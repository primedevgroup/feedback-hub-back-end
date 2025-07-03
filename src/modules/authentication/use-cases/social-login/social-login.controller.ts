import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { SocialLoginService } from "./social-login.service";

const socialLoginControllerRequestBody = z.object({
  provider: z.enum(["google"]).default("google"),
  idToken: z.string(),
});

export type SocialLoginControllerRequestBody = z.infer<
  typeof socialLoginControllerRequestBody
>;

class SocialLoginController {
  constructor(private readonly socialLoginService: SocialLoginService) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const { idToken } = socialLoginControllerRequestBody.parse(req.body);

    const response = await this.socialLoginService.handler({ idToken });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: response.googleId,
        },
      }
    );

    reply.status(200).send({ token });
  }
}

export { SocialLoginController };
