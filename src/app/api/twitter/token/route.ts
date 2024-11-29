import { getValidToken } from "@/services/twitter";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET() {
  const token = await getValidToken();

  if (!token?.access_token) {
    return await Response.json({
      status: 400,
      message: "No token found",
    });
  }

  return await Response.json({
    status: 200,
    message: "Token Route",
    token: token?.access_token,
  });
}
