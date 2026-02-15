console.log("ENV KEY:", process.env.OPENAI_API_KEY);

import OpenAI from "openai";
import { buildPostPrompt } from "../utils/prompts.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generatePost(productType) {
  const prompt = buildPostPrompt(productType);

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.9,
    messages: [
      {
        role: "system",
        content: "შენ ხარ ASTROMAN-ის მთავარი მარკეტინგ დირექტორი. წერ ქართულად."
      },
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content;
}
