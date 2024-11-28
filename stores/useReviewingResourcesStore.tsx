import { isSignedIn } from "@/firebase/auth";
import {
  addResourceToReview,
  fetchReviewingResources,
  removeResourceFromReview,
} from "@/firebase/database";
import { Resource } from "@/types";
import { ReviewingResource } from "@/types/Resource";
import { create } from "zustand";

interface ReviewingResourcesStore {
  reviewingResources: ReviewingResource[];
  isFetching: boolean;
  fetchReviewingResources: () => Promise<void>;
  addReviewingResource: (resource: Resource) => Promise<void>;
  removeReviewingResource: (resourceId: string, add: boolean) => Promise<void>;
}

// Create the Zustand store
export const useReviewingResourcesStore = create<ReviewingResourcesStore>(
  (set) => ({
    reviewingResources: [],
    isFetching: false,
    fetchReviewingResources: async () => {
      try {
        if (!isSignedIn()) return;
        set({ isFetching: true });
        const resources = await fetchReviewingResources();
        set({ reviewingResources: resources, isFetching: false });
      } catch (e) {
        console.error("Error fetching reviewing resources:", e);
      }
    },
    addReviewingResource: async (resource) => {
      try {
        const id = await addResourceToReview(resource);

        if (!id) {
          return;
        }

        set((state) => ({
          reviewingResources: [
            ...state.reviewingResources,
            { ...resource, id } as ReviewingResource,
          ],
        }));
      } catch (e) {
        console.error("Error adding resource to review:", e);
      }
    },
    removeReviewingResource: async (resourceId, add) => {
      try {
        await removeResourceFromReview(resourceId, add);
        set((state) => ({
          reviewingResources: state.reviewingResources.filter(
            (r) => r.id !== resourceId,
          ),
        }));
      } catch (e) {
        console.error("Error removing resource from review:", e);
      }
    },
  }),
);
