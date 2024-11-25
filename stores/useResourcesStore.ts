import { Resource } from "@/types";
import { addResource, fetchResources } from "@/firebase/database";
import { create } from "zustand";

interface ResourceStore {
  resources: Resource[];
  fetchResources: () => Promise<void>;
  isFetching: boolean;
  refreshResources: () => Promise<void>;
  addResource: (resource: Resource) => Promise<void>;
  shuffleResources: () => void;
}

const REVALIDATE_TIME = 1000 * 60 * 60; // 1 hour revalidate time

export const useResourcesStore = create<ResourceStore>()((set) => ({
  resources: [],
  fetchResources: async () => {
    set({ isFetching: true });

    const cachedData = localStorage.getItem("resources");
    const cachedTime = localStorage.getItem("resourcesTimestamp");

    if (
      cachedData &&
      cachedTime &&
      Date.now() - parseInt(cachedTime) < REVALIDATE_TIME
    ) {
      console.log("Using cached data");

      set({
        resources: JSON.parse(cachedData),
        isFetching: false,
      });
    } else {
      console.log("Fetching new data");
      const resources = await fetchResources();
      localStorage.setItem("resources", JSON.stringify(resources));
      localStorage.setItem("resourcesTimestamp", Date.now().toString());

      set({
        resources,
        isFetching: false,
      });
    }
  },
  isFetching: false,
  refreshResources: async () => {
    set({ isFetching: true });

    const resources = await fetchResources();
    localStorage.setItem("resources", JSON.stringify(resources));
    localStorage.setItem("resourcesTimestamp", Date.now().toString());

    set({
      resources,
      isFetching: false,
    });
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
