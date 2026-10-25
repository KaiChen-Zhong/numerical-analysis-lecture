import { Badge } from "@/components/ui/badge";
import type { Priority } from "@/lib/content/types";

const LABEL: Record<Priority, string> = {
  focus: "重点",
  optional: "选择性",
  guide: "导读",
  out: "不考",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge variant={priority}>{LABEL[priority]}</Badge>;
}
