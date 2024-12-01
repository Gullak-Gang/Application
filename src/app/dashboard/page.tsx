"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import React from "react";

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
  },  firefox: {
    label: "Firefox",
    color: "green",
  },  edge: {
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
  const totalVisitors = React.useMemo(() => {
    return chartDataPie.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  const chartData = [
    { day: "Monday", Reposts: 186 },
    { day: "Tuesday", Reposts: 205 },
    { day: "Wednesday", Reposts: -207 },
    { day: "Thursday", Reposts: 173 },
    { day: "Friday", Reposts: -209 },
    { day: "Saturday", Reposts: 214 },
    { day: "Sunday", Reposts: 114 },
  ];

  const chartConfigBar = {
    visitors: {
      label: "Reposts",
    },
  } satisfies ChartConfig;
  return (
    <>
      <div className="grid grid-rows-2 gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-[400px]">
            <Card className="h-[400px]">
              <CardHeader>
                <CardTitle>Reposts</CardTitle>
                <CardDescription>Total Reposts</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigPie}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartDataPie}
                      dataKey="visitors"
                      nameKey="browser"
                      strokeWidth={3}
                      scale={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-primary-foreground text-3xl font-bold"
                                >
                                  {totalVisitors.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-primary-foreground"
                                >
                                  Reposts
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
                <CardTitle>Reposts Timeline</CardTitle>
                <CardDescription>Timeline of resposts</CardDescription>
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
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="desktop"
                      type="linear"
                      stroke="var(--color-desktop)"
                      strokeWidth={2}
                      dot={false}
                    />
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
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
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
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                  />
                  <Bar dataKey="Reposts">
                    <LabelList position="top" dataKey="day" fillOpacity={1} />
                    {chartData.map((item) => (
                      <Cell
                        key={item.day}
                        fill={
                          item.Reposts > 0
                            ? "hsl(var(--chart-1))"
                            : "hsl(var(--chart-2))"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month
              </div>
              <div className="leading-none text-muted-foreground">
                Showing sentiment anaylsis for this week
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

//total reposts
// timeline of data from a specifc
