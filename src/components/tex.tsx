import katex from "katex";
import { cn } from "@/lib/utils";

export function TeX({
  latex,
  display = true,
  className,
}: {
  latex: string;
  display?: boolean;
  className?: string;
}) {
  const html = katex.renderToString(latex, {
    throwOnError: false,
    displayMode: display,
    output: "html",
    strict: "ignore",
  });
  return (
    <span
      className={cn(display && "tex-block", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
