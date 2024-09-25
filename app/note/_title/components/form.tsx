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

export const getNoteTitleFormSchema = (max: number = 2000) => z.object({ title: z.string().max(max) });

export type NoteTitleFormSchema = z.infer<ReturnType<typeof getNoteTitleFormSchema>>;

export type NoteTitleFormProps = ComponentProps<
  "form",
  { defaultValues?: NoteTitleFormSchema; max?: number; isDisabled?: boolean; onSubmit: SubmitHandler<NoteTitleFormSchema> }
>;

export function NoteTitleForm({ className, defaultValues, max = 128, isDisabled, onSubmit, ...props }: NoteTitleFormProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const schema = useMemo(() => getNoteTitleFormSchema(max), [max]);

  const form = useForm<NoteTitleFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", ...defaultValues },
  });

  const handleSubmitKeyDown: Defined<DynamicTextareaProps["onSubmitKeyDown"]> = () => {
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
                  onSubmitKeyDown={handleSubmitKeyDown}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
