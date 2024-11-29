import Tag from "@/components/Tag";
import { Skeleton } from "@/components/ui/skeleton";
import { useResourcesStore } from "@/stores/useResourcesStore";
import { useSearchStore } from "@/stores/useSearchStore";
import type { Tag as TagType } from "emblor";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TagScroller() {
  const resources = useResourcesStore((state) => state.resources);
  const isFetching = useResourcesStore((state) => state.isFetching);
  const selectedTag = useSearchStore((state) => state.selectedTag);
  const onSelectedTagChange = useSearchStore(
    (state) => state.onSelectedTagChange,
  );

  const searchParams = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    onSelectedTagChange(searchParams.get("tag") || "All");
  }, [searchParams, onSelectedTagChange]);

  useEffect(() => {
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "tag") {
        params.append(key, value);
      }
    });

    if (selectedTag !== "All") {
      params.set("tag", selectedTag);
    }

    window.history.pushState(null, "", `${pathName}?${params.toString()}`);
  }, [selectedTag, pathName]);

  const tags = resources
    .reduce((acc: TagType[], resource) => {
      if (resource.tags) {
        resource.tags.forEach((tag) => {
          if (!acc.find((t) => t.text === tag.text)) {
            acc.push({
              id: tag.id,
              text: tag.text,
            });
          }
        });
      }
      return acc;
    }, [])
    .sort((a, b) => a.text.localeCompare(b.text));

  // Always have "All" and "Favorites" as the first ones
  const fixedTags = [
    { id: "All", text: "All" },
    { id: "Favorites", text: "Favorites" },
  ];

  const allTags = [...fixedTags, ...tags];

  return (
    <div className="relative">
      <div className="relative my-4 flex h-full max-w-[100vw] snap-x snap-mandatory gap-x-2 overflow-x-auto whitespace-nowrap py-2 scrollbar-none">
        {isFetching ? (
          <>
            <Skeleton className="h-6 w-[2.3125rem] flex-shrink-0 rounded-full" />
            <Skeleton className="h-6 w-[4.875rem] flex-shrink-0 rounded-full" />
            {Array.from({ length: 20 }).map((_, index) => {
              const randomWidth =
                Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random width between 50px and 100px
              return (
                <Skeleton
                  className="h-6 flex-shrink-0 rounded-full"
                  style={{ width: `${randomWidth}px` }}
                  key={index}
                />
              );
            })}
          </>
        ) : (
          allTags.map((tag) => (
            <Tag
              className="cursor-pointer"
              variant={selectedTag === tag.text ? "default" : "outline"}
              onClick={() => {
                onSelectedTagChange(tag.text);
              }}
              key={tag.id}
            >
              {tag.text}
            </Tag>
          ))
        )}
      </div>
    </div>
  );
}
