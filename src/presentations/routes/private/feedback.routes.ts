import { FastifyInstance } from "fastify";
import { createFeedback } from "@/modules/feedbacks/use-cases/create";
import { findManyByUser } from "@/modules/feedbacks/use-cases/find-many-by-user";

export async function feedbackRoutes(app: FastifyInstance) {
  app.post("/", createFeedback);
  app.get("/", findManyByUser);
}
