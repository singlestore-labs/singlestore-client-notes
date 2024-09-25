"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { ButtonSave } from "@/components/button/save";
import { DynamicTextarea, DynamicTextareaProps } from "@/components/dynamic-textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Defined } from "@/types/helpers";

export const getNoteContentFormSchema = (max: number = 2000) => z.object({ content: z.string().max(max) });

export type NoteContentFormSchema = z.infer<ReturnType<typeof getNoteContentFormSchema>>;

export type NoteContentFormProps = ComponentProps<
  "form",
  { defaultValues?: NoteContentFormSchema; max?: number; isDisabled?: boolean; onSubmit: SubmitHandler<NoteContentFormSchema> }
>;

export function NoteContentForm({
  className,
  defaultValues,
  max = 2000,
  isDisabled,
  onSubmit,
  ...props
}: NoteContentFormProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const schema = useMemo(() => getNoteContentFormSchema(max), [max]);

  const form = useForm<NoteContentFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: "", ...defaultValues },
  });

  const content = form.watch("content");

  const handleSubmitKeyDown: Defined<DynamicTextareaProps["onSubmitKeyDown"]> = () => {
    buttonRef.current?.click();
  };

  return (
    <Form {...form}>
      <form
        {...props}
        className={cn("flex flex-col", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-baseline gap-2">
          <ButtonSave
            ref={buttonRef}
            type="submit"
          />

          <FormField
            name="content"
            control={form.control}
            disabled={isDisabled}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <DynamicTextarea
                    {...field}
                    ref={(ref) => field.ref(ref?.current)}
                    className="min-h-0 rounded-none border-0 border-b p-0 pb-2 text-base shadow-none focus-visible:ring-0"
                    placeholder="Content"
                    onSubmitKeyDown={handleSubmitKeyDown}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {content && (
          <p className="ml-auto mt-1 text-sm">
            {content.length}/{max}
          </p>
        )}
      </form>
    </Form>
  );
}
