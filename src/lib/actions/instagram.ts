"use server";

import { auth } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "../db";
import { instagramUserConnections } from "../db/schema/schema";

export const saveToDB = async (formData: FormData) => {
  noStore();
  const { userId } = await auth();
  if (!userId) return;
  const apifyToken = formData.get("apifyToken");
  if (!apifyToken) return;

  await db
    .insert(instagramUserConnections)
    .values({
      userId: userId,
      apifyToken: apifyToken.toString(),
      disconnectedAt: null,
    })
    .returning();
};
