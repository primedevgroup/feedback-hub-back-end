import { Prisma } from "@prisma/client";

export abstract class JoinSquadsRepository {
  abstract join(data: Prisma.SquadUserUncheckedCreateInput): Promise<void>;
  abstract isMember(squadId: string, userId: string): Promise<boolean>;
  abstract isOwner(squadId: string, userId: string): Promise<boolean>;
}
