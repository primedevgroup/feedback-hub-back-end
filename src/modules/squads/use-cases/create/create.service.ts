import { SquadsRepository } from "@/repositories/squads-repository";
import { createSquadRequestBodySchema } from "./create.controller";
import { JoinSquadsRepository } from "@/repositories/join-squads-repository";

interface CreateSquadServiceProps extends createSquadRequestBodySchema {
  ownerId: string;
}

class CreateSquadService {
  constructor(
    private readonly squadsRepository: SquadsRepository,
    private readonly joinSquadsRepository: JoinSquadsRepository
  ) {}

  async handler({ name, ownerId }: CreateSquadServiceProps) {
    const squad = await this.squadsRepository.create({ name });
    await this.joinSquadsRepository.join({
      squadId: squad.id,
      userId: ownerId,
      role: "OWNER",
    });
  }
}

export { CreateSquadService };
