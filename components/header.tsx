import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type HeaderProps = ComponentProps<"header">;

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      {...props}
      className={cn("flex items-center border-b px-4 py-3", className)}
    >
      <Logo />
      <Button
        asChild
        className="ml-auto"
      >
        <Link href="https://www.singlestore.com/cloud-trial/">Try Free</Link>
      </Button>
    </header>
  );
}
