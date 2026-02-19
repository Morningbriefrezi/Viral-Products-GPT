import OpenAI from "openai";
import { buildPostPrompt, buildCaptionPrompt } from "../utils/prompts.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePost(productType, platform = "facebook") {
  const prompt = buildPostPrompt(productType, platform);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.9,
    messages: [
      {
        role: "system",
        content: "შენ ხარ ASTROMAN-ის მთავარი მარკეტინგ დირექტორი. წერ ქართულად. გამოიყენე ემოჯი, ჰეშთეგები და გამყიდველი სტილი."
      },
      { role: "user", content: prompt }
    ]
  });
  return response.choices[0].message.content;
}

export async function generateCaption(productType) {
  const prompt = buildCaptionPrompt(productType);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.9,
    messages: [
      {
        role: "system",
        content: "შენ ხარ Instagram-ის კონტენტ სტრატეგი. წერ ქართულად. მოკლე, ემოციური, ვირუსული caption-ები."
      },
      { role: "user", content: prompt }
    ]
  });
  return response.choices[0].message.content;
}
