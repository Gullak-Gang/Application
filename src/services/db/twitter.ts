import { db } from "@/lib/db";
import { twitterUserConnections } from "@/lib/db/schema/schema";
import type { Token } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getTokensFromDB = async (): Promise<Token | null> => {
  const { userId } = await auth();
  if (!userId) return null;

  const tokens = await db.query.twitterUserConnections.findFirst({
    where: (connections, { isNull, and, eq }) =>
      and(eq(connections.userId, userId), isNull(connections.disconnectedAt)),
  });

  if (!tokens?.accessToken || !tokens.refreshToken) return null;
  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;
  const expiresAt = tokens.expiresAt;

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt ? Number.parseInt(expiresAt) : undefined,
  };
};

export const setTokenDB = async (tokens: Token) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not logged in");
  }

  if (!tokens.access_token || !tokens.refresh_token || !tokens.expires_at) {
    throw new Error("No token found");
  }

  await db
    .insert(twitterUserConnections)
    .values({
      userId: userId,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: tokens.expires_at.toString(),
      disconnectedAt: null,
    })
    .onConflictDoUpdate({
      target: twitterUserConnections.userId,
      set: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: tokens.expires_at.toString(),
        disconnectedAt: null,
      },
    });

  return true;
};

export const addHashTagToDB = async (hashTag: string, posts: string) => {
  const { userId } = await auth();
  if (!userId) return;

  await db
    .update(twitterUserConnections)
    .set({ hashtag: hashTag, numberOfPosts: posts })
    .where(eq(twitterUserConnections.userId, userId));
};

export const disconnectDB = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not logged in");
  }

  await db
    .update(twitterUserConnections)
    .set({ disconnectedAt: new Date().toUTCString() })
    .where(eq(twitterUserConnections.userId, userId));
};
