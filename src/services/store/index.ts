import { clearTokenKVStore, getTokensFromKVStore, setTokenKVStore } from "@/services/kestra";
import { clearTokenCookies, getTokensFromCookies, setTokenCookies } from "@/services/store/cookies";
import type { Token } from "@/types";

const isCookiesEnabled = process.env.USE_COOKIES === "true";

export const getToken = () => {
  if (isCookiesEnabled) {
    return getTokensFromCookies();
  }

  return getTokensFromKVStore();
};

export const setToken = async (token: Token) => {
  if (isCookiesEnabled) {
    await setTokenCookies(token);
  } else {
    await setTokenKVStore(token);
  }
  return true;
};

export const clearToken = async () => {
  if (isCookiesEnabled) {
    await clearTokenCookies();
  } else {
    await clearTokenKVStore();
  }
  return true;
};
