import { SquadsRepository } from "@/repositories/squads-repository";
import { SquadsMapper } from "../../mappers";

class FindByUserService {
  constructor(private readonly squadsRepository: SquadsRepository) {}

  async handler(userId: string) {
    const squads = await this.squadsRepository.getSquadsByUserId(userId);

    return squads.map(SquadsMapper.toPresentation);
  }
}

export { FindByUserService };
