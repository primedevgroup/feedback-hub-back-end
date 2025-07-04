import { FastifyInstance } from "fastify";
import { createFeedback } from "@/modules/feedbacks/use-cases/create";
import { findSent } from "@/modules/feedbacks/use-cases/sent";
import { findById } from "@/modules/feedbacks/use-cases/find-by-id";
import { findReceived } from "@/modules/feedbacks/use-cases/received";

export async function feedbackRoutes(app: FastifyInstance) {
  app.post("/", createFeedback);
  app.get("/:id", findById);
  app.get("/sent", findSent);
  app.get("/received", findReceived);
}
