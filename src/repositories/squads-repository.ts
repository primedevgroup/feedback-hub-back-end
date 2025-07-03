import { SquadDTO } from "@/modules/squads/dto/squad-dto";
import { Prisma, Squad } from "@prisma/client";

export abstract class SquadsRepository {
  abstract create(data: Prisma.SquadUncheckedCreateInput): Promise<Squad>;
  abstract getSquadsByUserId(userId: string): Promise<SquadDTO[]>;
}
