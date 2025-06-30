import { FastifyInstance } from "fastify";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import { verifyJwt } from "../middlewares/verifyJwt";

export async function routes(app: FastifyInstance) {
  app.register(publicRoutes);
  app.register(privateRoutes);
}
