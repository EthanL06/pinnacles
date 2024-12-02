"use client";

import ViewMode from "@/components/dropdowns/ViewMode";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { useReviewingResourcesStore } from "@/stores/useReviewingResourcesStore";
import React, { useEffect, useState } from "react";
import ReviewResouceItem from "./ReviewResouceItem";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { isSignedIn, signIn } from "@/firebase/auth";
import { RefreshCcw } from "lucide-react";
import RefreshButton from "@/components/buttons/RefreshButton";

const ReviewGrid = () => {
  const [isReviewMode, setIsReviewMode] = useState(false);
  const reviewingResources = useReviewingResourcesStore(
    (state) => state.reviewingResources,
  );
  const fetchReviewingResources = useReviewingResourcesStore(
    (state) => state.fetchReviewingResources,
  );
  const isFetching = useReviewingResourcesStore((state) => state.isFetching);
  const viewMode = usePreferencesStore((state) => state.viewMode);

  useEffect(() => {
    fetchReviewingResources();
  }, [fetchReviewingResources]);

  if (!isSignedIn()) {
    return (
      <div className="flex min-h-[80vh] w-full justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-12 dark:text-white">Sign In</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Admin Sign In</DialogTitle>
            <DialogDescription>
              Sign in to access admin features.
            </DialogDescription>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const form = e.target as HTMLFormElement;
                const email = (
                  form.elements.namedItem("email") as HTMLInputElement
                ).value;
                const password = (
                  form.elements.namedItem("password") as HTMLInputElement
                ).value;

                try {
                  await signIn(email, password);
                  // Refresh the page to show the admin features
                  fetchReviewingResources();
                } catch (error) {
                  alert(error);
                }
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Password" />
              </div>

              <Button className="dark:text-white" type="submit">
                Sign In
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full">
      {isFetching ? (
        <div className="col-span-full mt-12 flex h-full w-full flex-col items-center gap-y-1.5">
          <LoadingSpinner className="size-12 stroke-primary" />
          <span className="text-pretty font-medium">Loading resources...</span>
        </div>
      ) : reviewingResources.length === 0 ? (
        <div className="col-span-full mt-12 flex h-full w-full flex-col items-center gap-y-1.5">
          <span className="text-pretty font-medium">
            No resources to review. All done!
          </span>

          <Button
            onClick={() => {
              fetchReviewingResources();
            }}
            variant={"outline"}
            size={"icon"}
          >
            <RefreshCcw />
          </Button>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[1920px] grow border-b border-border bg-background px-3 pb-10 sm:px-6 md:px-12">
          <div className="mb-4 flex items-center gap-x-4">
            <ViewMode />
            <RefreshButton />
            <div className="flex items-center gap-x-2">
              <Label>Review Mode</Label>
              <Switch
                checked={isReviewMode}
                onCheckedChange={() => setIsReviewMode(!isReviewMode)}
              />
            </div>
          </div>
          <div
            className={cn(
              "grid w-full bg-background",
              viewMode === "grid" &&
                "grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
              viewMode === "list" && "w grid-cols-1",
            )}
          >
            {reviewingResources.map((resource, index) => (
              <ReviewResouceItem
                key={index}
                resource={resource}
                layout={viewMode}
                isReviewMode={isReviewMode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewGrid;
