import { Prisma, EmailVerification } from "@/generated/prisma";
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

  async update(data: Prisma.EmailVerificationUpdateInput) {
    await prisma.emailVerification.update({
      where: {
        id: data.id?.toString(),
      },
      data,
    });
  }
}
