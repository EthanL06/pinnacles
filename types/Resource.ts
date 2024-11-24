import { Tag as TagType } from "emblor";

export type Resource = {
  image: string;
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  tags: TagType[];
};

export const ResourceTypes = [
  "website",
  "article",
  "video",
  "channel",
  "other",
] as const;
export type ResourceType = (typeof ResourceTypes)[number];
