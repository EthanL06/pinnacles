import React, { useState } from "react";
import ButtonPopover from "./ButtonPopover";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import useTimeout from "@/hooks/use-timeout";
import { revalidateCache } from "@/actions/revalidateCache";

const RefreshButton = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { start } = useTimeout(() => setIsRefreshing(false), 1500);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await revalidateCache();
    start();
  };

  return (
    <ButtonPopover content={isRefreshing ? "Refreshed!" : "Refresh"}>
      <Button
        aria-label="Refresh"
        disabled={isRefreshing}
        className="relative disabled:opacity-100"
        onClick={handleRefresh}
        variant={isRefreshing ? "default" : "outline"}
        size="icon"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <AnimatePresence mode="wait" initial={false}>
            {isRefreshing ? (
              <motion.div
                key="refresh"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 10,
                  duration: 0.15,
                }}
              >
                <RefreshCcw className="stroke-white" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 10,
                  duration: 0.15,
                }}
                key="default-refresh"
              >
                <RefreshCcw />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Button>
    </ButtonPopover>
  );
};

export default RefreshButton;
