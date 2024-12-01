import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "../../lib/db";
import { instagramUserConnections } from "../../lib/db/schema/schema";

export const saveToDB = async (apifyToken: string, hashtag: string, posts: string) => {
  noStore();
  const { userId } = await auth();
  if (!userId) return;
  console.log({ apifyToken, hashtag, posts });
  const data =
    await db
      .insert(instagramUserConnections)
      .values({
        userId: userId,
        apifyToken: apifyToken.toString(),
        hashtag: hashtag.toString(),
        numberOfPosts: posts.toString(),
        disconnectedAt: null,
      })
      .onConflictDoUpdate({
        target: instagramUserConnections.userId,
        set: {
          apifyToken: apifyToken.toString(),
          hashtag: hashtag.toString(),
          numberOfPosts: posts.toString(),
          disconnectedAt: null,
        },
      }).returning();
  console.log(data)
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

export const getTokensFromDB = async () => {
  noStore();
  const { userId } = await auth();
  if (!userId) return;
  const data = await db.select().from(instagramUserConnections).where(eq(instagramUserConnections.userId, userId));
  return data?.[0];
};
