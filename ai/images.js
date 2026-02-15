import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateImage(topic) {
  const prompt = `
Ultra realistic product image of ${topic},
cosmic interior, luxury lighting, professional product photography,
cinematic, high detail
`;

  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024"
  });

  return result.data[0].url;
}
