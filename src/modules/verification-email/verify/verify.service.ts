import { UsersRepository } from "@/repositories/users-repository";
import { EmailVerificationRepository } from "@/repositories/email-verification-repository";
import { VerifyVerificationCodeRequestBody } from "./verify.controller";
import { InvalidCredentialsError } from "@/utils/errors/invalid-credentials";
import { InvalidCodeError } from "@/utils/errors/invalid-code";

interface VerifyVerificationCodeServiceParams
  extends VerifyVerificationCodeRequestBody {
  userId: string;
}

class VerifyVerificationCodeService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly emailVerificationRepository: EmailVerificationRepository
  ) {}

  async handler({ userId, code }: VerifyVerificationCodeServiceParams) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const { email } = user;

    const emailVerification = await this.emailVerificationRepository.findFirst({
      where: {
        email,
        code,
        expiresAt: { gte: new Date() },
        verified: false,
      },
    });

    if (!emailVerification) {
      throw new InvalidCodeError();
    }

    await this.emailVerificationRepository.update(emailVerification.id, {
      verified: true,
    });
  }
}

export { VerifyVerificationCodeService };
