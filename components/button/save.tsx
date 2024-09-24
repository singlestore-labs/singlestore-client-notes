import { Save } from "lucide-react";
import { forwardRef } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type ButtonSaveProps = ComponentProps<ButtonProps>;

export const ButtonSave = forwardRef<HTMLButtonElement | null, ButtonSaveProps>(({ className, ...props }, ref) => {
  return (
    <Button
      {...props}
      ref={ref}
      className={cn("size-8 basis-auto p-0 transition-all", className)}
      size="icon"
    >
      <Save className="size-4" />
    </Button>
  );
});

ButtonSave.displayName = "ButtonSave";
