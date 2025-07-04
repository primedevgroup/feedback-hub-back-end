import { FastifyInstance } from "fastify";
import { createFeedback } from "@/modules/feedbacks/use-cases/create";
import { findManyByUser } from "@/modules/feedbacks/use-cases/find-many-by-user";
import { findById } from "@/modules/feedbacks/use-cases/find-by-id";

export async function feedbackRoutes(app: FastifyInstance) {
  app.post("/", createFeedback);
  app.get("/", findManyByUser);
  app.get("/:id", findById);
}
