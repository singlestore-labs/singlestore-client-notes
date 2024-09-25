import { ComponentProps } from "@/types/component";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

export type NoteAssistantAskActionProps = ComponentProps<ButtonProps>;

export function NoteAssistantAskAction({ className, ...props }: NoteAssistantAskActionProps) {
  return (
    <Button
      variant="outline"
      {...props}
      className={cn("", className)}
    >
      Ask Assistant
    </Button>
  );
}
