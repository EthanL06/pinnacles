"use client";

import ResourceItem from "@/components/ResourceItem";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useResourcesStore } from "@/stores/useResourcesStore";
import React, { useEffect, useState } from "react";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { Skeleton } from "@/components/ui/skeleton";
import ResourceBar from "./ResourceBar";
import { Resource } from "@/types";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";

interface Props {
  fetchedResources: Resource[];
}

const ResourceGrid = ({ fetchedResources }: Props) => {
  const [visibleResources, setVisibleResources] = useState(21);

  const favorites = useFavoritesStore((state) => state.favorites);
  const viewMode = usePreferencesStore((state) => state.viewMode);
  const isFetching = useResourcesStore((state) => state.isFetching);
  const setResources = useResourcesStore((state) => state.setResources);
  const resources = useResourcesStore((state) => state.resources);

  const [filter] = useQueryState("filter", {
    defaultValue: "all",
    history: "push",
  });

  const [query] = useQueryState("q", {
    history: "push",
  });
  const [selectedTag] = useQueryState("tag", {
    history: "push",
  });

  useEffect(() => {
    setResources(fetchedResources);
  }, [fetchedResources, setResources]);

  useEffect(() => {
    console.log(visibleResources);
  }, [visibleResources]);

  useEffect(() => {
    setVisibleResources(21);
  }, [filter, query, selectedTag]);

  const filterResources = () => {
    return resources.filter((resource) => {
      const matchesQuery = query
        ? resource.title.toLowerCase().includes(query.toLowerCase()) ||
          resource.description.toLowerCase().includes(query.toLowerCase()) ||
          resource.tags.some((tag) =>
            tag.text.toLowerCase().includes(query.toLowerCase()),
          )
        : true;

      const matchesTag =
        selectedTag === "All" ||
        selectedTag == null ||
        (selectedTag === "Favorites" &&
          favorites.some((favorite) => favorite.title === resource.title)) ||
        resource.tags.some((tag) => tag.text === selectedTag);

      const matchesFilter =
        filter === "all" ||
        resource.type.toLowerCase() === filter.toLowerCase();

      return matchesQuery && matchesTag && matchesFilter;
    });
  };

  const filteredResources = filterResources();
  const visibleFilteredResources = filteredResources.slice(0, visibleResources);

  const loadMoreResources = () => {
    setVisibleResources((prev) => prev + 21);
  };

  return (
    <div className="w-full bg-background">
      <div className="mx-auto w-full max-w-[1920px] grow border-b border-border bg-background px-4 pb-10 sm:px-6 md:px-12">
        <ResourceBar
          filteredResources={filteredResources}
          resources={resources}
          isFetching={isFetching}
        />

        <div
          className={cn(
            "grid w-full bg-background",
            viewMode === "grid" &&
              "grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
            viewMode === "list" && "grid-cols-1",
            (isFetching || filteredResources.length == 0) && "min-h-[75vh]",
          )}
        >
          {isFetching ? (
            Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                className={cn(
                  "size-full rounded-3xl",
                  viewMode === "grid" && "h-[22.5rem]",
                  viewMode === "list" && "mb-4 h-32",
                )}
                key={index}
              />
            ))
          ) : visibleFilteredResources.length === 0 ? (
            <div className="col-span-full mt-12 flex h-full w-full flex-col items-center gap-y-1.5">
              <span className="text-pretty font-medium">
                Oops! Looks like there’s nothing here.
              </span>
            </div>
          ) : (
            visibleFilteredResources.map((resource, index) => (
              <React.Fragment key={index}>
                <ResourceItem resource={resource} layout={viewMode} />
                {viewMode === "list" &&
                  index !== visibleFilteredResources.length - 1 && (
                    <Separator className="my-1.5" />
                  )}
              </React.Fragment>
            ))
          )}
        </div>

        {visibleResources < filteredResources.length && (
          <div className="mt-8 flex justify-center">
            <Button
              className="bg-[#3655B0] text-white"
              onClick={loadMoreResources}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceGrid;
