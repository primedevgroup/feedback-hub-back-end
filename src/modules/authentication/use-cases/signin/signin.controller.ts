import { z } from "zod";
import { SignInService } from "./signin.service";
import { FastifyReply, FastifyRequest } from "fastify";

const signInRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInRequestBodySchema = z.infer<typeof signInRequestBodySchema>;

class SignInController {
  constructor(private readonly signInService: SignInService) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = signInRequestBodySchema.parse(req.body);

    const user = await this.signInService.handler({ email, password });

    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    reply.status(200).send({
      message: "Signed in successfully",
      token: accessToken,
    });
  }
}

export { SignInController };
