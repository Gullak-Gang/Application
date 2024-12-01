import { subDays } from "date-fns";
import { db } from "../db";

export const getAnalysis = async (userId: string | null) => {
  if (!userId) return null;
  const data = await db.query.analysisResultNew.findMany({
    orderBy: (analysisResult, { desc }) => [desc(analysisResult.dateCreated)],
    where: (analysisResult, { gte, and, eq }) => and(eq(analysisResult.userId, userId), gte(analysisResult.dateCreated, subDays(new Date(), 7).toISOString())),
  });
  return data;
};
