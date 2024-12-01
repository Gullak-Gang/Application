import { getAnalysis } from "@/lib/actions/analysis";
import { auth } from "@clerk/nextjs/server";
import MainChart from "./components/main-chart";
import { BarChartCard, OverallScoreCard, PieChartCard } from "./components/stats-card";
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const { userId } = await auth()

  const data = await getAnalysis(userId);

  if (!data) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video" >No Data</div>
          <div className="aspect-video" >No Data</div>
          <div className="aspect-video" >No Data</div>
        </div>
        <div className="aspect-video flex-1">No Data</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <OverallScoreCard data={data} />
        <PieChartCard data={data} />
        <BarChartCard data={data} />
      </div>
      <MainChart data={data} />
    </div>
  );
}
