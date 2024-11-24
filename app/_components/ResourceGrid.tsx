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

const ResourceGrid = () => {
  const viewMode = usePreferencesStore((state) => state.viewMode);
  const resources = useResourcesStore((state) => state.resources);
  const fetchResources = useResourcesStore((state) => state.fetchResources);
  const query = useSearchStore((state) => state.query);
  const selectedTag = useSearchStore((state) => state.selectedTag);
  const favorites = useFavoritesStore((state) => state.favorites);
  const filter = usePreferencesStore((state) => state.filter);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const filterResources = () => {
    if (selectedTag === "Favorites") {
      return favorites;
    }

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
      <div className="mx-auto min-h-screen w-full max-w-[1920px] grow border-b border-border bg-background px-3 pb-10 sm:px-6 md:px-12">
        <TagScroller />
        <div className="mb-4 flex flex-wrap justify-between gap-x-3 gap-y-1.5">
          <div className="flex items-center gap-3">
            <ViewMode />
            <Filter />
            <ShuffleButton />
          </div>

          <div className="flex grow items-center justify-between">
            <p>
              {filteredResources.length < resources.length ? (
                <>
                  Showing{" "}
                  <span className="font-semibold">
                    {filteredResources.length}
                  </span>{" "}
                  of {resources.length} resources...
                </>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold">
                    {filteredResources.length}
                  </span>{" "}
                  resources...
                </>
              )}
            </p>
            <SubmitResource hasPopover={false}>
              <Button className="text-inherit underline" variant={"link"}>
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
          )}
        >
          {filteredResources.map((resource, index) => (
            <React.Fragment key={index}>
              <ResourceItem resource={resource} layout={viewMode} />
              {viewMode === "list" && index !== resources.length - 1 && (
                <Separator className="my-1.5" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceGrid;
