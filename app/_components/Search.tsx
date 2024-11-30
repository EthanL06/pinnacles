"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useQueryState } from "nuqs";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/firebase/firebase";

const Search = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setQuery] = useQueryState("q", {
    history: "push",
  });
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleQueryChange = useDebounce((query: string) => {
    setQuery(query);

    if (analytics && query) {
      logEvent(analytics, "search", {
        search_term: query,
      });
    }
  }, 700);

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
