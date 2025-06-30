import fastify from "fastify";
import { routes } from "./presentation/routes";
import { Prisma } from "./generated/prisma";
import { ZodError } from "zod";

export const app = fastify();

app.setErrorHandler((error, request, reply) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return reply.status(409).send({ error: "Email already in use." });
    }
  }

  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return reply.status(400).send({
      error: formattedErrors,
    });
  }

  request.log.error(error);
  return reply.status(500).send({ error: "Internal server error." });
});

app.register(routes);
