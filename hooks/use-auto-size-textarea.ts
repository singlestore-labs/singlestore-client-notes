import { useEffect, useRef } from "react";

export function useAutosizeTextArea(ref: HTMLTextAreaElement | null, value?: string) {
  const prevValueRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (ref && value !== prevValueRef.current) {
      prevValueRef.current = value;

      const scrollHeight = ref.scrollHeight;

      if (ref.style.height !== `${scrollHeight}px`) {
        ref.style.height = "0px";
        ref.style.height = scrollHeight + "px";
      }
    }
  }, [ref, value]);
}
