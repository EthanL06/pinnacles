import { Resource } from "@/types";

const BASE_URL = "/api/fetch-og";

/**
 *  Fetches Open Graph tags from a given URL
 * @param url - The URL to fetch Open Graph tags from
 * @returns The Open Graph tags from the given URL
 * @throws If the request fails or the response is not OK
 */
export async function fetchOgTags(url: string) {
  // If url doesn't start with http or https, append https to it
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  try {
    new URL(url);
  } catch {
    throw new Error("Invalid URL");
  }

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Unknown error");
  }

  const { ogTags, tags } = await response.json();

  return {
    title: ogTags.title,
    description: ogTags.description,
    url: ogTags.url,
    image: ogTags.image,
    type: ogTags.type,
    tags: tags,
  } as Resource;
}
