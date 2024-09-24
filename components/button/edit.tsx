import { Edit2 } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type ButtonEditProps = ComponentProps<ButtonProps>;

export function ButtonEdit({ className, ...props }: ButtonEditProps) {
  return (
    <Button
      {...props}
      type="button"
      className={cn("size-8 basis-auto p-0 transition-all", className)}
      variant="secondary"
      size="icon"
    >
      <Edit2 className="size-4" />
    </Button>
  );
}
