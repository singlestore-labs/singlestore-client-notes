import { NoteAssistantAskControl } from "@/app/note/_assistant/ask/components/control";
import { NoteAssistantAskTrigger, NoteAssistantAskTriggerProps } from "@/app/note/_assistant/ask/components/trigger";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type NoteAssistantAskDialogProps = ComponentProps<NoteAssistantAskTriggerProps>;

export function NoteAssistantAskDialog({ className, ...props }: NoteAssistantAskDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <NoteAssistantAskTrigger
          {...props}
          className={cn("", className)}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask Assistant</DialogTitle>
          <DialogDescription>Ask the assistant a question about the selected note.</DialogDescription>
        </DialogHeader>
        <NoteAssistantAskControl />
      </DialogContent>
    </Dialog>
  );
}
