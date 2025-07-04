import { FastifyInstance } from "fastify";
import { createFeedback } from "@/modules/feedbacks/use-cases/create";
import { findManyByUser } from "@/modules/feedbacks/use-cases/find-many-by-user";
import { findById } from "@/modules/feedbacks/use-cases/find-by-id";
import { findManyByTarget } from "@/modules/feedbacks/use-cases/find-many-by-target";

export async function feedbackRoutes(app: FastifyInstance) {
  app.post("/", createFeedback);
  app.get("/", findManyByUser);
  app.get("/:id", findById);
  app.get("/received", findManyByTarget);
}
