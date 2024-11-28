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
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { ResourceType, ResourceTypes } from "@/types/Resource";

export const iconMapping = {
  all: <></>,
  website: <Globe size={16} />,
  article: <Newspaper size={16} />,
  channel: <Youtube size={16} />,
  video: <Video size={16} />,
  other: <CircleEllipsis size={16} />,
} as Record<ResourceType | "all", JSX.Element>;

const Filter = () => {
  const filter = usePreferencesStore((state) => state.filter);
  const setFilter = usePreferencesStore((state) => state.setFilter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="pl-3 pr-2" variant="outline">
          {filter === "all" ? <FilterIcon size={16} /> : iconMapping[filter]}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-36" align="start">
        <DropdownMenuLabel className="font-medium">
          Filter by Type
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={(value) => {
            setFilter(value as ResourceType | "all");
          }}
        >
          {["all", ...ResourceTypes].map((type) => (
            <DropdownMenuRadioItem
              key={type}
              className="flex justify-between capitalize"
              value={type as ResourceType | "none"}
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
