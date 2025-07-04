import { Prisma, Squad } from "@prisma/client";
import { SquadsRepository } from "../squads-repository";
import { prisma } from "@/libs/prisma";
import { SquadDTO } from "@/modules/squads/dto/squad-dto";
import { SquadsMapper } from "@/modules/squads/mappers";

export class SquadsRepositoryPrisma implements SquadsRepository {
  async create(data: Prisma.SquadUncheckedCreateInput) {
    const squad = await prisma.squad.create({
      data,
    });

    return squad;
  }

  async getSquadsByUserId(userId: string): Promise<SquadDTO[]> {
    const squads = await prisma.squad.findMany({
      where: {
        SquadUser: {
          some: { userId },
        },
      },
      include: {
        _count: {
          select: { SquadUser: true },
        },
      },
    });

    return squads.map(SquadsMapper.toDTO);
  }

  async findById(id: string): Promise<Squad | null> {
    const squad = await prisma.squad.findUnique({
      where: { id },
    });

    return squad;
  }
}
