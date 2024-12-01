import { Client } from "twitter-api-sdk";
import { OAuth2User } from "twitter-api-sdk/dist/OAuth2User";

export const STATE = String(process.env.CLIENT_STATE);
export const CLIENT_ID = String(process.env.CLIENT_ID);
export const CALLBACK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/twitter`;
export const CLIENT_SECRET = String(process.env.CLIENT_SECRET);

export class StatelessOAuth2User extends OAuth2User {
  generateStatelessAuthURL(): string {
    const CODE_CHALLENGE = "hackfrost_oauth_challenge";
    return this.generateAuthURL({
      state: STATE,
      code_challenge: CODE_CHALLENGE,
      code_challenge_method: "plain",
    });
  }

  requestStatelessAccessToken(code?: string) {
    this.generateStatelessAuthURL();
    return this.requestAccessToken(code);
  }
}

export const authClient = new StatelessOAuth2User({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  callback: CALLBACK_URL,
  scopes: ["tweet.read", "users.read", "offline.access"],
});

export const getTwitterClient = () => {
  return new Client(authClient);
};
