import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Defined } from "@/types/helpers";

const MAX = 512;

const noteAssistantAskFormSchema = z.object({ prompt: z.string().max(MAX) });

type NoteAssistantAskFormSchema = z.infer<typeof noteAssistantAskFormSchema>;

export type NoteAssistantAskFormProps = ComponentProps<
  "div",
  { isDisabled?: boolean; onSubmit: SubmitHandler<NoteAssistantAskFormSchema> }
>;

export function NoteAssistantAskForm({ className, isDisabled, onSubmit, ...props }: NoteAssistantAskFormProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<NoteAssistantAskFormSchema>({
    resolver: zodResolver(noteAssistantAskFormSchema),
    defaultValues: { prompt: "" },
  });

  const prompt = form.watch("prompt");

  const handleKeyDown: Defined<TextareaProps["onKeyDown"]> = (event) => {
    if (event.key === "Enter" && event.metaKey) {
      event.preventDefault();
      buttonRef.current?.click();
    }
  };

  return (
    <div
      {...props}
      className={cn("flex flex-col", className)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="prompt"
            control={form.control}
            disabled={isDisabled}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="pr-10 text-base"
                    rows={3}
                    {...field}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            ref={buttonRef}
            className="mt-4 w-full gap-2"
            type="submit"
            size="icon"
            disabled={isDisabled}
          >
            Send
          </Button>
        </form>
      </Form>

      {prompt && (
        <p className="ml-auto mt-1 text-sm">
          {prompt.length}/{MAX}
        </p>
      )}
    </div>
  );
}
