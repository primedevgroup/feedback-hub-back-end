import { SquadsRepository } from "@/repositories/squads-repository";
import { JoinSquadsRepository } from "@/repositories/join-squads-repository";
import { AppError } from "@/utils/errors/app-error";
import { DeleteSquadPathParamsSchema } from ".";

interface DeleteSquadServiceProps extends DeleteSquadPathParamsSchema {
  ownerId: string;
}

class DeleteSquadService {
  constructor(
    private readonly squadsRepository: SquadsRepository,
    private readonly joinSquadsRepository: JoinSquadsRepository
  ) {}

  async handler({ ownerId, squadId }: DeleteSquadServiceProps) {
    const isOwner = await this.joinSquadsRepository.isOwner(squadId, ownerId);

    if (!isOwner) {
      throw new AppError("User is not the owner of the squad", 403);
    }

    const squad = await this.squadsRepository.findById(squadId);

    if (!squad) {
      throw new AppError("Squad not found", 404);
    }

    await this.squadsRepository.delete(squadId);
  }
}

export { DeleteSquadService };
