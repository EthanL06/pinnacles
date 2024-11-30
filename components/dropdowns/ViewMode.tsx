import { usePreferencesStore } from "@/stores/usePreferencesStore";
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
import { ChevronDown, LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "../ui/button";

const ViewMode = () => {
  const setViewMode = usePreferencesStore((state) => state.setViewMode);
  const viewMode = usePreferencesStore((state) => state.viewMode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="View Mode" className="pl-3 pr-2" variant="outline">
          {
            {
              grid: <LayoutGrid size={16} />,
              list: <LayoutList size={16} />,
            }[viewMode]
          }

          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="font-medium">View Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={viewMode}
          onValueChange={(value) => {
            setViewMode(value as "grid" | "list");
          }}
        >
          <DropdownMenuRadioItem className="flex justify-between" value="grid">
            Grid
            <LayoutGrid size={16} />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex justify-between" value="list">
            List
            <LayoutList size={16} />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ViewMode;
