import { useEffect, useRef } from "react";

export function useAutosizeTextArea(ref: HTMLTextAreaElement | null, value?: string) {
  const prevValueRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (ref) {
      prevValueRef.current = value;
      const scrollHeight = ref.scrollHeight;

      if (ref.style.minHeight !== `${scrollHeight}px`) {
        ref.style.minHeight = "0px";
        ref.style.minHeight = scrollHeight + "px";
      }
    }
  }, [ref, value]);
}
