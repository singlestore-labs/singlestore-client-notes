"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { ButtonSave } from "@/components/button/save";
import { DynamicTextarea, DynamicTextareaProps } from "@/components/dynamic-textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Defined } from "@/types/helpers";

export const noteTitleFormSchema = z.object({ title: z.string() });

export type NoteTitleFormSchema = z.infer<typeof noteTitleFormSchema>;

export type NoteTitleFormProps = ComponentProps<
  "form",
  { defaultValues?: NoteTitleFormSchema; isDisabled?: boolean; onSubmit: SubmitHandler<NoteTitleFormSchema> }
>;

export function NoteTitleForm({ className, defaultValues, isDisabled, onSubmit, ...props }: NoteTitleFormProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<NoteTitleFormSchema>({
    resolver: zodResolver(noteTitleFormSchema),
    defaultValues: { title: "", ...defaultValues },
  });

  const handleKeyDown: Defined<DynamicTextareaProps["onKeyDown"]> = () => {
    buttonRef.current?.click();
  };

  return (
    <Form {...form}>
      <form
        {...props}
        className={cn("flex items-start gap-2", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ButtonSave
          ref={buttonRef}
          type="submit"
        />

        <FormField
          name="title"
          control={form.control}
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <DynamicTextarea
                  {...field}
                  ref={(ref) => field.ref(ref?.current)}
                  className="min-h-0 rounded-none border-0 border-b p-0 pb-2 text-3xl font-bold shadow-none focus-visible:ring-0"
                  placeholder="Title"
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
