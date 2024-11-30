import React from "react";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { Separator } from "@/components/ui/separator";
import GridPattern from "@/components/ui/grid-pattern";
import Particles from "@/components/ui/particles";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "-z-10 opacity-70 [mask-image:radial-gradient(1000px_circle_at_center,transparent,white)]",
        )}
      />
      <div className="relative h-full w-full overflow-clip bg-gradient-to-b from-transparent from-85% to-blue-300/15 px-4 pt-32">
        <div>
          <AnimatedGradientText className="relative" hideBorder={true}>
            <h1 className="heading animate-gradient bg-transparent bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-center font-serif text-transparent">
              pinnacles.
            </h1>
          </AnimatedGradientText>

          <p className="paragraph mt-1 text-balance text-center font-semibold">
            <span
              style={{ "--shadow-color": "black" } as React.CSSProperties}
              className="relative inline-flex font-bold italic tracking-tighter text-primary underline after:absolute after:left-[0.04em] after:top-[0.04em] after:z-[-1] after:animate-line-shadow after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)] after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent after:content-[attr(data-text)]"
              data-text="peak"
            >
              peak
            </span>{" "}
            resources for web developers and designers{" "}
          </p>
        </div>

        <Separator className="mt-10 bg-primary/10" />

        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          refresh
        />
      </div>
    </>
  );
};

export default Hero;
