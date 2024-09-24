import { cn } from "@/lib/utils";
import _Logo from "@/public/logo.svg";
import { ComponentProps } from "@/types/component";

export type LogoProps = ComponentProps<"span">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <span
      {...props}
      className={cn("flex w-40 shrink-0", className)}
    >
      <_Logo className="h-full w-full [&_[fill]]:fill-current [&_[stroke]]:stroke-current" />
    </span>
  );
}
