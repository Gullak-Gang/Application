import { addKeyValue, deleteKeyValue, getKeyValue } from "../kestra/kv_store";
import type { Token } from "./types";

export const getTokensFromKVStore = async (): Promise<Token | null> => {
  const accessToken = await getKeyValue("twitter_access_token");
  const refreshToken = await getKeyValue("twitter_refresh_token");
  const expiresAt = await getKeyValue("twitter_token_expires_at");

  if (!accessToken || !refreshToken) return null;

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt ? Number.parseInt(expiresAt) : undefined,
  };
};

export const setTokenKVStore = async (tokens: Token) => {
  if (!tokens.access_token) {
    throw new Error("No token found");
  }

  await addKeyValue("twitter_access_token", tokens.access_token);

  if (tokens.refresh_token) {
    await addKeyValue("twitter_refresh_token", tokens.refresh_token);
  }

  if (tokens.expires_at) {
    await addKeyValue("twitter_token_expires_at", tokens.expires_at.toString());
  }
};

export const clearTokenKVStore = async () => {
  await deleteKeyValue("twitter_access_token");
  await deleteKeyValue("twitter_refresh_token");
  await deleteKeyValue("twitter_token_expires_at");
};
