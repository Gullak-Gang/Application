import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const systemMessage = "Hello world!";

  const result = await streamText({
    model: google("gemini-1.5-flash-latest"),
    system: systemMessage,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
