import { auth } from "twitter-api-sdk";
import { clearTokenCookies, getTokensFromCookies, setTokenCookies } from "./cookies";

export const STATE = String(process.env.CLIENT_STATE);
export const CLIENT_ID = String(process.env.CLIENT_ID);
export const CALLBACK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/twitter/callback`;

export const authClient = new auth.OAuth2User({
  client_id: CLIENT_ID,
  callback: CALLBACK_URL,
  scopes: ["tweet.read", "users.read", "offline.access"],
});

export const getValidToken = async () => {
  const tokens = getTokensFromCookies();

  if (!tokens) {
    throw new Error("No tokens found");
  }

  if (tokens.expires_at && Date.now() > tokens.expires_at) {
    if (!tokens.refresh_token) {
      throw new Error("No refresh token available");
    }

    try {
      const newTokens = await refreshTwitterToken(tokens.refresh_token);
      setTokenCookies(newTokens);
      return newTokens;
    } catch (error) {
      clearTokenCookies();
      throw new Error("Token refresh failed", {
        cause: error,
      });
    }
  }

  return tokens;
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

// const createTwitterClient = (token: Token) => {
//   if (!token) {
//     throw new Error("No access token found");
//   }

//   const authClient = new auth.OAuth2User({
//     client_id: CLIENT_ID,
//     token: token,
//     callback: CALLBACK_URL,
//     scopes: ["tweet.read", "users.read", "offline.access"],
//   });

//   return new Client(authClient);
// };
