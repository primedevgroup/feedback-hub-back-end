import { me } from "@/modules/user/use-cases/me";
import { FastifyInstance } from "fastify";

export const userRoutes = async (app: FastifyInstance) => {
  app.get("/me", me);
};
