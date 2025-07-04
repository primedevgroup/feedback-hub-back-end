import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateFeedbackService } from "./create.service";

const createFeedbackRequestBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  squadId: z.string(),
  targetId: z.string(),
});

export type CreateFeedbackRequestBodySchema = z.infer<
  typeof createFeedbackRequestBodySchema
>;

class CreateFeedbackController {
  constructor(private readonly createFeedbackService: CreateFeedbackService) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const ownerId = req.user.sub;
    const { title, content, squadId, targetId } =
      createFeedbackRequestBodySchema.parse(req.body);

    await this.createFeedbackService.handle({
      title,
      content,
      squadId,
      ownerId,
      targetId,
    });

    return reply.status(201).send();
  }
}

export { CreateFeedbackController };
