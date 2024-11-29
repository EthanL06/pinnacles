"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/stores/useSearchStore";
import { SearchIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Search = () => {
  const setQuery = useSearchStore((state) => state.setQuery);
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams, setQuery]);

  const handleQueryChange = useDebounce((query: string) => {
    setQuery(query);

    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "q") {
        params.append(key, value);
      }
    });

    if (query.trim() !== "") {
      params.set("q", query);
    }

    window.history.pushState(null, "", `${pathName}?${params.toString()}`);
  }, 300);

  if (pathName !== "/" && pathName !== "/admin") {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full transform items-center justify-center rounded-3xl shadow-none transition-all duration-500 hover:shadow-lg",
      )}
    >
      <Input
        defaultValue={searchParams.get("q") || ""}
        startIcon={SearchIcon}
        placeholder="Search for 'Inspiration' or 'Fonts'"
        className="w-full rounded-3xl bg-background px-10 py-6"
        onChange={(e) => handleQueryChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
