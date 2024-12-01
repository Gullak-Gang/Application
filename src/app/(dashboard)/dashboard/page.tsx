"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import NumberTicker from "@/components/ui/number-ticker";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Label, LabelList, Line, LineChart, Pie, PieChart, XAxis } from "recharts";
export const dynamic = "force-dynamic";

const chartDataPie = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];
const chartConfigPie = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "blue",
  },
  safari: {
    label: "Safari",
    color: "yellow",
  },
  firefox: {
    label: "Firefox",
    color: "green",
  },
  edge: {
    label: "Edge",
    color: "pink",
  },
} satisfies ChartConfig;

const chartDataLinear = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfigLinear = {
  desktop: {
    label: "Desktop",
    color: "green",
  },
} satisfies ChartConfig;

export default async function Dashboard() {
  const totalVisitors = useMemo(() => {
    return chartDataPie.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  const chartData = [
    { day: "Monday", posts: 186 },
    { day: "Tuesday", posts: 205 },
    { day: "Wednesday", posts: -207 },
    { day: "Thursday", posts: 173 },
    { day: "Friday", posts: -209 },
    { day: "Saturday", posts: 214 },
    { day: "Sunday", posts: 114 },
  ];

  const chartConfigBar = {
    visitors: {
      label: "posts",
    },
  } satisfies ChartConfig;

  return (
    <>
      <div className="grid grid-rows-2 gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-[400px]">
            <Card className="h-[400px]">
              <CardHeader>
                <CardTitle>posts</CardTitle>
                <CardDescription>Total posts</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigPie} className="mx-auto aspect-square max-h-[250px]">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={chartDataPie} dataKey="visitors" nameKey="browser" strokeWidth={3} scale={5}>
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-primary-foreground text-3xl font-bold"
                                >
                                  {totalVisitors.toLocaleString()}
                                </tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-primary-foreground">
                                  posts
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
              <CardFooter>
                <p>The number of Posts increased by x% this week</p>
              </CardFooter>
            </Card>
          </div>
          <div className="h-[400px]">
            <Card>
              <CardHeader>
                <CardTitle>posts Timeline</CardTitle>
                <CardDescription>Timeline of posts</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigLinear}>
                  <LineChart
                    accessibilityLayer
                    data={chartDataLinear}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line dataKey="desktop" type="linear" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <p>X-hour was most active</p>
              </CardFooter>
            </Card>
          </div>
          <div className="h-[400px]">
            <Card>
              <CardHeader>
                <CardTitle>Sentimental Score</CardTitle>
                <CardDescription>Sentiment Analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black dark:text-white">
                  <NumberTicker value={56.63} decimalPlaces={2} />
                </p>
              </CardContent>
              <CardFooter>
                <p>Sentimen Analysis for the week</p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="m-2">
          <Card>
            <CardHeader>
              <CardTitle>Bar Chart - Negative</CardTitle>
              <CardDescription>1/12/24 - 7/12/24</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigBar}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel hideIndicator />} />
                  <Bar dataKey="posts">
                    <LabelList position="top" dataKey="day" fillOpacity={1} />
                    {chartData.map((item) => (
                      <Cell key={item.day} fill={item.posts > 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">Trending up by 5.2% this month</div>
              <div className="leading-none text-muted-foreground">Showing sentiment anaylsis for this week</div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
