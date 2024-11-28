import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { fetchOgTags } from "@/lib/api";
import { ImageIcon, LinkIcon, SendIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import ResourceItem from "./ResourceItem";
import LoadingSpinner from "./ui/loading-spinner";
import { Separator } from "./ui/separator";

import { Tag as TagType, TagInput } from "emblor";
import Tag from "./Tag";
import { useToast } from "@/hooks/use-toast";
import { ResourceTypes } from "@/types/Resource";
import { createFireworks } from "./ui/confetti";
import { addResourceToReview } from "@/firebase/database";

const formSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1, "Please enter a title."),
  description: z.string().min(1, "Please enter a description."),
  tags: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
    )
    .min(1, "Please add at least one tag."),
  type: z.enum(ResourceTypes),
  imageUrl: z.string().min(1, "Please enter an image URL."),
});

const SubmitResourceForm = ({
  setHasChanged,
  preview,
  setPreview,
  setOpen,
}: {
  setHasChanged: (hasChanged: boolean) => void;
  preview: boolean;
  setPreview: (preview: boolean) => void;
  setOpen: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      tags: [],
      type: "website",
      imageUrl: "",
    },
  });

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [tags, setTags] = useState<TagType[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await addResourceToReview({
      title: values.title,
      description: values.description,
      image: values.imageUrl,
      tags: values.tags,
      url: values.url,
      type: values.type,
    });

    setIsLoading(false);
    setOpen(false);

    createFireworks();

    toast({
      title: "Resource submitted!",
      description:
        "Your resource has been successfully submitted for review. Thank you!",
      duration: 2500,
    });
  };

  const onFetchClick = async () => {
    setIsLoading(true);
    setHasChanged(true);
    try {
      const data = await fetchOgTags(form.getValues("url"));

      form.setValue("title", data.title?.trim() || "");
      form.setValue("description", data.description?.trim() || "");
      form.setValue("tags", data.tags || []);
      form.setValue("imageUrl", data.image?.trim() || "");
      form.setValue("type", data.type || "website");

      if (!form.getValues("url").startsWith("http")) {
        form.setValue("url", `https://${form.getValues("url")}`);
      }

      setTags(data.tags);
      setHasFetched(true);

      form.clearErrors("url");
    } catch (e) {
      form.setError("url", { message: e as string, type: "validate" });
      setHasFetched(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-fit">
      {!preview && (
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full max-w-lg space-y-6"
          >
            {/* URL Input */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-x-2">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="grow text-left">
                      <FormLabel>Resource Link</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            startIcon={LinkIcon}
                            placeholder="https://pinnacles.app"
                            {...field}
                          />
                          <Button
                            disabled={isLoading}
                            className="px-5 dark:text-white"
                            onClick={onFetchClick}
                            size={"icon"}
                          >
                            {isLoading ? <LoadingSpinner /> : <SendIcon />}
                          </Button>
                        </div>
                      </FormControl>
                      {!hasFetched && (
                        <FormDescription className="text-left text-xs">
                          We&apos;ll automatically fetch the title, description,
                          and preview image for you.
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {hasFetched && (
              <>
                <Separator />

                {/* Resource Details */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="pinnacles" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              className="max-h-[10rem]"
                              placeholder="Peak resources for web developers and designers."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-left">Tags</FormLabel>
                          <FormControl className="w-full">
                            <TagInput
                              {...field}
                              placeholder="Press Enter to add a tag"
                              tags={tags}
                              setTags={(newTags) => {
                                setTags(newTags);
                                form.setValue(
                                  "tags",
                                  newTags as [TagType, ...TagType[]],
                                );
                              }}
                              activeTagIndex={activeTagIndex}
                              setActiveTagIndex={setActiveTagIndex}
                              inlineTags={true}
                              maxTags={3}
                              styleClasses={{
                                inlineTagsContainer: "flex flex-wrap gap-1",
                                input:
                                  "inline-flex grow min-w-[10rem] text-xs pl-1",
                              }}
                              customTagRenderer={(tag) => (
                                <Tag className="space-x-1 pr-1" key={tag.id}>
                                  <span>{tag.text}</span>
                                  <button
                                    onClick={() => {
                                      setTags((tags) =>
                                        tags.filter((t) => t.id !== tag.id),
                                      );
                                      form.setValue(
                                        "tags",
                                        tags.filter((t) => t.id !== tag.id),
                                      );
                                    }}
                                    className="flex size-5 items-center justify-center rounded-full p-1 transition-colors hover:bg-primary-foreground"
                                  >
                                    <XIcon strokeWidth={3} className="size-3" />
                                  </button>
                                </Tag>
                              )}
                            />
                          </FormControl>
                          <FormDescription className="text-left">
                            Add tags to categorize your resource.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input
                                startIcon={ImageIcon}
                                placeholder="Enter image URL"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) =>
                                  field.onChange(value.toLowerCase())
                                }
                                defaultValue={field.value.toLowerCase()}
                                value={field.value.toLowerCase()}
                              >
                                <SelectTrigger className="capitalize">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ResourceTypes.map((type) => (
                                    <SelectItem
                                      className="capitalize"
                                      key={type}
                                      value={type.toLowerCase()}
                                    >
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    disabled={isLoading}
                    className="dark:text-white"
                    onClick={() => {
                      setPreview(true);
                    }}
                  >
                    See Preview
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      )}

      {preview && (
        <>
          <ResourceItem
            resource={{
              title: form.getValues("title") || "",
              description: form.getValues("description") || "",
              tags: form.getValues("tags") || [],
              image: form.getValues("imageUrl") || "",
              url: form.getValues("url") || "",
              type: form.getValues("type") || "website",
            }}
          />

          <div className="mt-4 flex items-center justify-end gap-x-2 text-right">
            <Button variant="ghost" onClick={() => setPreview(false)}>
              Back
            </Button>

            <Button
              className="min-w-[5.125rem] dark:text-white"
              onClick={async () => {
                await form.trigger();

                if (form.formState.isValid) {
                  form.handleSubmit(onSubmit)();
                } else {
                  console.log(
                    "Form is invalid. Errors:",
                    form.formState.errors,
                  );
                  setPreview(false);
                }
              }}
            >
              {isLoading ? <LoadingSpinner /> : "Submit"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SubmitResourceForm;
