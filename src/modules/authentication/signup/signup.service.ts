import { UserRepository } from "@/repositories/user-repository";
import { signInRequestBodySchema } from "./signup.controller";
import { hash } from "bcryptjs";

class SignUpService {
  constructor(private readonly userRepository: UserRepository) {}

  async handler(data: signInRequestBodySchema) {
    const hashedPassword = await hash(data.password, 10);

    await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}

export { SignUpService };
