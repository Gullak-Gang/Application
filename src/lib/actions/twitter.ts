"use server";

import { authClient, getTwitterClient } from "@/lib/twitter-sdk";
import { clearToken } from "@/services/store";
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
    clearToken();
  } catch (error) {
    console.error("Error revoking token:", error);
    throw error;
  }
  return;
};

export const getCurrentUser = async () => {
  noStore();
  try {
    const client = getTwitterClient();
    const user = await client.users.findMyUser();
    return user?.data;
  } catch (error) {
    return null;
  }
};
