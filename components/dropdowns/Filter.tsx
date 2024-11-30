import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ChevronDown,
  Globe,
  Video,
  Filter as FilterIcon,
  Newspaper,
  Youtube,
  CircleEllipsis,
} from "lucide-react";
import { ResourceType, ResourceTypes } from "@/types/Resource";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import { analytics } from "@/firebase/firebase";
import { logEvent } from "firebase/analytics";

export const iconMapping = {
  all: <></>,
  website: <Globe size={16} />,
  article: <Newspaper size={16} />,
  channel: <Youtube size={16} />,
  video: <Video size={16} />,
  other: <CircleEllipsis size={16} />,
} as Record<ResourceType | "all", JSX.Element>;

type FilterTypes = (typeof ResourceTypes)[number] | "all";
const filterTypes = ["all", ...ResourceTypes] as FilterTypes[];

const Filter = () => {
  const [filterParam, setFilterParam] = useQueryState(
    "filter",
    parseAsStringLiteral(filterTypes).withDefault("all").withOptions({
      history: "push",
    }),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Filter" className="pl-3 pr-2" variant="outline">
          {filterParam === "all" ? (
            <FilterIcon size={16} />
          ) : (
            iconMapping[filterParam]
          )}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-36" align="start">
        <DropdownMenuLabel className="font-medium">
          Filter by Type
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterParam}
          onValueChange={(value) => {
            setFilterParam(value as ResourceType | "all");

            if (analytics) {
              logEvent(analytics, "filter", {
                filter: value,
              });
            }
          }}
        >
          {["all", ...ResourceTypes].map((type) => (
            <DropdownMenuRadioItem
              key={type}
              className="flex justify-between capitalize"
              value={type as ResourceType | "all"}
            >
              {type}
              {iconMapping[type as ResourceType | "all"]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
