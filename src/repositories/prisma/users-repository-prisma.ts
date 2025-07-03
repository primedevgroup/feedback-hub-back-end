import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/libs/prisma";

export class UsersRepositoryPrisma implements UsersRepository {
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
