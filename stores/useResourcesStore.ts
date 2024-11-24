import { Resource } from "@/types";
import { addResource, fetchResources } from "@/firebase/database";
import { create } from "zustand";

interface ResourceStore {
  resources: Resource[];
  fetchResources: () => Promise<void>;
  addResource: (resource: Resource) => Promise<void>;
  shuffleResources: () => void;
}

export const useResourcesStore = create<ResourceStore>()((set) => ({
  resources: [],
  fetchResources: async () => {
    const resources = await fetchResources();
    // Sort by alphabetical order of title
    resources.sort((a, b) => a.title.localeCompare(b.title));
    set({ resources });
  },
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
      // Create a copy of the resources array
      const shuffledResources = [...state.resources];
      // Shuffle the copied array
      for (let i = shuffledResources.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledResources[i], shuffledResources[j]] = [
          shuffledResources[j],
          shuffledResources[i],
        ];
      }
      // Return the new state with the shuffled resources
      return { resources: shuffledResources };
    });
  },
}));
