import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

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
