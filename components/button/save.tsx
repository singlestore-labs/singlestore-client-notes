import { Save } from "lucide-react";
import { forwardRef } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type ButtonSaveProps = ComponentProps<ButtonProps>;

export const ButtonSave = forwardRef<HTMLButtonElement | null, ButtonSaveProps>(({ className, ...props }, ref) => {
  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            {...props}
            ref={ref}
            className={cn("shrink-0 p-0", className)}
            size="icon"
          >
            <Save className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Save</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

ButtonSave.displayName = "ButtonSave";
