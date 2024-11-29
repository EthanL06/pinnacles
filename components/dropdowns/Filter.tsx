import React, { useEffect } from "react";
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
import { usePathname, useSearchParams } from "next/navigation";

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

  const searchParams = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    setFilter((searchParams.get("filter") as ResourceType | "all") || "all");
  }, [searchParams, setFilter]);

  useEffect(() => {
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "filter") {
        params.append(key, value);
      }
    });

    if (filter !== "all") {
      params.set("filter", filter);
    }

    window.history.pushState(null, "", `${pathName}?${params.toString()}`);
  }, [filter, pathName]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Filter" className="pl-3 pr-2" variant="outline">
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
