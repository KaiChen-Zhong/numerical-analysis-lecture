import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium tracking-wide",
  {
    variants: {
      variant: {
        focus: "bg-cinnabar text-cinnabar-foreground",
        optional: "bg-pine text-pine-foreground",
        guide: "bg-muted text-muted-foreground",
        out: "bg-transparent text-subtle line-through decoration-subtle",
        outline: "border border-border text-muted-foreground",
      },
    },
    defaultVariants: { variant: "guide" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
