import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Statistic } from "@workspace/validators";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Pie, PieChart as RePieChart } from "recharts";

export interface PieChartProperties {
  chartData: Statistic[];
  title: string;
  baseUrl: string;
}

type AdditionalMetadata = {
  fill: string;
  url: string;
};

type PieClickData<Statistic> = {
  payload: Statistic & AdditionalMetadata;
};

const palette = [
  "color-mix(in oklab, var(--primary) 100%, white 0%)",
  "color-mix(in oklab, var(--primary) 88%, white 12%)",
  "color-mix(in oklab, var(--primary) 76%, white 24%)",
  "color-mix(in oklab, var(--primary) 64%, white 36%)",
  "color-mix(in oklab, var(--primary) 52%, white 48%)",
  "color-mix(in oklab, var(--primary) 40%, white 60%)",
  "color-mix(in oklab, var(--primary) 28%, white 72%)",
  "color-mix(in oklab, var(--primary) 16%, white 84%)",
  "color-mix(in oklab, var(--primary) 8%, white 92%)",
  "color-mix(in oklab, var(--primary) 4%, white 96%)",
];

function addMetadataToData(
  data: Statistic[],
  palette: string[],
  baseUrl: string,
): (Statistic & AdditionalMetadata)[] {
  return data.map((entry, index) => ({
    ...entry,
    fill: palette[index % palette.length],
    // This assumes the base url is to the admin scenario data table page, and the parameter
    // needs to be in quotes to make it look like JSON.
    url: `${baseUrl}%22${entry.item}%22`,
  }));
}

function getChartConfig(
  chartData: Statistic[],
  palette: string[],
): ChartConfig {
  const config: ChartConfig = {};

  for (const [index, data] of chartData.entries()) {
    config[data.item] = {
      label: data.item,
      theme: {
        light: palette[index % palette.length],
        dark: palette[index % palette.length],
      },
    };
  }

  return config;
}

export default function PieChart({
  chartData,
  title,
  baseUrl,
}: PieChartProperties) {
  const router = useRouter();

  const colorizedData = useMemo(() => {
    return addMetadataToData(chartData ?? [], palette, baseUrl);
  }, [baseUrl, chartData]);

  const chartConfig = useMemo(() => {
    return getChartConfig(chartData, palette);
  }, [chartData]);

  // Click handler for pie wedges
  const handlePieClick = useCallback(
    (data: PieClickData<Statistic>) => {
      if (data && data.payload) {
        router.push(data.payload.url);
      }
    },
    [router],
  );

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-64 h-64 aspect-square max-h-[250px]"
        >
          <RePieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={colorizedData}
              dataKey="count"
              nameKey="item"
              onClick={handlePieClick}
            />
          </RePieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
