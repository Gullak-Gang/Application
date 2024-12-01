"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MagicCard } from "@/components/ui/magic-card";
import { analysisResult } from "@/lib/db/schema/schema";
import { InferSelectModel } from "drizzle-orm";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ];

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
    const sentimentCounts = data?.reduce((acc, item) => { acc[item?.sentiment]++; return acc; }, { NEUTRAL: 0, POSITIVE: 0, NEGATIVE: 0 });
    const chartData = [
      { name: "positive", posts: sentimentCounts?.POSITIVE ?? 0, fill: "hsl(var(--chart-1))" },
      { name: "negative", posts: sentimentCounts?.NEGATIVE ?? 0, fill: "hsl(var(--chart-2))" },
      { name: "nutral", posts: sentimentCounts?.NEUTRAL ?? 0, fill: "hsl(var(--chart-3))" },
    ]
    return { totalPosts, chartData }
  }, [data])

  return (
    <MagicCard className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">Feed Sentiment Distribution</CardTitle>
        <CardDescription>Analysis from your data</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
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
