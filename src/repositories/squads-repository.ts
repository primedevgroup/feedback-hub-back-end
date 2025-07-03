import { Prisma, Squad } from "@prisma/client";

export abstract class SquadsRepository {
  abstract create(data: Prisma.SquadUncheckedCreateInput): Promise<Squad>;
}
