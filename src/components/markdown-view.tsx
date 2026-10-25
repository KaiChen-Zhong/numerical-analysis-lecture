import { useMemo, type ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { cn } from "@/lib/utils";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/【.*?】/g, "")
    .replace(/[^\w\u4e00-\u9fff.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function isAside(node: ReactNode) {
  return textOf(node).includes("虽不考");
}

export function MarkdownView({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  const plugins = useMemo(() => [remarkGfm, remarkMath], []);
  const rehype = useMemo(
    () => [[rehypeKatex, { throwOnError: false, strict: "ignore" }] as const],
    [],
  );

  return (
    <div className={cn("lecture", className)}>
      <Markdown
        remarkPlugins={plugins}
        rehypePlugins={rehype as never}
        components={{
          h2: ({ children }) => (
            <h2 id={slugify(textOf(children))}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 id={slugify(textOf(children))}>{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 id={slugify(textOf(children))}>{children}</h4>
          ),
          p: ({ children }) =>
            isAside(children) ? (
              <p className="callout">{children}</p>
            ) : (
              <p>{children}</p>
            ),
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
