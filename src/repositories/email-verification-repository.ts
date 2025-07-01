import { Prisma, EmailVerification } from "@prisma/client";

export abstract class EmailVerificationRepository {
  abstract create(
    data: Prisma.EmailVerificationUncheckedCreateInput
  ): Promise<void>;

  abstract findFirst(
    filter: Prisma.EmailVerificationFindFirstArgs
  ): Promise<EmailVerification | null>;

  abstract update(
    id: string,
    data: Prisma.EmailVerificationUncheckedUpdateInput
  ): Promise<void>;
}
