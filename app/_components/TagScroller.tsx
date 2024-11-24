import Tag from "@/components/Tag";
import { useResourcesStore } from "@/stores/useResourcesStore";
import { useSearchStore } from "@/stores/useSearchStore";
import type { Tag as TagType } from "emblor";

export default function TagScroller() {
  const resources = useResourcesStore((state) => state.resources);
  const selectedTag = useSearchStore((state) => state.selectedTag);
  const onSelectedTagChange = useSearchStore(
    (state) => state.onSelectedTagChange,
  );

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
        {allTags.map((tag) => (
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
        ))}
      </div>
    </div>
  );
}
