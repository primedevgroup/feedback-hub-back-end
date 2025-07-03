import { Prisma } from "@prisma/client";
import { SquadsRepository } from "../squads-repository";
import { prisma } from "@/libs/prisma";

export class SquadsRepositoryPrisma implements SquadsRepository {
  async create(data: Prisma.SquadUncheckedCreateInput) {
    await prisma.squad.create({
      data,
    });
  }
}
