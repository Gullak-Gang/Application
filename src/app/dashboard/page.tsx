"use client";
import Image from "next/image";
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
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";


export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const chartData = [
    { day: "Monday", Reposts: 186 },
    { day: "Tuesday", Reposts: 205 },
    { day: "Wednesday", Reposts: -207 },
    { day: "Thursday", Reposts: 173 },
    { day: "Friday", Reposts: -209 },
    { day: "Saturday", Reposts: 214 },
    { day: "Sunday", Reposts: 114 },
  ];

  const chartConfig = {
    visitors: {
      label: "Reposts",
    },
  } satisfies ChartConfig;
  return (
    <>
      <div className="flex-col">
        <div className="flex justify-around">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Reposts</CardTitle>
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
          <div>
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
          <div>
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
              <ChartContainer config={chartConfig}>
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