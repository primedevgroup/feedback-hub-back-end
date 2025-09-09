interface GenerateLastSixMonthsProps {
  startDate: Date;
  endDate: Date;
  monthName: string;
}

export function generateLastSixMonths(): GenerateLastSixMonthsProps[] {
  const now = new Date();

  return Array.from({ length: 6 }, (_, i) => {
    const monthsAgo = 5 - i;
    const date = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);

    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const monthName = date.toLocaleDateString("pt-BR", {
      month: "long",
    });

    return {
      startDate,
      endDate,
      monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
    };
  });
}
