"use server";

import { authClient, getTwitterClient } from "@/lib/twitter-sdk";
import { addHashTagToDB, disconnectDB, getTokensFromDB } from "@/services/db/twitter";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

export const getAuthUrl = async () => {
  noStore();
  const authUrl = await authClient.generateStatelessAuthURL();
  redirect(authUrl);
};

export const revokeToken = async () => {
  noStore();
  try {
    disconnectDB();
  } catch (error) {
    console.error("Error revoking token:", error);
    throw error;
  }
  return;
};

export const addFormDataToDB = async (formData: FormData) => {
  noStore();
  try {
    const hashTag = formData.get("hashTag");
    if (!hashTag) return;
    console.log(hashTag);
    await addHashTagToDB(hashTag.toString());
  } catch (error) {
    console.error("Error adding hash tag to db:", error);
    throw error;
  }
  return;
};

export const getCurrentUser = async () => {
  const token = await getTokensFromDB();

  if (!token) {
    return null;
  }

  const user = await getTwitterClient(token).users.findMyUser();
  return user;
};
