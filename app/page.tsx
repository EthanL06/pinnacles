"use client";

import Footer from "@/components/Footer";
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
      <Footer />
    </div>
  );
};

export default Page;
