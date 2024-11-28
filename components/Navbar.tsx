"use client";

import Link from "next/link";
import React, { useState } from "react";
import SubmitResource from "./SubmitResource";
import { FilePlus, InfoIcon, MenuIcon, XIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import ButtonPopover from "./buttons/ButtonPopover";
import Search from "@/app/_components/Search";
import ThemeButton from "./buttons/ThemeButton";
import Logo from "./Logo";
import CoffeeButton from "./buttons/CoffeeButton";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="absolute left-1/2 top-0 z-50 flex w-full -translate-x-1/2 items-center justify-center px-3 sm:px-6">
      <div className="mt-4 flex min-h-[5.75rem] w-full max-w-[54rem] items-center justify-between gap-x-4 rounded-3xl border bg-background px-7 py-5 shadow-lg shadow-primary/5">
        <div className="flex basis-0 items-center sm:grow">
          <Link
            className="inline-block transition-transform duration-300 ease-in-out hover:-translate-y-0.5"
            href={"/"}
          >
            <Logo className="size-8" />
          </Link>
        </div>

        <div className="hidden w-full max-w-[24rem] sm:inline-flex">
          <Search />
        </div>

        <div className="hidden grow basis-0 justify-end gap-2 sm:flex">
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

        <AnimatePresence mode="wait">
          {showMobileMenu ? (
            <motion.div
              key="mobile-menu"
              transition={{ duration: 0.1 }}
              className="flex grow items-center justify-end gap-1 sm:hidden"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    staggerChildren: 0.04,
                  },
                },
                exit: { opacity: 0, x: 20 },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={variants}>
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
              </motion.div>
              <motion.div className="xs:block hidden" variants={variants}>
                <SubmitResource>
                  <Button size={"icon"} variant={"outline"}>
                    <FilePlus />
                  </Button>
                </SubmitResource>
              </motion.div>
              <motion.div className="size-10" variants={variants}>
                <ThemeButton />
              </motion.div>
              <motion.div variants={variants}>
                <CoffeeButton />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="search"
              transition={{
                duration: 0.3,
                ease: "backInOut",
              }}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 20 },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-[24rem] sm:hidden"
            >
              <Search />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          size={"icon"}
          variant={"outline"}
          className="flex-shrink-0 sm:hidden"
        >
          {!showMobileMenu ? <MenuIcon /> : <XIcon />}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
