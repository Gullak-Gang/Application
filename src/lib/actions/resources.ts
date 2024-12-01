"use server";

import { generateEmbeddings } from "@/lib/ai/embedding";
import { db } from "@/lib/db";
import { embeddings as embeddingsTable } from "@/lib/db/schema/embeddings";
import { type NewResourceParams, insertResourceSchema, resources } from "@/lib/db/schema/resources";

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = insertResourceSchema.parse(input);

    const [resource] = await db.insert(resources).values({ content }).returning();

    const embeddings = await generateEmbeddings(content);
    await db.insert(embeddingsTable).values(
      embeddings.map((embedding) => ({
        resourceId: resource.id,
        ...embedding,
      }))
    );

    return "Resource successfully created and embedded.";
  } catch (error) {
    return error instanceof Error && error.message.length > 0 ? error.message : "Error, please try again.";
  }
};
