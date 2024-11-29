import ScrollToTop from "@/components/ScrollToTop";
import React from "react";
import Hero from "./_components/Hero";
import ResourceGrid from "./_components/ResourceGrid";
import { fetchResources } from "@/firebase/database";

const Page = async () => {
  const resources = await fetchResources();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Hero />
      <ResourceGrid fetchedResources={resources} />
      <ScrollToTop />
    </div>
  );
};

export default Page;
