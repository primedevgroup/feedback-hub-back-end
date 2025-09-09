import { FastifyReply, FastifyRequest } from "fastify";
import { DashboardService } from "./dashboard.service";
import { DashboardPathParamsSchema } from ".";

class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  async handler(
    req: FastifyRequest<{ Params: DashboardPathParamsSchema }>,
    reply: FastifyReply
  ) {
    const { squadId } = req.params;
    const userId = req.user.sub;

    const dashboard = await this.dashboardService.handler({ squadId, userId });

    return reply.status(200).send({
      success: true,
      data: dashboard,
    });
  }
}

export { DashboardController };
