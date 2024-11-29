import { STATE, authClient } from "@/services/twitter";
import { type NextRequest, NextResponse } from "next/server";

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
