import axios from "axios";
import cheerio from "cheerio";

export async function fetchAliExpressProducts(keyword) {
  const url = `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(keyword)}`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  const $ = cheerio.load(data);

  const products = [];

  $(".manhattan--container--1lP57Ag").each((i, el) => {
    const name = $(el).find("h1,h2,h3").first().text().trim();
    const price = $(el).find(".manhattan--price-sale--1CCSZfK").text().trim();
    const link = "https:" + $(el).find("a").attr("href");

    if (name && price && link) {
      products.push({
        name,
        price,
        link,
      });
    }
  });

  return products;
}
