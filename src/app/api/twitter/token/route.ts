export async function GET() {
  return await Response.json({
  status: 200,
    message: "Token Route",
    token: "token",
  });
}
