"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MagicCard } from "@/components/ui/magic-card";
import type { analysisResultNew } from "@/lib/db/schema/schema";
import { calculateWeeklyTrend, getDateRange } from "@/lib/utils";
import type { InferSelectModel } from "drizzle-orm";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  analysis: {
    label: "Analysis",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const MainChart = ({ data }: { data: InferSelectModel<typeof analysisResultNew>[] }) => {
  const { endDate, startDate, chartData, trendPercentage, trendText } = useMemo(() => {
    const { endDate, startDate } = getDateRange(data);
    const chartData = data.map((item, index) => ({ id: (index + 1).toString(), score: item?.score }));
    const { trendPercentage, trendText } = calculateWeeklyTrend(data);
    return { endDate, startDate, chartData, trendPercentage, trendText };
  }, [data]);

  return (
    <MagicCard className="flex flex-col">
      <CardHeader>
        <CardTitle>Analysis</CardTitle>
        <CardDescription>
          {startDate} to {endDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="id"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis dataKey="score" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="score" type="natural" stroke="var(--color-analysis)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {trendText ? (
        <CardFooter className="flex gap-2 font-medium leading-none">
          Trending {trendText} by {trendPercentage}%{" "}
          {trendPercentage > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        </CardFooter>
      ) : null}
    </MagicCard>
  );
};

export default MainChart;
