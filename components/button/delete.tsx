"use client";

import { Trash } from "lucide-react";
import { forwardRef, ReactNode, useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type ButtonDeleteProps = ComponentProps<ButtonProps, { title?: ReactNode }>;

export const ButtonDelete = forwardRef<HTMLButtonElement | null, ButtonDeleteProps>(
  ({ className, title = "Are you sure?", onClick, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <TooltipProvider delayDuration={400}>
            <Tooltip>
              <TooltipTrigger
                asChild
                onClick={() => setIsOpen(true)}
              >
                <Button
                  {...props}
                  ref={ref}
                  className={cn("shrink-0 p-0", className)}
                  size="icon"
                  variant="destructive"
                >
                  <Trash className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              variant="destructive"
              onClick={onClick}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);

ButtonDelete.displayName = "ButtonDelete";
