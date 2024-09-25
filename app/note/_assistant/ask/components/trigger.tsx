import { ComponentProps } from "@/types/component";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

export type NoteAssistantAskTriggerProps = ComponentProps<ButtonProps>;

export function NoteAssistantAskTrigger({ className, ...props }: NoteAssistantAskTriggerProps) {
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
