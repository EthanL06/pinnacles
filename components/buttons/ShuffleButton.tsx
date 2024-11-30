import useTimeout from "@/hooks/use-timeout";
import { useResourcesStore } from "@/stores/useResourcesStore";
import { Shuffle } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import ButtonPopover from "./ButtonPopover";
import { AnimatePresence, motion } from "framer-motion";
import { analytics } from "@/firebase/firebase";
import { logEvent } from "firebase/analytics";

const ShuffleButton = () => {
  const shuffleResources = useResourcesStore((state) => state.shuffleResources);
  const [isShuffled, setIsShuffled] = useState(false);
  const { start } = useTimeout(() => setIsShuffled(false), 1500);

  const onShuffle = () => {
    setIsShuffled(true);
    shuffleResources();
    start();

    if (analytics) {
      logEvent(analytics, "shuffle", {
        shuffle: true,
      });
    }
  };

  return (
    <ButtonPopover content={isShuffled ? "Shuffled!" : "Shuffle"}>
      <Button
        aria-label="Shuffle"
        className="relative"
        onClick={onShuffle}
        variant={isShuffled ? "default" : "outline"}
        size={"icon"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isShuffled ? (
            <motion.div
              key="shuffled"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 10,
                duration: 0.15,
              }}
            >
              <Shuffle className="stroke-white" />
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
              key="default-shuffle"
            >
              <Shuffle />
            </motion.div>
          )}
        </AnimatePresence>

        {/* {pulseCircles.map((key) => (
          <div
            key={key}
            className="pulse-circle absolute h-full w-full transform rounded-3xl bg-primary/25 dark:bg-foreground/25"
            onAnimationEnd={() => {
              // Remove the pulse circle after the animation completes
              setPulseCircles((prev) => prev.filter((k) => k !== key));
            }}
          ></div>
        ))} */}
      </Button>
    </ButtonPopover>
  );
};

export default ShuffleButton;
