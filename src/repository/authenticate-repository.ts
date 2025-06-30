import { Prisma, User } from "../generated/prisma";

export abstract class AuthenticateRepository {
  abstract create(data: Prisma.UserUncheckedCreateInput): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
