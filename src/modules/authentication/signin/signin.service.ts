import { AuthenticateRepository } from "@/repository/authenticate-repository";
import { SignInRequestBodySchema } from "./signin.controller";
import { InvalidCredentialsError } from "@/utils/errors/invalid-credentials";
import { compare } from "bcryptjs";

class SignInService {
  constructor(
    private readonly authenticateRepository: AuthenticateRepository
  ) {}

  async handler(data: SignInRequestBodySchema) {
    const user = await this.authenticateRepository.findByEmail(data.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const decryptedPassword = await compare(data.password, user.password);
    if (!decryptedPassword) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}

export { SignInService };
