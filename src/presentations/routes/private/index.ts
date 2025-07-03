import { FastifyInstance } from "fastify";
import { emailVerificationRoutes } from "../private/email-verification.routes";
import { verifyJwt } from "@/presentations/middlewares/verifyJwt";
import { squadRoutes } from "./squad.routes";

export async function privateRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);
  app.register(emailVerificationRoutes, {
    prefix: "/email-verification",
  });
  app.register(squadRoutes, {
    prefix: "/squad",
  });
}
