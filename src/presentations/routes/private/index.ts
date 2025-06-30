import { FastifyInstance } from "fastify";
import { emailVerificationRoutes } from "../private/email-verification.routes";
import { verifyJwt } from "@/presentations/middlewares/verifyJwt";

export async function privateRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);
  app.register(emailVerificationRoutes, {
    prefix: "/email-verification",
  });
}
