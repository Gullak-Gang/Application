"use server";

import { authClient } from "@/lib/twitter-sdk";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

export const getAuthUrl = async () => {
  noStore();
  const authUrl = await authClient.generateStatelessAuthURL();
  redirect(authUrl);
};

export const getCurrentUser = async () => {
  try {
    return await {
      profile_image_url: "https://pbs.twimg.com/profile_images/1854452857270833156/Kz5KDsaR_normal.jpg",
      public_metrics: {
        followers_count: 111,
        following_count: 101,
        tweet_count: 692,
        listed_count: 0,
        like_count: 18350,
        media_count: 43,
      },
      name: "Drish",
      id: "1240330996555239424",
      username: "Drish_xD",
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};
