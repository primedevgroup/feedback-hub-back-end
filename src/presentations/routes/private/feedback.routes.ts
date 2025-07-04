import { FastifyInstance } from "fastify";
import { createFeedback } from "@/modules/feedbacks/use-cases/create";

export async function feedbackRoutes(app: FastifyInstance) {
  app.post("/", createFeedback);
}
