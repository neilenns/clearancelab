import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Statistic } from "@workspace/validators";
import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  PieController,
  Tooltip,
  type InteractionItem,
} from "chart.js";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useMemo, useRef, type MouseEvent } from "react";
import { Chart, getElementAtEvent } from "react-chartjs-2";

export interface PieChartProperties {
  chartData: Statistic[];
  title: string;
  baseUrl: string;
  isBoolean?: boolean; // Add this line
}

ChartJS.register(ArcElement, PieController, Tooltip);

const GreenGold20 = [
  "#146c36",
  "#1c713b",
  "#257740",
  "#2d7d45",
  "#34844a",
  "#3a8a4d",
  "#40914f",
  "#479751",
  "#4f9e53",
  "#5aa355",
  "#67a956",
  "#76af56",
  "#84b457",
  "#93b958",
  "#a3bd5a",
  "#b2c25b",
  "#c3c55d",
  "#d3c95f",
  "#e3cd62",
  "#f4d166",
];

export default function PieChart({
  chartData,
  title,
  baseUrl,
  isBoolean = false,
}: PieChartProperties) {
  const router = useRouter();
  const chartReference = useRef<ChartJS>(null);

  const data = useMemo(() => {
    const data: ChartData<"pie", number[], string> = {
      labels: chartData.map((element) => element.item),
      datasets: [
        {
          data: chartData.map((element) => element.count),
          borderWidth: 1,
          backgroundColor: GreenGold20,
          borderColor: GreenGold20,
        },
      ],
    };

    return data;
  }, [chartData]);

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (element.length === 0) return;

    const { index } = element[0];
    const item = data.labels?.[index];

    const filterValue = isBoolean ? item === "Yes" : `%22${item}%22`;

    router.push(`${baseUrl}${filterValue}` as Route);
  };

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartReference;

    if (!chart) {
      return;
    }

    printElementAtEvent(getElementAtEvent(chart, event));
  };

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mx-auto w-64 h-64 aspect-square max-h-[250px]">
        <Chart
          type="pie"
          datasetIdKey={title}
          aria-hidden="false"
          role="figure"
          data={data}
          ref={chartReference}
          onClick={onClick}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
