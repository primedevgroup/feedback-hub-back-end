import { UsersRepository } from "@/repositories/users-repository";
import { signInRequestBodySchema } from "./signup.controller";
import { hash } from "bcryptjs";

class SignUpService {
  constructor(private readonly userRepository: UsersRepository) {}

  async handler(data: signInRequestBodySchema) {
    const hashedPassword = await hash(data.password, 10);

    await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}

export { SignUpService };
