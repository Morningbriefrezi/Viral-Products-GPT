import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchTikTokTrends() {
  try {
    const { data } = await axios.get(
      "https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/en",
      { timeout: 8000 }
    );

    const $ = cheerio.load(data);
    const trends = [];

    $("div").each((i, el) => {
      const text = $(el).text();
      if (text.startsWith("#")) trends.push(text.toLowerCase());
    });

    return trends;
  } catch {
    return [];
  }
}
