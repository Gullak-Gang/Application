import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const Assistant = async () => {
  const result = await generateObject({
    model: google("gemini-1.5-flash-latest"),
    prompt: "Who created Java?",
    schema: z.object({
      headline: z.string().describe("headline of the response"),
      details: z.string().describe("more details"),
    }),
  });

  console.log(result.object);

  return <div>PromptPage</div>;
};

export default Assistant;
