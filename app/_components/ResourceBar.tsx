import React from "react";
import TagScroller from "./TagScroller";
import ViewMode from "@/components/dropdowns/ViewMode";
import Filter from "@/components/dropdowns/Filter";
import RefreshButton from "@/components/buttons/RefreshButton";
import ShuffleButton from "@/components/buttons/ShuffleButton";
import SubmitResource from "@/components/SubmitResource";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Resource } from "@/types";

type Props = {
  filteredResources: Resource[];
  resources: Resource[];
  isFetching: boolean;
};

const ResourceBar = ({ filteredResources, resources, isFetching }: Props) => {
  return (
    <>
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
              <span className="font-semibold">{filteredResources.length}</span>{" "}
              of {resources.length} resources...
            </p>
          ) : (
            <p>
              Showing{" "}
              <span className="font-semibold">{filteredResources.length}</span>{" "}
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
    </>
  );
};

export default ResourceBar;
