import { AuthenticateRepository } from "@/repository/authenticate-repository";
import { signInRequestBodySchema } from "./signup.controller";
import { hash } from "bcryptjs";

class SignUpService {
  constructor(
    private readonly authenticateRepository: AuthenticateRepository
  ) {}

  async handler(data: signInRequestBodySchema) {
    const hashedPassword = await hash(data.password, 10);

    await this.authenticateRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}

export { SignUpService };
