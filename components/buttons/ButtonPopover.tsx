"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useTimeout from "@/hooks/use-timeout";

const DELAY = 200;

const ButtonPopover = ({
  content,
  children,
  onClick,
}: {
  content: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const { start, stop, active } = useTimeout(() => setShowPopover(true), DELAY);

  const handleMouseLeave = () => {
    if (active) {
      stop();
    }
    setShowPopover(false);
  };

  return (
    <Popover open={showPopover}>
      <PopoverTrigger
        onClick={onClick}
        onMouseEnter={start}
        onMouseLeave={handleMouseLeave}
        asChild
      >
        {children}
      </PopoverTrigger>
      <PopoverContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-fit p-2 text-xs"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default ButtonPopover;
