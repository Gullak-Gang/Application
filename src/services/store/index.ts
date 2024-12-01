import { clearTokenKVStore } from "@/services/kestra";
import { clearTokenCookies } from "@/services/store/cookies";
import type { Token } from "@/types";
import { getTokensFromDB, setTokenDB } from "../twitter/db";

const isCookiesEnabled = process.env.USE_COOKIES === "true";

export const getToken = () => {
  // if (isCookiesEnabled) {
  //   return getTokensFromCookies();
  // }
  //
  // return getTokensFromKVStore();
  return getTokensFromDB();
};

export const setToken = async (token: Token) => {
  // if (isCookiesEnabled) {
  //   await setTokenCookies(token);
  // } else {
  //   await setTokenKVStore(token);
  // }
  //
  await setTokenDB(token);
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
