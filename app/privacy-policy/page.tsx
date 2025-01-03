import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | pinnacles.",
  description:
    "Learn how pinnacles collects and uses data to improve the site.",
  openGraph: {
    type: "website",
    description:
      "Learn how pinnacles collects and uses data to improve the site.",
    url: "https://pinnacles.app/about",
    siteName: "pinnacles.",
    title: "Privacy Policy | pinnacles.",
    locale: "en_US",
    images: [
      {
        url: "https://pinnacles.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "pinnacles.",
      },
    ],
  },
};

const Page = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://pinnacles.app/privacy-policy" />
      </Head>
      <div className="prose mx-auto max-w-screen-md px-6 pb-32 pt-40 dark:prose-invert">
        <h1 className="font-serif text-6xl">Privacy Policy</h1>
        <p>
          <strong>Last Updated:</strong> November 30, 2024
        </p>
        <p>
          At <strong>Pinnacles</strong>, we take your privacy seriously. This
          Privacy Policy explains how we collect, use, and protect your data
          when you visit our website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We only collect analytical data to improve the functionality and
          content of our site. This includes:
        </p>
        <ul>
          <li>Search and filter queries</li>
          <li>Resource interactions (e.g., clicks, copies, opens)</li>
          <li>User preferences</li>
          <li>Device type, browser, and general location</li>
        </ul>
        <p>
          All data is collected anonymously through{" "}
          <strong>Google Analytics</strong> and cannot be used to identify
          individual users.
        </p>

        <h2>How We Use Your Data</h2>
        <p>The anonymous data we collect helps us:</p>
        <ul>
          <li>Understand which resources are most popular</li>
          <li>Identify trends and improve the site’s user experience</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Our site uses analytics cookies from <strong>Google Analytics</strong>{" "}
          to track user interactions anonymously. These cookies help us
          understand how visitors engage with our site, ensuring we provide the
          best possible experience.
        </p>

        <h2>Data Sharing</h2>
        <p>
          We do not share, sell, or distribute any data to third parties. All
          information remains anonymous and is used solely for site improvement.
        </p>

        <h2>Data Storage and Protection</h2>
        <p>
          Google Analytics handles the storage and protection of all collected
          data. For more information about Google’s data protection practices,
          please refer to the{" "}
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://policies.google.com/privacy"
            className="text-primary"
          >
            Google Privacy Policy
          </Link>
          .
        </p>

        <h2>User Rights</h2>
        <p>
          Since no personal data is collected, there are no additional rights to
          request data access, correction, or deletion.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Please check this
          page periodically for any updates.
        </p>

        <p>
          If you have any questions or concerns about this Privacy Policy, feel
          free to{" "}
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:ethanclanting@gmail.com"
            className="text-primary"
          >
            contact us
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default Page;
