import { FastifyInstance } from "fastify";
import { authenticationSignIn } from "../../modules/authentication/signin";
import { authenticationSignUp } from "@/modules/authentication/signup";

export async function authenticationRoutes(server: FastifyInstance) {
  server.post("/signin", () => {
    return;
  });

  server.get("/signin", authenticationSignIn);

  server.post("/signup", authenticationSignUp);
}
