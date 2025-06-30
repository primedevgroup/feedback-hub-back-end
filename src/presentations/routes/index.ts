import { FastifyInstance } from "fastify";
import { authenticationRoutes } from "./authentication.routes";
import { emailVerificationRoutes } from "./email-verification.routes";

export async function routes(app: FastifyInstance) {
  app.register(authenticationRoutes, {
    prefix: "/auth",
  });

  app.register(emailVerificationRoutes, {
    prefix: "/email-verification",
  });
}
