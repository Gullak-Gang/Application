import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { analysisResult } from "@/lib/db/schema/schema";
import type { InferSelectModel } from "drizzle-orm";
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";

export const MainChart = ({ data }: { data: InferSelectModel<typeof analysisResult>[] }) => {
  return (
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
              {data?.map((item) => (
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
  );
};

export default MainChart;
