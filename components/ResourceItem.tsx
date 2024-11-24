import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import Tag from "./Tag";
import CopyButton from "./buttons/CopyButton";
import { Resource } from "@/types/Resource";
import FavoriteButton from "./buttons/FavoriteButton";
import ButtonPopover from "./buttons/ButtonPopover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  resource: Resource;
  layout?: "grid" | "list";
};

const MAX_DESCRIPTION_LENGTH = 140; // Adjust this value as needed

const ResourceItem = ({ resource, layout = "grid" }: Props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const isDescriptionLong =
    resource.description.length > MAX_DESCRIPTION_LENGTH;

  const displayedDescription =
    layout === "list"
      ? resource.description.trimEnd()
      : isDescriptionLong
        ? showFullDescription
          ? resource.description.trimEnd()
          : resource.description.slice(0, MAX_DESCRIPTION_LENGTH).trimEnd() +
            "..."
        : resource.description.trimEnd();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "group flex scale-100 rounded-3xl p-6 transition-all duration-300 ease-in-out hover:cursor-pointer",
            layout === "grid" &&
              "flex-col bg-gradient-to-br from-primary-foreground to-background outline outline-border hover:bg-primary-foreground hover:shadow-2xl hover:shadow-primary-foreground hover:outline-primary/30",
            layout === "list" &&
              "light:resource-hover flex-row gap-6 p-4 pl-0 dark:hover:bg-primary-foreground",
          )}
        >
          {/* Image Section */}
          <div
            className={cn(
              "rounded-xl transition-all duration-100 ease-in-out",
              layout === "grid" && "mb-4 aspect-video max-h-[15rem] w-full",
              layout === "list" &&
                "aspect-square h-32 flex-shrink-0 sm:aspect-video",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resource.image || "/images/placeholder.png"}
              alt={resource.title}
              className={cn(
                "h-full w-full rounded-xl object-cover",
                layout === "grid" &&
                  "outline outline-1 outline-border transition-all duration-300 ease-in-out group-hover:scale-[1.04] group-hover:shadow-lg group-hover:outline-primary/30",
              )}
            />
          </div>

          {/* Content Section */}
          <div className={cn(layout === "list" && "flex-grow")}>
            <h2
              className={cn(
                "mb-2 text-xl font-bold",
                layout === "list" && "line-clamp-1",
              )}
            >
              {/* Title */}
              {resource.title}
            </h2>

            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 lg:mb-4">
              {/* Description */}
              <span
                className={cn(layout === "list" && "line-clamp-2 max-w-[65ch]")}
              >
                {displayedDescription}
              </span>
              {isDescriptionLong &&
                !showFullDescription &&
                layout == "grid" && (
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the Link click when toggling description
                      toggleDescription();
                    }}
                    className="ml-1 inline text-sm underline transition-colors duration-200 ease-in-out hover:text-primary"
                  >
                    {!showFullDescription && "Read More"}
                  </button>
                )}
            </div>

            {layout === "list" && (
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-1.5">
                  {/* Tags */}
                  {resource.tags &&
                    resource.tags.map((tag) => (
                      <Tag key={tag.id}>{tag.text}</Tag>
                    ))}
                </div>

                <div className="flex items-center justify-end gap-1 md:hidden">
                  <ButtonPopover content="Open Link">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={resource.url}
                      className={buttonVariants({
                        variant: "outline",
                        size: "icon",
                      })}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink />
                    </Link>
                  </ButtonPopover>

                  <CopyButton link={resource.url} />

                  <FavoriteButton resource={resource} />
                </div>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div
            className={cn(
              "text-xs text-gray-400",
              layout === "grid" &&
                "mt-auto flex flex-wrap-reverse justify-between gap-y-4",
              layout === "list" && "mt-0 hidden md:flex",
            )}
          >
            <div className="flex items-center gap-1">
              <ButtonPopover content="Open Link">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={resource.url}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink />
                </Link>
              </ButtonPopover>

              <CopyButton link={resource.url} />

              <FavoriteButton resource={resource} />
            </div>
            {layout === "grid" && (
              <div className="flex items-end gap-1.5">
                {/* Tags */}
                {resource.tags &&
                  resource.tags.map((tag) => (
                    <Tag key={tag.id}>{tag.text}</Tag>
                  ))}
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-3xl">{resource.title}</DialogTitle>
        <div className="flex gap-1.5">
          {resource.tags &&
            resource.tags.map((tag) => <Tag key={tag.id}>{tag.text}</Tag>)}
        </div>

        <div className="aspect-video max-h-[24rem] w-full">
          <Link target="_blank" href={resource.url}>
            <img
              src={resource.image || "/images/placeholder.png"}
              alt={resource.title}
              className="size-full rounded-xl object-cover outline outline-1 outline-border"
            />
          </Link>
        </div>
        <DialogDescription>{resource.description}</DialogDescription>

        <div className="flex justify-between">
          <div className="flex gap-1.5">
            <FavoriteButton resource={resource} />
            <CopyButton link={resource.url} />
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <DialogClose asChild>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={resource.url}
              className={buttonVariants({
                variant: "default",
                className: "text-white",
              })}
            >
              Open
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceItem;
