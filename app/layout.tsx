import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Fraunces, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "pinnacles — peak resources for web developers and designers.",
  description: "peak resources for web developers and designers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      <html lang="en">
        <body
          className={`${poppins.className} ${fraunces.variable} min-h-screen antialiased`}
        >
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
