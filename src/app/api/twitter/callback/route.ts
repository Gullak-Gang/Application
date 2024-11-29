import { STATE, authClient } from "@/services/twitter";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || state !== STATE) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    console.log({ state, code });

    const { token } = await authClient.requestAccessToken(code);

    console.log(token);
    // const cookieStore = cookies();

    // cookieStore.set("twitter_access_token", token.access_token ?? "", {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    //   path: "/",
    // });

    // if (token.refresh_token) {
    //   cookieStore.set("twitter_refresh_token", token.refresh_token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax",
    //     path: "/",
    //   });
    // }
    // Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Twitter callback error:", error);
    return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
  }
}
