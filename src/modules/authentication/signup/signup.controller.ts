import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { SignUpService } from "./signup.service";

const signInRequestBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type signInRequestBodySchema = z.infer<typeof signInRequestBodySchema>;

class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  async handler(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = signInRequestBodySchema.parse(req.body);
    await this.signUpService.handler({
      name,
      email,
      password,
    });

    return reply.status(201).send();
  }
}

export { SignUpController };
