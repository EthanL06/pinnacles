import React, { useState } from "react";
import { Button } from "../ui/button";
import { Clipboard, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useTimeout from "@/hooks/use-timeout";
import ButtonPopover from "./ButtonPopover";

const CopyButton = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);
  const { start } = useTimeout(() => setCopied(false), 1500);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(link);
    setCopied(true);
    start();
  };

  return (
    <Popover open={copied}>
      <PopoverTrigger asChild>
        <ButtonPopover content={copied ? "Copied!" : "Copy"}>
          <Button
            aria-label="Copy link"
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className={cn(
              "relative transition-colors",
              copied && "bg-primary hover:bg-primary/90",
            )}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 10,
                      duration: 0.15,
                    }}
                  >
                    <Check className="stroke-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="clipboard"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 20,
                      duration: 0.15,
                    }}
                  >
                    <Clipboard />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Button>
        </ButtonPopover>
      </PopoverTrigger>

      <PopoverContent className="w-fit p-2 text-xs">Copied!</PopoverContent>
    </Popover>
  );
};

export default CopyButton;
