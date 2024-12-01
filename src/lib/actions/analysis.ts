import { db } from "../db";
import { analysisResult } from "../db/schema/schema";

export const getAnalysis = async () => {
  const data = await db.select().from(analysisResult).limit(100);
  return data;
};
