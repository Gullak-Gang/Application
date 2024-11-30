import { STATE, authClient } from "@/services/twitter";
import { setTokenKVStore } from "@/services/twitter/kv_store";
import { type NextRequest, NextResponse } from "next/server";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || state !== STATE) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { token } = await authClient.requestAccessToken(code);

    if (!token?.access_token) {
      return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
    }

    await setTokenKVStore(token);
    return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL ?? request?.nextUrl));
  } catch (error) {
    console.error("Twitter callback error:", error);
    return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
  }
}
