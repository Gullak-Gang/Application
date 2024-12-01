import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="aspect-video" />
        <Skeleton className="aspect-video" />
        <Skeleton className="aspect-video" />
      </div>
      <Skeleton className="aspect-video flex-1" />
    </div>
  );
};

export default DashboardLoading;
