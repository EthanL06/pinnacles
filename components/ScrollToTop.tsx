"use client";

import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ButtonPopover from "./buttons/ButtonPopover";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          className="fixed bottom-8 right-8 z-50 sm:bottom-12 sm:right-12"
        >
          <ButtonPopover content="Scroll to Top">
            <Button
              variant={"outline"}
              size={"icon"}
              className="size-14 rounded-full shadow-xl"
              onClick={scrollToTop}
            >
              <ChevronUp className="scale-[1.5]" strokeWidth={"2"} />
            </Button>
          </ButtonPopover>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
