import { FastifyInstance } from "fastify";
import { createSquad } from "@/modules/squads/use-cases/create";
import { findByUser } from "@/modules/squads/use-cases/find-by-user";
import { joinSquad } from "@/modules/squads/use-cases/join";
import { deleteSquad } from "@/modules/squads/use-cases/delete";
import { users } from "@/modules/squads/use-cases/users";

export const squadRoutes = async (app: FastifyInstance) => {
  app.post("/", createSquad);
  app.post("/:squadId/join", joinSquad);
  app.get("/find-by-user", findByUser);
  app.delete("/:squadId/delete", deleteSquad);
  app.get("/:squadId/users", users);
};
