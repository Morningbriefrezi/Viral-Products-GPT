import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateImage(topic) {
  const prompt = `Ultra realistic product photo of ${topic}. Cosmic luxury interior, deep space background with nebula colors, professional studio lighting, cinematic composition, 4K detail, no text, no watermark.`;

  const result = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    size: "1024x1024",
    quality: "standard",
    n: 1
  });

  return result.data[0].url;
}
