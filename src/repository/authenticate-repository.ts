import { Prisma } from "../generated/prisma";

export abstract class AuthenticateRepository {
  abstract signUp(data: Prisma.UserUncheckedCreateInput): Promise<void>;
}
