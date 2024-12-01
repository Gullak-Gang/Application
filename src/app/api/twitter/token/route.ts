import { getToken } from "@/services/store";
export const fetchCache = "force-no-store";
export const revalidate = 0;
export const runtime = "edge";

export async function GET() {
  try {
    const token = await getToken();

    return Response.json({
      status: 200,
      message: "Success",
      token: token?.access_token,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Failed to get token",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
