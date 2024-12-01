"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { analysisResult } from "@/lib/db/schema/schema";
import { InferSelectModel } from "drizzle-orm";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ];

const chartConfig = {
  posts: {
    label: "Posts",
  },
  positive: {
    label: "Positive",
    color: "hsl(var(--chart-1))",
  },
  negative: {
    label: "Negative",
    color: "hsl(var(--chart-2))",
  },
  nutral: {
    label: "Nutral",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function PieChartCard({ data }: { data: InferSelectModel<typeof analysisResult>[] }) {


  const { totalPosts, chartData } = useMemo(() => {
    const totalPosts = (data?.length ?? 0).toLocaleString();
    const sentimentCounts = data?.reduce((acc, item) => { acc[item?.sentiment]++; return acc; }, { NEUTRAL: 0, POSITIVE: 0, NEGATIVE: 0 });
    const chartData = [
      { name: "Positive", visitors: sentimentCounts?.POSITIVE ?? 0, fill: "hsl(var(--chart-1))" },
      { name: "Negative", visitors: sentimentCounts?.NEGATIVE ?? 0, fill: "hsl(var(--chart-2))" },
      { name: "Nutral", visitors: sentimentCounts?.NEUTRAL ?? 0, fill: "hsl(var(--chart-3))" },
    ]
    return { totalPosts, chartData }
  }, [data])


  // const totalVisitors = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  // }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalPosts}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Visitors
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
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  );
}

// const StatsCard = ({ data }: { data: InferSelectModel<typeof analysisResult>[] }) => {
//   return (
//     <Card className="h-[400px]">
//       <CardHeader>
//         <CardTitle>posts</CardTitle>
//         <CardDescription>Total posts</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfigPie} className="mx-auto aspect-square max-h-[250px]">
//           <PieChart>
//             <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//             <Pie data={chartDataPie} dataKey="visitors" nameKey="browser" strokeWidth={3} scale={5}>
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
//                         <tspan x={viewBox.cx} y={viewBox.cy} className="fill-primary-foreground text-3xl font-bold">
//                           {totalVisitors.toLocaleString()}
//                         </tspan>
//                         <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-primary-foreground">
//                           posts
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         <p>The number of Posts increased by x% this week</p>
//       </CardFooter>
//     </Card>
//   );
// }

// export default StatsCard
