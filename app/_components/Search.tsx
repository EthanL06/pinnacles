"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/stores/useSearchStore";
import { SearchIcon } from "lucide-react";
import React from "react";

const Search = () => {
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <div
      className={cn(
        "w-full max-w-xs transform items-center justify-center rounded-3xl shadow-none transition-all duration-500 hover:shadow-lg",
      )}
    >
      <Input
        startIcon={SearchIcon}
        placeholder="Search for 'SVG Icons' or 'React'"
        className="w-full rounded-3xl bg-background px-10 py-6"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
