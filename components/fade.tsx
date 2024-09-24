import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Defined } from "@/types/helpers";

export type FadeProps = ComponentProps<"span", { direction?: "t" | "b" | "l" | "r" }>;

const directionClasses: Record<Defined<FadeProps["direction"]>, string> = {
  t: "gradient-mask-t-0",
  b: "gradient-mask-b-0",
  l: "gradient-mask-l-0",
  r: "gradient-mask-r-0",
};

export function Fade({ className, direction = "t", ...props }: FadeProps) {
  return (
    <span
      {...props}
      className={cn("pointer-events-none absolute left-0 z-[1] h-4 bg-inherit", directionClasses[direction], className)}
    />
  );
}
