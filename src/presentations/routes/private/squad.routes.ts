import { FastifyInstance } from "fastify";
import { createSquad } from "@/modules/squads/use-cases/create";
import { joinSquad } from "@/modules/squads/use-cases/join";
import { findByUser } from "@/modules/squads/use-cases/find-by-user";

export const squadRoutes = async (app: FastifyInstance) => {
  app.post("/", createSquad);
  app.post("/:squadId/join", joinSquad);
  app.get("/find-by-user", findByUser);
};
