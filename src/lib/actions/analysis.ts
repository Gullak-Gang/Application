import { subDays } from "date-fns";
import { db } from "../db";

export const getAnalysis = async () => {
  const data = await db.query.analysisResult.findMany({
    orderBy: (analysisResult, { desc }) => [desc(analysisResult.dateCreated)],
    where: (analysisResult, { gte }) => gte(analysisResult.dateCreated, subDays(new Date(), 7).toISOString()),
  });
  return data;
};
