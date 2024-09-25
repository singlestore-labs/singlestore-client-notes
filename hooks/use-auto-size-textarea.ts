import { useEffect, useRef, useState } from "react";

export function useAutosizeTextArea(ref: HTMLTextAreaElement | null, value?: string) {
  const prevValueRef = useRef<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(!!ref);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || !ref) return;

    prevValueRef.current = value;
    const scrollHeight = ref.scrollHeight;

    if (ref.style.minHeight !== `${scrollHeight}px`) {
      ref.style.minHeight = "0px";
      ref.style.minHeight = `${scrollHeight + 1}px`;
    }
  }, [ref, value, isMounted]);
}
