import { Prisma, User } from "@prisma/client";

export abstract class UserRepository {
  abstract create(data: Prisma.UserUncheckedCreateInput): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
