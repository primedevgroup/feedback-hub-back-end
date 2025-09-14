import { FastifyReply, FastifyRequest } from "fastify";

const authenticationLogout = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  reply.clearCookie("access_token", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  reply.status(200).send({
    message: "Logged out successfully",
  });
};

export { authenticationLogout };
