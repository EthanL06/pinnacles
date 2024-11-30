import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 pb-32 pt-40 text-left md:px-24 lg:px-48">
      <h2 className="mt-32 font-serif text-9xl">404</h2>
      <p className="mt-8 text-2xl font-semibold">
        Oops! This page doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className: "mt-8 text-white",
        })}
      >
        Back to Home
      </Link>
    </div>
  );
}
