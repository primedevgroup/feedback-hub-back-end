import { FastifyInstance } from "fastify";
import { createSquad } from "@/modules/squads/create";
import { joinSquad } from "@/modules/squads/join";

export const squadRoutes = async (app: FastifyInstance) => {
  app.post("/", createSquad);
  app.post("/:squadId/join", joinSquad);
};
