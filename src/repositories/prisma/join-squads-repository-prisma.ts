import { JoinSquadsRepository } from "../join-squads-repository";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export class JoinSquadsRepositoryPrisma implements JoinSquadsRepository {
  async join(data: Prisma.SquadUserUncheckedCreateInput): Promise<void> {
    await prisma.squadUser.create({
      data,
    });
  }

  async isMember(squadId: string, userId: string): Promise<boolean> {
    const squadUser = await prisma.squadUser.findFirst({
      where: {
        squadId,
        userId,
      },
    });

    return !!squadUser;
  }
}
