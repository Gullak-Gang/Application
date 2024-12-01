"use server";

import { getTokensFromDB, removeFromDB, saveToDB } from "@/services/db/instagram";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export const disconnectInsta = async () => {
  noStore();
  try {
    await removeFromDB();
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
    const { apifyToken, hashtag, posts } = Object.fromEntries(formData);
    if (!hashtag) return;
    await saveToDB(apifyToken?.toString(), hashtag?.toString(), posts?.toString());
    revalidatePath("/");
  } catch (error) {
    console.error("Error adding hash tag to db:", error);
    throw error;
  }
  return;
};

export const getCurrentInsaUser = async () => {
  try {
    const token = await getTokensFromDB();
    if (!token) {
      return null;
    }
    return token;
  } catch (error) {
    return null;
  }
};

export type Insta_User = Awaited<ReturnType<typeof getCurrentInsaUser>>;
