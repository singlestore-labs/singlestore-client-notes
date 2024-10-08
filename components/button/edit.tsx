import { Edit2 } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type ButtonEditProps = ComponentProps<ButtonProps>;

export function ButtonEdit({ className, ...props }: ButtonEditProps) {
  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            {...props}
            type="button"
            className={cn("shrink-0 p-0", className)}
            variant="secondary"
            size="icon"
          >
            <Edit2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
