import { FastifyInstance } from "fastify";
import { authenticationSignIn } from "../../../modules/authentication/signin";
import { authenticationSignUp } from "@/modules/authentication/signup";
import { socialLogin } from "@/modules/authentication/social-login";

export async function authenticationRoutes(server: FastifyInstance) {
  server.post("/signin", authenticationSignIn);
  server.post("/signin/google", socialLogin);
  server.post("/signup", authenticationSignUp);
}
