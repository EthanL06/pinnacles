import { generateTags } from "@/actions/generateTags";
import * as cheerio from "cheerio";
import { v4 as uuidv4 } from "uuid";

type OGTags = { [key: string]: string };

const desiredOgTags = [
  "og:title",
  "og:url",
  "og:image",
  "og:type",
  "og:description",
];

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { url }: { url: string } = await req.json();

    // Fetch the HTML content of the provided URL using fetch
    const response = await fetch(url);
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch the page" }),
        { status: 500 },
      );
    }

    const html = await response.text();

    // Load the HTML content into cheerio
    const $ = cheerio.load(html);

    // Extract OG tags
    const ogTags: Partial<OGTags> = {};
    $('meta[property^="og:"]').each((_, element) => {
      const property = $(element).attr("property");
      const content = $(element).attr("content");
      if (property && content && desiredOgTags.includes(property)) {
        ogTags[property.replace("og:", "")] = content;
      }
    });

    if (!ogTags.title) {
      // If og:title is not present, set it to the title tag of the page
      ogTags.title = $("title").text();
    }

    if (!ogTags.description) {
      // If og:description is not present, set it to the description tag of the page
      ogTags.description = $('meta[name="description"]').attr("content") || "";
    }

    // If og:url is not present, set it to the original URL
    if (!ogTags.url) {
      ogTags.url = url;
    }

    if (ogTags.type === "profile") {
      ogTags.type = "channel";
    } else if (
      !ogTags.type ||
      (ogTags.type !== "website" &&
        ogTags.type !== "article" &&
        ogTags.type !== "video")
    ) {
      ogTags.type = "website";
    }

    if (ogTags.image?.startsWith("/") || ogTags.image?.startsWith("./")) {
      // If the image is a relative path, convert it to an absolute URL
      ogTags.image = new URL(ogTags.image, url).toString();
    }

    const data = await generateTags({
      title: ogTags.title,
      description: ogTags.description,
      type: ogTags.type,
      url: ogTags.url,
    });

    const tags = data.tags.map((tag) => ({
      text: tag,
      id: uuidv4(),
    }));

    return new Response(JSON.stringify({ ogTags, tags }), { status: 200 });
  } catch (error) {
    console.error("Error fetching meta tags:", error.message);
    return new Response(JSON.stringify({ error: "Failed to fetch metadata" }), {
      status: 500,
    });
  }
}
