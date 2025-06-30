import { FastifyReply, FastifyRequest } from "fastify";

const authenticationSignIn = (req: FastifyRequest, reply: FastifyReply) => {
  return "Hello, World!";
};

export { authenticationSignIn };
