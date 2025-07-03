import { Squad } from "@prisma/client";
import { SquadDTO } from "../dto/squad-dto";

class SquadsMapper {
  static toDTO(squad: Squad): SquadDTO {
    return {
      id: squad.id,
      name: squad.name,
      createdAt: squad.createdAt,
      membersCount: (squad as any)?._count?.SquadUser ?? 0,
    };
  }

  static toPresentation(squad: SquadDTO) {
    return {
      id: squad.id,
      name: squad.name,
      created_at: squad.createdAt,
      members_count: squad.membersCount,
    };
  }
}

export { SquadsMapper };
