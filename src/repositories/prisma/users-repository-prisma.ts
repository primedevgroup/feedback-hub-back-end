import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/libs/prisma";
import { UsersDTO } from "@/modules/shared/dto/users-dto";
import { UsersMapper } from "@/modules/shared/mappers/users";

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

    if (!data) return null;

    return UsersMapper.toDTO(data);
  }

  async getUsersBySquadId(squadId: string): Promise<UsersDTO[]> {
    const users = await prisma.user.findMany({
      where: {
        SquadUser: { some: { squadId } },
      },
    });

    return users.map(UsersMapper.toDTO);
  }
}
