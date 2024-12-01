import { type ClassValue, clsx } from "clsx";
import { format, getISOWeek, getYear, isValid, max, min, parseISO } from "date-fns";
import type { InferSelectModel } from "drizzle-orm";
import { twMerge } from "tailwind-merge";
import type { analysisResult } from "./db/schema/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateRange = (data: InferSelectModel<typeof analysisResult>[]) => {
  if (!data || data.length === 0) return { startDate: null, endDate: null };

  const dates = data.map((item) => parseISO(item.dateCreated ?? "")).filter(isValid);

  if (dates.length === 0) return { startDate: null, endDate: null };

  const startDate = format(min(dates), "PP");
  const endDate = format(max(dates), "PP");

  return { startDate, endDate };
};

export const calculateWeeklyTrend = (data: InferSelectModel<typeof analysisResult>[]) => {
  if (!data || data.length === 0) return { trendPercentage: 0, trendText: null };

  const weeklyCounts: Record<string, number> = {};

  for (let i = 0; i < data.length; i++) {
    const date = parseISO(data[i].dateCreated ?? "");
    if (isValid(date)) {
      const key = `${getYear(date)}-W${getISOWeek(date)}`;
      weeklyCounts[key] = (weeklyCounts[key] || 0) + 1;
    }
  }

  const weeks = Object.keys(weeklyCounts).sort();
  const currentWeek = weeks[weeks.length - 1];
  const previousWeek = weeks[weeks.length - 2];

  if (!currentWeek || !previousWeek) return { trendPercentage: 0, trendText: null };

  const currentCount = weeklyCounts[currentWeek] || 0;
  const previousCount = weeklyCounts[previousWeek] || 0;

  const trendPercentage = previousCount > 0 ? ((currentCount - previousCount) / previousCount) * 100 : 0;

  const trendText = trendPercentage > 0 ? "up" : trendPercentage < 0 ? "down" : "no change";

  return {
    trendPercentage: trendPercentage ?? 0,
    trendText,
  };
};

export const calculateAverageWordCounts = (data: InferSelectModel<typeof analysisResult>[]) => {
  const sentimentGroups = data.reduce((acc, item) => {
    if (!acc[item.sentiment]) {
      acc[item.sentiment] = { positiveTotal: 0, negativeTotal: 0, count: 0 };
    }
    acc[item.sentiment].positiveTotal += item.positiveWordCount;
    acc[item.sentiment].negativeTotal += item.negativeWordCount;
    acc[item.sentiment].count += 1;
    return acc;
  }, {} as Record<string, { positiveTotal: number; negativeTotal: number; count: number }>);

  const chartData = Object.keys(sentimentGroups).map((sentiment) => {
    const { positiveTotal, negativeTotal, count } = sentimentGroups[sentiment];
    return {
      sentiment,
      averagePositiveWordCount: (positiveTotal / count).toFixed(2),
      averageNegativeWordCount: (negativeTotal / count).toFixed(2),
    };
  });

  return chartData;
};
