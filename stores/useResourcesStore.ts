import { Resource } from "@/types";
import { addResource } from "@/firebase/database";
import { create } from "zustand";

interface ResourceStore {
  resources: Resource[];
  setResources: (resources: Resource[]) => void;
  isFetching: boolean;
  addResource: (resource: Resource) => Promise<void>;
  shuffleResources: () => void;
}

export const useResourcesStore = create<ResourceStore>()((set) => ({
  resources: [],
  setResources: (resources) =>
    set({
      resources,
    }),
  isFetching: false,
  addResource: async (resource) => {
    // Optimistically update the UI
    set((state) => ({ resources: [...state.resources, resource] }));
    // Add the resource to the database
    try {
      await addResource(resource);
    } catch (e) {
      console.error("Error adding document: ", e);
      // Revert the UI changes
      set((state) => ({
        resources: state.resources.filter((r) => r !== resource),
      }));
    }
  },
  shuffleResources: () => {
    set((state) => {
      const shuffledResources = [...state.resources];
      for (let i = shuffledResources.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledResources[i], shuffledResources[j]] = [
          shuffledResources[j],
          shuffledResources[i],
        ];
      }
      return { resources: shuffledResources };
    });
  },
}));
