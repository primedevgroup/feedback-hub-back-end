import fastify from "fastify";
import { routes } from "./presentations/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import swagger from "./libs/swagger";
import { Prisma } from "@prisma/client";
import { formatErrorResponse } from "./utils/format-error-response";
import { AppError } from "./utils/errors/app-error";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { allowedOrigins } from "./constants/allowed-origins";

export const app = fastify();

app.register(fastifyCors, {
  origin: (origin, callback) => {
    // Em desenvolvimento, permite localhost
    if (process.env.NODE_ENV === "dev") {
      if (
        !origin ||
        origin.startsWith("http://localhost") ||
        origin.startsWith("http://127.0.0.1")
      ) {
        console.log(`cors allowed development: ${origin}`);
        return callback(null, true);
      }
    }

    // Em produção, verifica se está na lista
    if (origin && allowedOrigins.includes(origin)) {
      console.log(`cors allowed production: ${origin}`);
      return callback(null, true);
    }

    console.log(`CORS blocked origin: ${origin}`);
    return callback(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
    "Cookie",
  ],
  exposedHeaders: ["Authorization", "Content-Type", "Set-Cookie"],
  credentials: true,
});

app.register(swagger);

app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "access_token",
    signed: false,
  },
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
