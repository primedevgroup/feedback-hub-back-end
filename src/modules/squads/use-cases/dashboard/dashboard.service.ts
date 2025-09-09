import { SquadsRepository } from "@/repositories/squads-repository";
import { JoinSquadsRepository } from "@/repositories/join-squads-repository";
import { AppError } from "@/utils/errors/app-error";
import { FeedbacksRepository } from "@/repositories/feedbacks-repository";
import { generateLastSixMonths } from "@/utils/generate-last-six-months";

interface DashboardServiceProps {
  squadId: string;
  userId: string;
}

interface DashboardSummaryChartData {
  month: string;
  received: number;
  sent: number;
}

interface DashboardServiceResponse {
  summary: {
    feedbacksReceived: number;
    feedbacksSent: number;
    uniquePeople: number;
  };
  chart: DashboardSummaryChartData[];
}

class DashboardService {
  constructor(
    private readonly squadsRepository: SquadsRepository,
    private readonly joinSquadsRepository: JoinSquadsRepository,
    private readonly feedbacksRepository: FeedbacksRepository
  ) {}

  async handler(
    data: DashboardServiceProps
  ): Promise<DashboardServiceResponse> {
    const squad = await this.squadsRepository.findById(data.squadId);
    if (!squad) {
      throw new AppError("Squad not found", 404);
    }

    const isMember = await this.joinSquadsRepository.isMember(
      data.squadId,
      data.userId
    );
    if (!isMember) {
      throw new AppError("User is not a member of the squad", 403);
    }

    const feedbacksSent = await this.feedbacksRepository.findManyByUserId(
      data.userId
    );
    const feedbacksReceived = await this.feedbacksRepository.findManyByTargetId(
      data.userId
    );
    const members = await this.joinSquadsRepository.getMembers(data.squadId);
    const chart = await this.generateChartData(data.userId);

    return {
      summary: {
        feedbacksSent: feedbacksSent.length,
        feedbacksReceived: feedbacksReceived.length,
        uniquePeople: members.length,
      },
      chart,
    };
  }

  private async generateChartData(
    userId: string
  ): Promise<DashboardSummaryChartData[]> {
    const months = generateLastSixMonths();
    const chartData: DashboardSummaryChartData[] = [];

    for (const month of months) {
      const [feedbacksSent, feedbacksReceived] = await Promise.all([
        this.feedbacksRepository.findManyByUserIdInPeriod(
          userId,
          month.startDate,
          month.endDate
        ),
        this.feedbacksRepository.findManyByTargetIdInPeriod(
          userId,
          month.startDate,
          month.endDate
        ),
      ]);

      chartData.push({
        month: month.monthName,
        received: feedbacksReceived.length,
        sent: feedbacksSent.length,
      });
    }

    return chartData;
  }
}

export { DashboardService };
