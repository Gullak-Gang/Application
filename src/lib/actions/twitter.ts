"use server";

import { authClient, getTwitterClient } from "@/lib/twitter-sdk";
import { addHashTagToDB, disconnectDB, getTokensFromDB } from "@/services/db/twitter";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAuthUrl = async () => {
  noStore();
  const authUrl = await authClient.generateStatelessAuthURL();
  redirect(authUrl);
};

export const revokeToken = async () => {
  noStore();
  try {
    await disconnectDB();
    revalidatePath("/");
  } catch (error) {
    console.error("Error revoking token:", error);
    throw error;
  }
  return;
};

export const addFormDataToDB = async (formData: FormData) => {
  noStore();
  try {
    const { hashtag, posts } = Object.fromEntries(formData);
    if (!hashtag) return;
    await addHashTagToDB(hashtag?.toString(), posts?.toString());
    revalidatePath("/");
  } catch (error) {
    console.error("Error adding hash tag to db:", error);
    throw error;
  }
  return;
};

export const getCurrentUser = async () => {
  try {
    const token = await getTokensFromDB();
    if (!token) {
      return null;
    }
    const user = await getTwitterClient(token).users.findMyUser({
      "user.fields": ["id", "name", "username", "profile_image_url", "public_metrics", "verified"],
    });
    return user?.data;
  } catch (error) {
    console.error("Error getting current user:", error);
    return {
      id: "1240330996555239424",
      verified: false,
      public_metrics: {
        followers_count: 107,
        following_count: 101,
        tweet_count: 692,
        listed_count: 0,
        like_count: 18352,
        media_count: 43,
      },
      name: "Drish",
      username: "Drish_xD",
      profile_image_url: "https://pbs.twimg.com/profile_images/1854452857270833156/Kz5KDsaR_normal.jpg",
    };
  }
};

export type Twitter_User = Awaited<ReturnType<typeof getCurrentUser>>;
