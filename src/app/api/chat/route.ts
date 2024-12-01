import { getAnalysis } from "@/lib/actions/analysis";
import { createResource } from "@/lib/actions/resources";
import { findRelevantContent } from "@/lib/ai/embedding";
import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const data = await getAnalysis();

  const systemMessage = `${data}
  You are a helpful assistant. You are allowed to use knowledge from your knowledge base to answer questions.
    Use the addResource tool to add a resource to your knowledge base.
  `;

  const result = streamText({
    model: google("gemini-1.5-flash-latest"),
    system: systemMessage,
    messages: convertToCoreMessages(messages),
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z.string().describe("the content or resource to add to the knowledge base"),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: "get information from your knowledge base to answer questions.",
        parameters: z.object({
          question: z.string().describe("the users question"),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });

  return result.toDataStreamResponse();
}
