import { Prisma } from "@/generated/prisma/client";
import { AuthenticateRepository } from "../authenticate-repository";
import { prisma } from "@/lib/prisma";

export class AuthenticateRepositoryPrisma implements AuthenticateRepository {
  async signUp(data: Prisma.UserUncheckedCreateInput) {
    await prisma.user.create({
      data,
    });
  }
}
