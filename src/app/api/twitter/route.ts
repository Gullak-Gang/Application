import { STATE, authClient } from "@/lib/twitter-sdk";
import { setToken } from "@/services/store";
import { unstable_noStore as noStore } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  noStore();
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || state !== STATE) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { token } = await authClient.requestAccessToken(code);
    await setToken(token);

    return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL ?? request?.nextUrl));
  } catch (error) {
    console.error("Error getting access token:", error);
    return NextResponse.json({ error: "Error getting access token" }, { status: 500 });
  }
}
