import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="font-mono text-xs tabular-nums text-foreground">
          {format ? format(value) : String(value)}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 h-10 w-full"
      />
    </label>
  );
}

export function LabFrame({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5">
      <p className="text-[0.6875rem] font-medium tracking-wide text-pine">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function StatusChip({
  ok,
  label,
}: {
  ok: boolean;
  label: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium",
        ok ? "bg-pine text-pine-foreground" : "bg-cinnabar text-cinnabar-foreground",
      )}
    >
      {label}
    </span>
  );
}
