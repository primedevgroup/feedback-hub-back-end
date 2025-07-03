import { FastifyInstance } from "fastify";
import { createSquad } from "@/modules/squads/create";

export const squadRoutes = async (app: FastifyInstance) => {
  app.post("/", createSquad);
};
