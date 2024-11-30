import React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

type Props = {
  variant?: "default" | "outline";
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const Tag = ({ variant = "outline", onClick, className, children }: Props) => {
  return (
    <Badge
      onClick={onClick}
      variant={variant}
      className={cn(
        "h-6 select-none",
        variant === "default" && "bg-[#3655B0]",
        className,
      )}
    >
      {children}
    </Badge>
  );
};

export default Tag;
