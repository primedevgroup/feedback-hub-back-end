import { UsersRepository } from "@/repositories/users-repository";
import { AppError } from "@/utils/errors/app-error";

class MeService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handler(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}

export { MeService };
