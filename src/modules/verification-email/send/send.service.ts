import { EmailVerificationRepository } from "@/repository/email-verification-repository";
import { generateVerificationCode } from "@/utils/generateVerificationCode";
import { SendVerificationEmailRequestBody } from "./send.controller";

class SendVerificationEmailService {
  constructor(
    private readonly emailVerificationRepository: EmailVerificationRepository
  ) {}

  async handler(data: SendVerificationEmailRequestBody) {
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

    await this.emailVerificationRepository.create({
      email: data.email,
      code,
      expiresAt,
    });
  }
}

export { SendVerificationEmailService };
