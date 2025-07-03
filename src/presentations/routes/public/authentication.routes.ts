import { FastifyInstance } from "fastify";
import { authenticationSignIn } from "../../../modules/authentication/use-cases/signin";
import { authenticationSignUp } from "@/modules/authentication/use-cases/signup";
import { socialLogin } from "@/modules/authentication/use-cases/social-login";

export async function authenticationRoutes(server: FastifyInstance) {
  server.post("/signin", authenticationSignIn);
  server.post("/signin/google", socialLogin);
  server.post("/signup", authenticationSignUp);
}
