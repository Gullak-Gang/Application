export async function GET() {
  return await Response.json({ status: 200, message: "Health Check Route" });
}
