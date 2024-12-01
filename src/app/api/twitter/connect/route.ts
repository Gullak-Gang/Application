import { STATE, authClient } from "@/lib/twitter-sdk";
import { type NextRequest, NextResponse } from "next/server";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const runtime = "edge";

export function GET(_request: NextRequest) {
  try {
    const authUrl = authClient.generateAuthURL({
      state: STATE,
      code_challenge_method: "s256",
    });
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Twitter auth error:", error);
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 });
  }
}
