"use client";

import Link from "next/link";
import Logo from "./Logo";
import Particles from "./ui/particles";
import GridPattern from "./ui/grid-pattern";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="relative flex h-[6rem] w-full justify-between overflow-clip bg-gradient-to-t from-transparent from-15% to-blue-300/10 p-8 pt-6">
      <Link className="flex items-center gap-x-[.625rem]" href={"/"}>
        <Logo className="size-6" />

        <div className="font-serif text-2xl font-bold">pinnacles.</div>
      </Link>

      <div className="flex items-center dark:text-gray-300">
        <Link
          className="hover:underline"
          target="_blank"
          href="https://www.buymeacoffee.com/ethanlanting"
        >
          buy me a coffee! ☕️
        </Link>

        <span className="mx-2">•</span>

        <p>
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
