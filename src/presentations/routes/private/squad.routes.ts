import { FastifyInstance } from "fastify";
import { createSquad } from "@/modules/squads/create";
import { joinSquad } from "@/modules/squads/join";
import { findByUser } from "@/modules/squads/find-by-user";

export const squadRoutes = async (app: FastifyInstance) => {
  app.post("/", createSquad);
  app.post("/:squadId/join", joinSquad);
  app.get("/find-by-user", findByUser);
};
