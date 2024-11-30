import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import ButtonPopover from "./ButtonPopover";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { Resource } from "@/types";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { analytics } from "@/firebase/firebase";
import { logEvent } from "firebase/analytics";

const FavoriteButton = ({
  resource,
  callback,
}: {
  resource: Resource;
  callback?: () => void;
}) => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const isFavorite = favorites.some(
    (favorite) => favorite.title === resource.title,
  );

  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite(resource);
      if (callback) {
        callback();
      }
    } else {
      addFavorite(resource);
    }

    if (analytics) {
      logEvent(analytics, "resource_favorite", {
        title: resource.title,
        url: resource.url,
        favorite: !isFavorite,
      });
    }
  };

  return (
    <ButtonPopover content={isFavorite ? "Favorited!" : "Favorite"}>
      <Button
        aria-label={isFavorite ? "Unfavorite" : "Favorite"}
        className="relative"
        onClick={handleFavorite}
        variant={isFavorite ? "default" : "outline"}
        size="icon"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <AnimatePresence mode="wait" initial={false}>
            {isFavorite ? (
              <motion.div
                key="favorite-heart"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 10,
                  duration: 0.15,
                }}
              >
                <Heart className="stroke-white" />
              </motion.div>
            ) : (
              <motion.div key="default-heart">
                <Heart />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Button>
    </ButtonPopover>
  );
};

export default FavoriteButton;
