"use client";

import Link from "next/link";
import React from "react";
import SubmitResource from "./SubmitResource";
import { FilePlus, InfoIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import ButtonPopover from "./buttons/ButtonPopover";
import Search from "@/app/_components/Search";
import ThemeButton from "./buttons/ThemeButton";
import Logo from "./Logo";
import CoffeeButton from "./buttons/CoffeeButton";

const Navbar = () => {
  return (
    <nav className="absolute left-1/2 top-0 z-50 flex w-full -translate-x-1/2 items-center justify-center px-6">
      <div className="mt-4 flex w-full max-w-[54rem] items-center justify-between gap-x-4 rounded-3xl border bg-background px-7 py-5">
        <div className="flex grow basis-0 items-center">
          <Link
            className="inline-block transition-transform duration-300 ease-in-out hover:-translate-y-0.5"
            href={"/"}
          >
            <Logo className="size-8" />
          </Link>
        </div>

        <Search />

        <div className="flex grow basis-0 justify-end gap-2">
          <ButtonPopover content={"About"}>
            <Link
              className={buttonVariants({
                variant: "outline",
                size: "icon",
              })}
              href={"/about"}
            >
              <InfoIcon />
            </Link>
          </ButtonPopover>
          <SubmitResource>
            <Button size={"icon"} variant={"outline"}>
              <FilePlus />
            </Button>
          </SubmitResource>

          <ThemeButton />

          <CoffeeButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
