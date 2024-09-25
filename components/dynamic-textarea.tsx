"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { useAutosizeTextArea } from "@/hooks/use-auto-size-textarea";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Defined } from "@/types/helpers";

export type DynamicTextareaProps = ComponentProps<TextareaProps, { value?: string }>;

export const DynamicTextarea = forwardRef<{ current: HTMLTextAreaElement | null }, DynamicTextareaProps>(
  ({ className, value, onKeyDown, ...props }, ref) => {
    const rootRef = useRef<HTMLTextAreaElement | null>(null);

    const [_value, setValue] = useState<typeof value>();
    useEffect(() => setValue(value), [value]);

    useImperativeHandle(ref, () => ({ current: rootRef.current }));
    useAutosizeTextArea(rootRef.current, value);

    const handleKeyDown: Defined<TextareaProps["onKeyDown"]> = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        onKeyDown?.(event);
      }
    };

    useEffect(() => {
      if (rootRef.current) {
        const { length } = rootRef.current.value;
        rootRef.current?.setSelectionRange(length, length);
      }
    }, []);

    return (
      <Textarea
        {...props}
        ref={rootRef}
        className={cn("min-h-max resize-none", className)}
        value={_value}
        rows={1}
        autoFocus
        onKeyDown={handleKeyDown}
      />
    );
  },
);

DynamicTextarea.displayName = "DynamicTextarea";
