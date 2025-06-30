import { EmailVerificationRepository } from "@/repositories/email-verification-repository";
import { generateVerificationCode } from "@/utils/generateVerificationCode";
import { SendVerificationEmailRequestBody } from "./send.controller";
import nodemailer from "nodemailer";
import { env } from "@/env";

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: data.email,
      subject: "Confirmação de e-mail",
      text: `Aqui está o código de verificação: ${code}`,
    });
  }
}

export { SendVerificationEmailService };
