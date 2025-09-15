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

export const app = fastify();

app.register(fastifyCors, {
  origin: (origin, callback) => {
    // Lista de origens permitidas
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      // Adicione aqui o domínio de produção do seu frontend quando tiver
      // "https://seu-frontend.com",
    ];

    // Em desenvolvimento, permite localhost
    if (env.NODE_ENV === "dev") {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
    }

    // Em produção, verifica se a origem está na lista
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Log para debug
    console.log(`CORS blocked origin: ${origin}`);
    return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cookie",
    "X-Requested-With",
  ],
  exposedHeaders: ["Set-Cookie"],
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
