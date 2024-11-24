"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function generateTags({
  title,
  description,
  type,
  url,
}: {
  title: string;
  description: string;
  type: string;
  url: string;
}) {
  const { object: tags } = (await generateObject({
    model: openai("gpt-3.5-turbo"),
    system:
      "Generate 3 broad, one-word tags with the first letter capitalized that capture the general theme of a given URL. Tags should be relevant, unique, and easy to understand, avoiding special characters, compound words, or phrases. Focus on providing clear, general descriptors that help users grasp the overall topic of the URL.",
    messages: [
      {
        role: "user",
        content: `Title: ${title}. Description: ${description}. Type: ${type} URL: ${url}`,
      },
    ],
    schema: z.object({
      tags: z.array(z.string()).describe("The tags generated for the URL."),
    }),
  })) as {
    object: {
      tags: string[];
    };
  };

  return tags;
}
