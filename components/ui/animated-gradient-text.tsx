import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function AnimatedGradientText({
  children,
  className,
  hideBorder = false,
}: {
  children: ReactNode;
  className?: string;
  hideBorder?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%]",
        className,
      )}
    >
      {!hideBorder && (
        <div
          className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] [border-radius:inherit] ![mask-composite:subtract] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
        />
      )}

      {children}
    </div>
  );
}
