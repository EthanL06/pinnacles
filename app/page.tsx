import ScrollToTop from "@/components/ScrollToTop";
import React from "react";
import Hero from "./_components/Hero";
import ResourceGrid from "./_components/ResourceGrid";
import { fetchResources } from "@/firebase/database";
import { unstable_cache } from "next/cache";

const getCachedResources = unstable_cache(fetchResources, ["resources"], {
  revalidate: 60 * 60, // 1 hour
  tags: ["resources"],
});

const Page = async () => {
  const resources = await getCachedResources();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Hero />
      <ResourceGrid fetchedResources={resources} />
      <ScrollToTop />
    </div>
  );
};

export default Page;
