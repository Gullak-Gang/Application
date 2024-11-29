import Client, { auth } from "twitter-api-sdk";

export const authClient = new auth.OAuth2User({
  client_id: String(process.env.CLIENT_ID),
  callback: `${process.env.NEXT_PUBLIC_BASE_URL}/api/twitter/callback`,
  scopes: ["tweet.read", "users.read", "offline.access"],
});

export const STATE = String(process.env.CLIENT_STATE);

export const twitterSdk = new Client(authClient);
