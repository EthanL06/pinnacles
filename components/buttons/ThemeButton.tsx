"use client";

import React from "react";
import ButtonPopover from "./ButtonPopover";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { analytics } from "@/firebase/firebase";
import { logEvent } from "firebase/analytics";

const ThemeButton = () => {
  const { setTheme, resolvedTheme: theme } = useTheme();

  const isDarkMode = theme === "dark";
  const popoverContent = isDarkMode ? "Light Mode" : "Dark Mode";

  const handleClick = () => {
    setTheme(isDarkMode ? "light" : "dark");
    if (analytics) {
      logEvent(analytics, "theme", {
        theme: isDarkMode ? "light" : "dark",
      });
    }
  };

  const transition = {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 15 },
  };

  return (
    <ButtonPopover content={popoverContent}>
      <Button
        aria-label={popoverContent}
        className="relative overflow-hidden"
        onClick={handleClick}
        size={"icon"}
        variant={"outline"}
      >
        <AnimatePresence initial={false}>
          {isDarkMode ? (
            <motion.div
              key="sun"
              {...transition}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              {...transition}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </ButtonPopover>
  );
};

export default ThemeButton;
