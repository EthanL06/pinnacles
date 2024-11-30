import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/privacy-policy"],
        disallow: ["/admin/"],
      },
    ],
    sitemap: "https://pinnacles.app/sitemap.xml",
  };
}
