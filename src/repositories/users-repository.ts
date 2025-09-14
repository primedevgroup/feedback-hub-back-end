import { Prisma, User } from "@prisma/client";
import { UsersDTO } from "@/modules/shared/dto/users-dto";

export abstract class UsersRepository {
  abstract create(data: Prisma.UserUncheckedCreateInput): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<UsersDTO | null>;
  abstract getUsersBySquadId(squadId: string): Promise<UsersDTO[]>;
}
