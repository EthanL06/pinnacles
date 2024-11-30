import ResourceItem from "@/components/ResourceItem";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useReviewingResourcesStore } from "@/stores/useReviewingResourcesStore";
import { ReviewingResource } from "@/types/Resource";
import { Check, ExternalLink, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  resource: ReviewingResource;
  layout?: "grid" | "list";
  isReviewMode: boolean;
};

const ReviewResouceItem = ({
  resource,
  layout = "grid",
  isReviewMode,
}: Props) => {
  const { toast } = useToast();
  const removeReviewingResource = useReviewingResourcesStore(
    (state) => state.removeReviewingResource,
  );
  return (
    <div className="group relative">
      <div
        className={cn(
          "absolute left-1/2 top-1/2 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-x-2 opacity-0 transition-opacity ease-in-out",
          isReviewMode && "group-hover:opacity-100",
        )}
      >
        <Button
          onClick={async () => {
            await removeReviewingResource(resource.id, true);
            toast({
              title: "Resource accepted!",
              description: "Resource has been added to the resources list.",
              duration: 3000,
            });
          }}
          className="border-none hover:bg-green-600"
          variant={"outline"}
          size="icon"
        >
          <Check />
        </Button>
        <Button
          onClick={async () => {
            await removeReviewingResource(resource.id, false);

            toast({
              title: "Resource rejected!",
              description: "Resource has been removed from the review list.",
              duration: 3000,
              variant: "destructive",
            });
          }}
          className="border-none hover:bg-destructive"
          variant={"outline"}
          size="icon"
        >
          <XIcon />
        </Button>
        <Link
          href={resource.url}
          target="_blank"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ExternalLink />
        </Link>
      </div>
      <div
        className={cn(
          "absolute z-[99] h-full w-full rounded-3xl bg-transparent backdrop-blur-none transition-all ease-in-out",
          isReviewMode &&
            "group-hover:bg-black-25 group-hover:backdrop-blur-sm",
          !isReviewMode && "pointer-events-none",
        )}
      ></div>
      <ResourceItem resource={resource} layout={layout} />
    </div>
  );
};

export default ReviewResouceItem;
