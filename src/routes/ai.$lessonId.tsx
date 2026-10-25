import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarkdownView } from "@/components/markdown-view";
import { AiLab, BooksList } from "@/components/ai/labs";
import { aiNeighbors, getAiLesson } from "@/lib/ai-track";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai/$lessonId")({
  component: AiLessonPage,
});

function AiLessonPage() {
  const { lessonId } = Route.useParams();
  const lesson = getAiLesson(lessonId);
  const nav = aiNeighbors(lessonId);
  const markAiSeen = useProgress((s) => s.markAiSeen);
  const toggleAiMastered = useProgress((s) => s.toggleAiMastered);
  const aiMastered = useProgress((s) => s.aiMastered) ?? {};
  const isMastered = Boolean(aiMastered[lessonId]);

  useEffect(() => {
    if (lesson) markAiSeen(lesson.id);
  }, [lesson, markAiSeen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="font-display text-xl">没有这一节</p>
        <Button asChild className="mt-4">
          <Link to="/ai">回到 AI 视角</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <article>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-subtle">
          <Link to="/ai" className="text-primary">
            AI 视角
          </Link>
          <span>/</span>
          <span>
            {nav.index + 1} / {nav.total}
          </span>
          <span>· {lesson.minutes} 分钟</span>
        </div>

        <p className="text-xs font-medium tracking-[0.16em] text-pine">{lesson.kicker}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">{lesson.title}</h1>

        <div className="mt-5 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
          <p className="text-[0.6875rem] font-medium tracking-wide text-cinnabar">人话版</p>
          <p className="mt-1.5 text-sm leading-relaxed">{lesson.thesis}</p>
        </div>

        {lesson.examLinks.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {lesson.examLinks.map((e) => (
              <Link
                key={`${e.chapterId}-${e.sectionId}`}
                to="/read/$chapterId"
                params={{ chapterId: e.chapterId }}
                search={{ s: e.sectionId }}
                className="inline-flex h-10 items-center rounded-md bg-muted px-3 text-xs text-foreground"
              >
                讲义 {e.label}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-6">
          <MarkdownView markdown={lesson.markdown} />
        </div>

        {lesson.lab ? (
          <div className="mt-8">
            <AiLab id={lesson.lab} />
          </div>
        ) : null}

        {lesson.id === "howfar" ? (
          <div className="mt-8">
            <BooksList />
          </div>
        ) : null}

        {lesson.afterLab ? (
          <div className="mt-8">
            <MarkdownView markdown={lesson.afterLab} />
          </div>
        ) : null}

        {lesson.transfers.length ? (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">举一反三</h2>
            <p className="mt-1 text-sm text-muted-foreground">同一条原理，换一个现场。</p>
            <div className="mt-4 flex flex-col gap-3">
              {lesson.transfers.map((t) => (
                <div key={t.scene} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
                  <p className="text-[0.6875rem] font-medium tracking-wide text-subtle">场景</p>
                  <p className="mt-1 text-sm font-medium">{t.scene}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t.same}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {lesson.quizzes.length ? (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">停一下</h2>
            <div className="mt-4 flex flex-col gap-3">
              {lesson.quizzes.map((q) => (
                <QuizCard key={q.q} q={q.q} a={q.a} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => toggleAiMastered(lesson.id)}
            className={cn(
              "flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors duration-150",
              isMastered
                ? "bg-pine text-pine-foreground"
                : "bg-muted text-foreground hover:bg-sunken",
            )}
          >
            <Check className="size-4" />
            {isMastered ? "已掌握" : "标为已掌握"}
          </button>
          <div className="flex gap-2">
            {nav.prev ? (
              <Button variant="outline" asChild>
                <Link to="/ai/$lessonId" params={{ lessonId: nav.prev.id }}>
                  <ChevronLeft className="size-4" />
                  上一节
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/ai">
                  <ChevronLeft className="size-4" />
                  目录
                </Link>
              </Button>
            )}
            {nav.next ? (
              <Button asChild>
                <Link to="/ai/$lessonId" params={{ lessonId: nav.next.id }}>
                  下一节
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/ai">回到目录</Link>
              </Button>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function QuizCard({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
      <p className="text-sm font-medium">{q}</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-3 flex h-10 items-center text-sm text-primary"
      >
        {open ? "收起" : "显示解答"}
      </button>
      {open ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</p> : null}
    </div>
  );
}
