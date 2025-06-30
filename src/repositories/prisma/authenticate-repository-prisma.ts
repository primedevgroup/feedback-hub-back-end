import { Prisma, User } from "@/generated/prisma/client";
import { AuthenticateRepository } from "../authenticate-repository";
import { prisma } from "@/libs/prisma";

export class AuthenticateRepositoryPrisma implements AuthenticateRepository {
  async create(data: Prisma.UserUncheckedCreateInput) {
    await prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return data;
  }
}
