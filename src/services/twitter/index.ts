import Client, { auth } from "twitter-api-sdk";
import { clearTokenCookies, getTokensFromCookies, setTokenCookies } from "./cookies";
import { clearTokenKVStore, getTokensFromKVStore, setTokenKVStore } from "./kv_store";
import type { Token } from "./types";

const isCookiesEnabled = process.env.USE_COOKIES === "true";

export const STATE = String(process.env.CLIENT_STATE);
export const CLIENT_ID = String(process.env.CLIENT_ID);
export const CALLBACK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/twitter/callback`;

export const authClient = new auth.OAuth2User({
  client_id: CLIENT_ID,
  callback: CALLBACK_URL,
  scopes: ["tweet.read", "users.read", "offline.access"],
});

export const getValidToken = async () => {
  let token: Token | null = null;

  if (isCookiesEnabled) {
    token = await getTokensFromCookies();
  } else {
    token = await getTokensFromKVStore();
  }

  if (!token) {
    throw new Error("No tokens found in cookies or KV store");
  }

  authClient.token = token;
  if (authClient.isAccessTokenExpired()) {
    if (!token.refresh_token) {
      throw new Error("No refresh token available");
    }
    try {
      const newToken = await refreshTwitterToken(token.refresh_token);
      if (isCookiesEnabled) {
        await setTokenCookies(newToken);
      } else {
        await setTokenKVStore(newToken);
      }
      return newToken;
    } catch (error) {
      if (isCookiesEnabled) {
        await clearTokenCookies();
      } else {
        await clearTokenKVStore();
      }
      throw new Error("Token refresh failed", { cause: error });
    }
  }

  return token;
};

async function refreshTwitterToken(refreshToken: string) {
  try {
    authClient.token = { refresh_token: refreshToken };
    const { token } = await authClient.refreshAccessToken();
    return token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

export const getCurrentUser = async () => {
  try {
    const tokens = await getValidToken();
    authClient.token = tokens;
    const client = new Client(authClient);
    const user = await client.users.findMyUser();
    return user?.data;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};
