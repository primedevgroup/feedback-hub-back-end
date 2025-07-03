import { SquadsRepository } from "@/repositories/squads-repository";
import { createSquadRequestBodySchema } from "./create.controller";

interface CreateSquadServiceProps extends createSquadRequestBodySchema {
  ownerId: string;
}

class CreateSquadService {
  constructor(private readonly squadsRepository: SquadsRepository) {}

  async handler(data: CreateSquadServiceProps) {
    await this.squadsRepository.create(data);
  }
}

export { CreateSquadService };
