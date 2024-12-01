import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "../../lib/db";
import { instagramUserConnections } from "../../lib/db/schema/schema";

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
    .onConflictDoUpdate({
      target: instagramUserConnections.userId,
      set: {
        apifyToken: apifyToken.toString(),
        disconnectedAt: null,
      },
    });
};

export const removeFromDB = async () => {
  noStore();
  const { userId } = await auth();
  if (!userId) return;
  await db
    .update(instagramUserConnections)
    .set({ disconnectedAt: new Date().toUTCString() })
    .where(eq(instagramUserConnections.userId, userId));
};

export const getConnections = async () => {
  noStore();
  const { userId } = await auth();
  if (!userId) return;
  const data = await db.select().from(instagramUserConnections).where(eq(instagramUserConnections.userId, userId));
  return data;
};
