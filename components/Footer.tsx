"use client";

import Link from "next/link";
import Logo from "./Logo";
import Particles from "./ui/particles";
import GridPattern from "./ui/grid-pattern";
import { cn } from "@/lib/utils";
import { analytics } from "@/firebase/firebase";
import { logEvent } from "firebase/analytics";

const Footer = () => {
  return (
    <footer className="relative flex w-full flex-col justify-between gap-y-4 overflow-clip bg-gradient-to-t from-transparent from-15% to-blue-300/20 px-4 py-6 sm:h-[6rem] sm:flex-row sm:px-8">
      <div className="flex flex-col gap-y-2">
        <Link className="flex items-center gap-x-[.625rem]" href={"/"}>
          <Logo className="size-6" />

          <div className="font-serif text-2xl font-bold">pinnacles.</div>
        </Link>

        <p className="whitespace-nowrap text-xs text-muted-foreground">
          Created by{" "}
          <Link
            className="font-semibold hover:underline dark:text-white"
            target="_blank"
            href="https://ethanlanting.dev"
          >
            Ethan
          </Link>{" "}
          &copy; {new Date().getFullYear()}
        </p>
      </div>
      <div className="flex flex-wrap-reverse items-center gap-y-1 whitespace-nowrap text-sm">
        <Link
          onClick={() => {
            if (analytics) {
              logEvent(analytics, "select_content", {
                content_type: "support",
                content_id: "buymeacoffee",
              });
            }
          }}
          className="hover:underline dark:text-muted-foreground dark:hover:text-white sm:text-base"
          target="_blank"
          href="https://www.buymeacoffee.com/ethanlanting"
        >
          support me!
        </Link>

        <span className="mx-2">•</span>

        <Link
          onClick={() => {
            if (analytics) {
              logEvent(analytics, "select_content", {
                content_type: "source_code",
              });
            }
          }}
          className="hover:underline dark:text-muted-foreground dark:hover:text-white sm:text-base"
          target="_blank"
          href="https://github.com/EthanL06/pinnacles"
        >
          source code
        </Link>

        <span className="mx-2">•</span>

        <Link
          onClick={() => {
            if (analytics) {
              logEvent(analytics, "select_content", {
                content_type: "privacy_policy",
              });
            }
          }}
          className="hover:underline dark:text-muted-foreground dark:hover:text-white sm:text-base"
          href="/privacy-policy"
        >
          privacy policy
        </Link>
      </div>

      <Particles
        className="absolute inset-0 z-[-1]"
        quantity={100}
        ease={80}
        refresh
      />

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn("-z-10 opacity-70")}
      />
    </footer>
  );
};

export default Footer;
