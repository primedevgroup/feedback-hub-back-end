import { JoinSquadsRepository } from "@/repositories/join-squads-repository";
import { AppError } from "@/utils/errors/app-error";

interface JoinSquadServiceProps {
  squadId: string;
  userId: string;
}

class JoinSquadService {
  constructor(private readonly joinSquadsRepository: JoinSquadsRepository) {}

  async handler(data: JoinSquadServiceProps) {
    const isMember = await this.joinSquadsRepository.isMember(
      data.squadId,
      data.userId
    );

    if (isMember) {
      throw new AppError("User is already a member of the squad", 409);
    }

    await this.joinSquadsRepository.join(data);
  }
}

export { JoinSquadService };
