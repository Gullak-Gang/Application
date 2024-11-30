import { getToken } from "@/services/store";
import Client, { auth } from "twitter-api-sdk";

export const STATE = String(process.env.CLIENT_STATE);
export const CLIENT_ID = String(process.env.CLIENT_ID);
export const CALLBACK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/twitter`;
export const CLIENT_SECRET = String(process.env.CLIENT_SECRET);

export const authClient = new auth.OAuth2User({
  client_id: CLIENT_ID,
  callback: CALLBACK_URL,
  client_secret: CLIENT_SECRET,
  scopes: ["tweet.read", "users.read", "offline.access"],
});

export const getAuthedClient = async () => {
  const token = await getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const ac = new auth.OAuth2User({
    client_id: CLIENT_ID,
    callback: CALLBACK_URL,
    client_secret: CLIENT_SECRET,
    scopes: ["tweet.read", "users.read", "offline.access"],
    token,
  });

  return new Client(ac);
};
