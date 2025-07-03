import { EmailVerificationRepository } from "@/repositories/email-verification-repository";
import { generateVerificationCode } from "@/utils/generateVerificationCode";
import nodemailer from "nodemailer";
import { env } from "@/env";
import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "@/utils/errors/invalid-credentials";

interface SendVerificationEmailParams {
  userId: string;
}

class SendVerificationEmailService {
  constructor(
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly userRepository: UsersRepository
  ) {}

  async handler(data: SendVerificationEmailParams) {
    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

    await this.emailVerificationRepository.create({
      email: user.email,
      code,
      expiresAt,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: user.email,
      subject: "Confirmação de e-mail",
      text: `Aqui está o código de verificação: ${code}`,
    });
  }
}

export { SendVerificationEmailService };
