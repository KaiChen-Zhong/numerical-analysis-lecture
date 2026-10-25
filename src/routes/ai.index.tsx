import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Binary, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AI_LESSONS } from "@/lib/ai-track";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/ai/")({ component: AiHub });

function AiHub() {
  const aiMastered = useProgress((s) => s.aiMastered) ?? {};
  const lastAiLessonId = useProgress((s) => s.lastAiLessonId);
  const done = AI_LESSONS.filter((l) => aiMastered[l.id]).length;
  const continueId =
    lastAiLessonId && AI_LESSONS.some((l) => l.id === lastAiLessonId)
      ? lastAiLessonId
      : (AI_LESSONS.find((l) => !aiMastered[l.id])?.id ?? AI_LESSONS[0].id);
  const continueLesson = AI_LESSONS.find((l) => l.id === continueId) ?? AI_LESSONS[0];

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-medium tracking-[0.16em] text-pine">AI 视角</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        数值分析怎样用在训练里
      </h1>
      <p className="mt-3 max-w-xl text-base text-muted-foreground">
        循序渐进，先把数算炸，再对应回考试章节。本科内容够用，不必陷进线搜索和信赖域。
      </p>

      <div className="mt-6 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <p className="text-[0.6875rem] font-medium tracking-wide text-cinnabar">先说结论</p>
        <p className="mt-2 font-display text-xl font-semibold leading-snug">
          只要方向碰到优化、训练或数值计算，这门课能帮你少走非常多弯路。
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Softmax 不做 max-shift 会炸，Adam 的 ε 是在挡除零，混合精度和量化是有效数字与表示范围的取舍。论文架构越来越像，胜负手经常在这些工程细节上。
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {lastAiLessonId ? "继续上次" : "从结论开始"} · {continueLesson.n} {continueLesson.title}
          </p>
          <Button asChild>
            <Link to="/ai/$lessonId" params={{ lessonId: continueLesson.id }}>
              {lastAiLessonId ? "接着读" : "开始这条路径"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-subtle">
        <span>已掌握 {done} / {AI_LESSONS.length}</span>
        <span>每节 4–10 分钟，含可动手实验</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-sunken">
        <div
          className="h-full bg-pine transition-[width] duration-300"
          style={{ width: `${(100 * done) / AI_LESSONS.length}%` }}
        />
      </div>

      <ol className="mt-8 flex flex-col gap-3">
        {AI_LESSONS.map((l, i) => {
          const mastered = Boolean(aiMastered[l.id]);
          return (
            <li key={l.id}>
              <Link
                to="/ai/$lessonId"
                params={{ lessonId: l.id }}
                className="group flex gap-4 rounded-xl bg-card p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sunken font-display text-sm text-primary">
                  {mastered ? <Check className="size-4 text-pine" /> : l.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-semibold leading-snug">{l.title}</span>
                    {l.lab && l.lab !== "map" ? (
                      <span className="text-[0.6875rem] text-pine">可动手</span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{l.thesis}</span>
                  <span className="mt-2 block text-[0.6875rem] text-subtle">
                    {l.minutes} 分钟
                    {i < AI_LESSONS.length - 1 ? " · 下一节衔接" : " · 路径终点"}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <p className="mt-8 flex items-start gap-2 text-sm text-muted-foreground">
        <Binary className="mt-0.5 size-4 shrink-0 text-subtle" />
        考试公式仍在「讲义」里。这里只回答：同一条原理，训练和推理里长什么样。
      </p>
    </div>
  );
}
