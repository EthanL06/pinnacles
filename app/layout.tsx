import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Fraunces, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pinnacles.app"),
  title: "pinnacles. | Peak Resources for Web Developers and Designers",
  description:
    "A curated list of useful, high-quality, and up-to-date resources for web developers, UI/UX designers, and creative professionals.",
  keywords: [
    "web dev",
    "web development",
    "web development resources",
    "web design tools",
    "UI/UX design resources",
    "frontend development",
    "backend development",
    "design inspiration",
    "developer tools",
    "coding resources",
    "free web development tools",
    "modern design libraries",
    "high-quality developer tools",
    "best web development resources",
    "best web design resources",
    "resource curation for developers",
    "JavaScript frameworks",
    "responsive web design",
    "CSS libraries",
    "graphic design resources",
    "programming tutorials",
    "free coding tools",
    "full-stack development",
    "open-source tools for developers",
    "developer productivity",
    "web design best practices",
    "API integration tools",
    "wireframing tools",
    "prototyping tools",
    "design systems",
    "accessibility tools for developers",
    "code editors and IDEs",
    "website performance optimization",
    "frontend frameworks",
    "collaboration tools for developers",
    "design workflow solutions",
    "content management systems",
    "freelance web design resources",
    "SEO optimization tools",
    "creative resources for designers",
    "vector graphics tools",
    "minimalist design libraries",
    "developer career growth resources",
  ],
  openGraph: {
    type: "website",
    description:
      "A curated list of useful, high-quality, and up-to-date resources for web developers, UI/UX designers, and creative professionals.",
    url: "https://pinnacles.app",
    siteName: "pinnacles.",
    title: "pinnacles. | Peak Resources for Web Developers and Designers",
    locale: "en_US",
    images: [
      {
        url: "https://pinnacles.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "pinnacles. | Peak Resources for Web Developers and Designers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pinnacles_app",
    creator: "@pinnacles_app",
    title: "pinnacles. | Peak Resources for Web Developers and Designers",
    description:
      "A curated list of useful, high-quality, and up-to-date resources for web developers, UI/UX designers, and creative professionals.",
    images: [
      {
        url: "https://pinnacles.app/opengraph-image.png",
        alt: "pinnacles. | Peak Resources for Web Developers and Designers",
      },
    ],
  },
  alternates: {
    canonical: "https://pinnacles.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://pinnacles.app",
  name: "pinnacles",
  description:
    "A curated list of resources that are useful, high-quality, and up-to-date for web developers, UI/UX designers, and creative professionals.",
  image: "https://pinnacles.app/opengraph-image.png",
  potentialAction: [
    {
      "@type": "SearchAction",
      target: "https://pinnacles.app/?q={search_term_string}/",
      "query-input": "required name=search_term_string",
    },
    {
      "@type": "SearchAction",
      target: "https://pinnacles.app/?tag={tag_string}",
      "query-input": "required name=tag_string",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <html lang="en">
        <body
          className={`${poppins.className} ${fraunces.variable} relative min-h-screen antialiased`}
        >
          <NuqsAdapter>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </ThemeProvider>
          </NuqsAdapter>
        </body>
      </html>
    </>
  );
}
