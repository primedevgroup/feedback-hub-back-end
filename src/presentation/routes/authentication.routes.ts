import { FastifyInstance } from "fastify";
import { authenticationSignIn } from "../../modules/authentication/signin";

export async function authenticationRoutes(server: FastifyInstance) {
  server.post("/signin", () => {
    return;
  });

  server.get("/signin", authenticationSignIn);
}
