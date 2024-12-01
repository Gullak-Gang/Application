"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MagicCard } from "@/components/ui/magic-card";
import type { analysisResult } from "@/lib/db/schema/schema";
import { calculateAverageWordCounts, getDateRange } from "@/lib/utils";
import type { InferSelectModel } from "drizzle-orm";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis } from "recharts";

const pieConfig = {
  posts: {
    label: "Posts",
  },
  positive: {
    label: "Positive",
    color: "hsl(var(--chart-1))",
  },
  negative: {
    label: "Negative",
    color: "hsl(var(--chart-3))",
  },
  nutral: {
    label: "Nutral",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PieChartCard({ data }: { data: InferSelectModel<typeof analysisResult>[] }) {
  const { totalPosts, chartData } = useMemo(() => {
    const totalPosts = (data?.length ?? 0).toLocaleString();
    const sentimentCounts = data?.reduce(
      (acc, item) => {
        acc[item?.sentiment]++;
        return acc;
      },
      { NEUTRAL: 0, POSITIVE: 0, NEGATIVE: 0 }
    );
    const chartData = [
      { name: "positive", posts: sentimentCounts?.POSITIVE ?? 0, fill: "hsl(var(--chart-1))" },
      { name: "negative", posts: sentimentCounts?.NEGATIVE ?? 0, fill: "hsl(var(--chart-2))" },
      { name: "nutral", posts: sentimentCounts?.NEUTRAL ?? 0, fill: "hsl(var(--chart-3))" },
    ];
    return { totalPosts, chartData };
  }, [data]);

  return (
    <MagicCard className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">Feed Sentiment Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="posts" nameKey="name" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalPosts}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Posts
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Showing total posts for the last week</div>
      </CardFooter>
    </MagicCard>
  );
}


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const barConfig = {
  positive: {
    label: "Positive Word Count",
    color: "hsl(var(--chart-1))",
  },
  negative: {
    label: "Negative Word Count",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export const BarChartCard = ({ data }: { data: InferSelectModel<typeof analysisResult>[] }) => {
  const { endDate, startDate, chartData } = useMemo(() => {
    const rawData = calculateAverageWordCounts(data);
    const { endDate, startDate } = getDateRange(data);

    const chartData = rawData?.map((item) => ({
      sentiment: item.sentiment,
      positive: item.averagePositiveWordCount,
      negative: item.averageNegativeWordCount,
    }));


    return { endDate, startDate, chartData };
  }, [data]);

  return (
    <MagicCard className="flex flex-col">
      <CardHeader>
        <CardTitle>Word Count Analysis</CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <ChartContainer config={barConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sentiment"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="positive" fill="var(--color-positive)" radius={4} />
            <Bar dataKey="negative" fill="var(--color-negative)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mt-auto block">
        <p className="text-sm leading-none">{startDate} to {endDate}</p>
      </CardFooter>
    </MagicCard>
  )
}