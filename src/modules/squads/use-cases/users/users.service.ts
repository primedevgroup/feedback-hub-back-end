import { UsersMapper } from "@/modules/shared/mappers/users";
import { UsersRepository } from "@/repositories/users-repository";
import { SquadsRepository } from "@/repositories/squads-repository";
import { AppError } from "@/utils/errors/app-error";

export class UsersService {
  constructor(
    private readonly squadsRepository: SquadsRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async handler(squadId: string) {
    const squad = await this.squadsRepository.findById(squadId);
    if (!squad) {
      throw new AppError("Squad not found", 404);
    }

    const users = await this.usersRepository.getUsersBySquadId(squadId);

    return users.map((user) => UsersMapper.toPresentation(user));
  }
}
