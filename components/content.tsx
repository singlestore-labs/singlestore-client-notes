import "github-markdown-css/github-markdown-light.css";
import Markdown, { Options } from "react-markdown";

import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type ContentProps = ComponentProps<"div", { children?: Options["children"] }>;

export function Content({ children, className, ...props }: ContentProps) {
  return (
    <div
      {...props}
      className={cn("w-full max-w-full [&_pre]:overflow-auto", className)}
    >
      <Markdown
        className="markdown-body"
        data-theme="light"
      >
        {children}
      </Markdown>
    </div>
  );
}
