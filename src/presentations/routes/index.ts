import { FastifyInstance } from "fastify";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";

export async function routes(app: FastifyInstance) {
  app.register(publicRoutes);
  app.register(privateRoutes);
}
