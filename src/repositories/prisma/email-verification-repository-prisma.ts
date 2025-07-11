import { Prisma } from "@prisma/client";
import { EmailVerificationRepository } from "../email-verification-repository";
import { prisma } from "@/libs/prisma";

export class EmailVerificationRepositoryPrisma
  implements EmailVerificationRepository
{
  async create(data: Prisma.EmailVerificationUncheckedCreateInput) {
    await prisma.emailVerification.create({
      data,
    });
  }

  async findFirst(filter: Prisma.EmailVerificationFindFirstArgs) {
    const record = await prisma.emailVerification.findFirst(filter);
    return record;
  }

  async update(id: string, data: Prisma.EmailVerificationUpdateInput) {
    await prisma.emailVerification.update({
      where: {
        id: id,
      },
      data,
    });
  }
}
