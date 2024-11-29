import { cookies } from "next/headers";

export interface Token {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  scope?: string;
  expires_at?: number;
}

export const getTokensFromCookies = (): Token | null => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("twitter_access_token")?.value;
  const refreshToken = cookieStore.get("twitter_refresh_token")?.value;
  const expiresAt = cookieStore.get("twitter_token_expires_at")?.value;

  if (!accessToken) return null;

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt ? Number.parseInt(expiresAt) : undefined,
  };
};

export const setTokenCookies = (tokens: Token) => {
  const cookieStore = cookies();
  if (!tokens.access_token) {
    throw new Error("No token found");
  }

  cookieStore.set("twitter_access_token", tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  if (tokens.refresh_token) {
    cookieStore.set("twitter_refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  if (tokens.expires_at) {
    cookieStore.set("twitter_token_expires_at", tokens.expires_at.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }
};

export const clearTokenCookies = () => {
  const cookieStore = cookies();
  cookieStore.delete("twitter_access_token");
  cookieStore.delete("twitter_refresh_token");
  cookieStore.delete("twitter_token_expires_at");
};
