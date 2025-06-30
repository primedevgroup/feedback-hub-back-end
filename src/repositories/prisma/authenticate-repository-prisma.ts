import { Prisma, User } from "@/generated/prisma/client";
import { UserRepository } from "../user-repository";
import { prisma } from "@/libs/prisma";

export class UserRepositoryPrisma implements UserRepository {
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

  async findById(id: string) {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return data;
  }
}
