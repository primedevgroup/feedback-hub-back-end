import fastify from "fastify";
import { routes } from "./presentations/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import swagger from "./libs/swagger";
import { Prisma } from "@prisma/client";
import { formatErrorResponse } from "./utils/format-error-response";
import { AppError } from "./utils/errors/app-error";

export const app = fastify();

app.register(swagger);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send(formatErrorResponse(error));
  }

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

  if (error instanceof Error) {
    return reply.code(403).send({ error: error.message });
  }

  request.log.error(error);
  return reply.status(500).send({ error: "Internal server error." });
});

app.register(routes);
