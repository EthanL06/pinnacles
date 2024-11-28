"use client";

import ScrollToTop from "@/components/ScrollToTop";
import React from "react";
import Hero from "./_components/Hero";
import ResourceGrid from "./_components/ResourceGrid";

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Hero />
      <ResourceGrid />
      <ScrollToTop />
    </div>
  );
};

export default Page;
