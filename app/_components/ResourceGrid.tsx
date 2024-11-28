"use client";

import ShuffleButton from "@/components/buttons/ShuffleButton";
import ResourceItem from "@/components/ResourceItem";
import SubmitResource from "@/components/SubmitResource";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useResourcesStore } from "@/stores/useResourcesStore";
import { useSearchStore } from "@/stores/useSearchStore";
import React, { useEffect } from "react";
import TagScroller from "./TagScroller";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import ViewMode from "@/components/dropdowns/ViewMode";
import Filter from "@/components/dropdowns/Filter";
import LoadingSpinner from "@/components/ui/loading-spinner";
import RefreshButton from "@/components/buttons/RefreshButton";
import { Skeleton } from "@/components/ui/skeleton";

const ResourceGrid = () => {
  const viewMode = usePreferencesStore((state) => state.viewMode);
  const resources = useResourcesStore((state) => state.resources);
  const fetchResources = useResourcesStore((state) => state.fetchResources);
  const isFetching = useResourcesStore((state) => state.isFetching);
  const query = useSearchStore((state) => state.query);
  const selectedTag = useSearchStore((state) => state.selectedTag);
  const favorites = useFavoritesStore((state) => state.favorites);
  const filter = usePreferencesStore((state) => state.filter);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

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

  return (
    <div className="w-full bg-background">
      <div className="mx-auto w-full max-w-[1920px] grow border-b border-border bg-background px-4 pb-10 sm:px-6 md:px-12">
        <TagScroller />
        <div className="mb-4 flex flex-wrap justify-between gap-x-3 gap-y-1.5">
          <div className="flex items-center gap-3">
            <ViewMode />
            <Filter />
            <ShuffleButton />
            <RefreshButton />
          </div>

          <div className="flex w-full grow items-center justify-between text-sm sm:w-fit sm:text-base">
            {isFetching ? (
              <div className="text-center">
                <LoadingSpinner className="stroke-primary" />
              </div>
            ) : filteredResources.length < resources.length ? (
              <p>
                Showing{" "}
                <span className="font-semibold">
                  {filteredResources.length}
                </span>{" "}
                of {resources.length} resources...
              </p>
            ) : (
              <p>
                Showing{" "}
                <span className="font-semibold">
                  {filteredResources.length}
                </span>{" "}
                resources...
              </p>
            )}

            <SubmitResource hasPopover={false}>
              <Button
                className="px-0 text-xs text-inherit underline sm:text-sm"
                variant={"link"}
              >
                Suggest a resource?
              </Button>
            </SubmitResource>
          </div>
        </div>
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
          ) : filteredResources.length === 0 ? (
            <div className="col-span-full mt-12 flex h-full w-full flex-col items-center gap-y-1.5">
              <span className="text-pretty font-medium">
                Oops! Looks like there’s nothing here.
              </span>
            </div>
          ) : (
            filteredResources.map((resource, index) => (
              <React.Fragment key={index}>
                <ResourceItem resource={resource} layout={viewMode} />
                {viewMode === "list" &&
                  index !== filteredResources.length - 1 && (
                    <Separator className="my-1.5" />
                  )}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceGrid;
