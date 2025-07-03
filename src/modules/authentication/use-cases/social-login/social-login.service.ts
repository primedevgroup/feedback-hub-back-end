import { env } from "@/env";
import { UsersRepository } from "@/repositories/users-repository";
import { OAuth2Client } from "google-auth-library";
import { SocialLoginControllerRequestBody } from "./social-login.controller";
import { InvalidCredentialsError } from "@/utils/errors/invalid-credentials";

class SocialLoginService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly googleClient: OAuth2Client
  ) {}

  async handler({
    idToken,
  }: Omit<SocialLoginControllerRequestBody, "provider">) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new InvalidCredentialsError();
    }
    const { email, name, sub } = payload;

    await this.userRepository.create({
      email,
      name: name || "Google User",
      googleId: sub,
    });

    return { googleId: sub };
  }
}

export { SocialLoginService };
