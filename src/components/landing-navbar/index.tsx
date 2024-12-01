import { ChartBarStacked } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../app-bar/theme-btn";

const LandingNavigation = () => {
  return (
    <header className="fixed inset-x-0 top-2 z-10 flex h-20 items-center justify-between mx-4 mt-2 p-4 bg-secondary/40 dark:bg-secondary/10 backdrop-blur rounded-3xl">
      <Link href="/dashboard" className="flex flex-row gap-2">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/50">
          <ChartBarStacked className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Gullak</span>
          <span className="truncate text-xs">Analytics</span>
        </div>
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default LandingNavigation;
