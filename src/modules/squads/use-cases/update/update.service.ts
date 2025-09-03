import { SquadsRepository } from "@/repositories/squads-repository";
import { AppError } from "@/utils/errors/app-error";
import { JoinSquadsRepository } from "@/repositories/join-squads-repository";
import { UpdateSquadRequestBodySchema } from ".";

interface UpdateSquadServiceProps extends UpdateSquadRequestBodySchema {
  squadId: string;
  ownerId: string;
}

class UpdateSquadService {
  constructor(
    private readonly squadsRepository: SquadsRepository,
    private readonly joinSquadsRepository: JoinSquadsRepository
  ) {}

  async handler({ name, squadId, ownerId }: UpdateSquadServiceProps) {
    const squad = await this.squadsRepository.findById(squadId);
    if (!squad) {
      throw new AppError("Squad not found", 404);
    }

    const isOwner = await this.joinSquadsRepository.isOwner(squadId, ownerId);
    if (!isOwner) {
      throw new AppError("User is not the owner of the squad", 403);
    }

    await this.squadsRepository.update(squadId, { name });
  }
}

export { UpdateSquadService };
