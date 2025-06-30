import { FastifyInstance } from "fastify";
import { authenticationRoutes } from "./authentication.routes";

export async function publicRoutes(app: FastifyInstance) {
  app.register(authenticationRoutes, {
    prefix: "/auth",
  });
}
