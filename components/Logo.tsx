import { useTheme } from "next-themes";
import React from "react";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  const { resolvedTheme } = useTheme();
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style={{
              stopColor: resolvedTheme === "dark" ? "white" : "black",
              stopOpacity: 1,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: resolvedTheme === "dark" ? "white" : "black",
              stopOpacity: 0.7,
            }}
          />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200 100.671L100 0L0 100.671H98.6668L0 200H200L101.333 100.671H200Z"
        fill="url(#grad1)"
      />
    </svg>
  );
};

export default Logo;
