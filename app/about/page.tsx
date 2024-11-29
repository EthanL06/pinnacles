import SubmitResource from "@/components/SubmitResource";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, Globe, Mail } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "About — pinnacles.",
  description: "Learn more about pinnacles.",
  openGraph: {
    type: "website",
    description: "Learn more about pinnacles.",
    url: "https://pinnacles.app/about",
    siteName: "pinnacles.",
    title: "About — pinnacles.",
    locale: "en_US",
    images: [
      {
        url: "https://pinnacles.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "pinnacles.",
      },
    ],
  },
};

const Page = () => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col gap-8 gap-y-8 overflow-clip px-6 pb-16 pt-40 md:px-24 lg:px-48">
      <h1 className="font-serif text-6xl font-bold">
        About <span className="italic text-primary">pinnacles.</span>
      </h1>
      <div className="flex flex-col gap-y-8 text-2xl font-medium tracking-tight sm:text-3xl">
        <p>
          <span className="font-serif font-semibold text-primary">
            pinnacles
          </span>{" "}
          is a collection of <span className="font-serif italic">peak</span>{" "}
          resources for web developers and designers. We aim to provide a
          curated list of resources that are useful, high-quality, and
          up-to-date.
        </p>

        <p>
          I created this site to solve the frustration of finding great
          resources but struggling to keep track of them. Over the years, I’ve
          collected hundreds and wanted a simple way to organize and share them.
        </p>

        <p>
          Feel free to{" "}
          <SubmitResource hasPopover={false}>
            <span className="text-primary underline hover:cursor-pointer">
              suggest a resource
            </span>
          </SubmitResource>{" "}
          or share any feedback you have—I’d love to hear from you! If you’ve
          found this site helpful, consider{" "}
          <Link
            target="_blank"
            className="text-primary underline"
            href="https://www.buymeacoffee.com/ethanlanting"
          >
            supporting me
          </Link>{" "}
          or spreading the word. Thanks for stopping by!
        </p>

        <div className="flex flex-col gap-y-2 pt-10">
          <p className="text-right font-serif">- Ethan L.</p>

          <div className="flex justify-end gap-x-2">
            <Link
              target="_blank"
              href="https://github.com/EthanL06"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "size-10 rounded-full p-0 md:size-12",
                }),
              )}
            >
              <Github className="size-4 md:!size-5" />
            </Link>

            <Link
              target="_blank"
              href="https://ethanlanting.dev"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "size-10 rounded-full p-0 md:size-12",
                }),
              )}
            >
              <Globe className="size-4 md:!size-5" />
            </Link>

            <Link
              target="_blank"
              href="mailto:ethanclanting@gmail.com"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "size-10 rounded-full p-0 md:size-12",
                }),
              )}
            >
              <Mail className="size-4 md:!size-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute -left-[22rem] -top-[8rem] -z-10 size-[500px] rounded-full blur-[100px] light:bg-purple-100 dark:bg-purple-950 sm:-left-[22rem] sm:-top-[12rem] sm:size-[600px]"></div>

      <div className="absolute -bottom-[8rem] -right-[22rem] -z-10 size-[400px] rounded-full blur-[100px] light:bg-purple-100 dark:bg-purple-950/50 sm:-bottom-[8rem] sm:right-0"></div>
    </div>
  );
};

export default Page;
