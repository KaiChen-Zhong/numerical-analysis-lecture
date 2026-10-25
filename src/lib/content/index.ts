import lecture from "./lecture.json";
import type { Chapter, Priority, Section } from "./types";

export type { Chapter, Priority, Section } from "./types";

export const chapters = lecture.chapters as Chapter[];

export const STUDY_CHAPTERS = chapters.filter(
  (c) => !["exlist", "mixups", "proofs"].includes(c.id),
);

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function chapterPriority(ch: Chapter): Priority {
  if (ch.priority === "out") return "out";
  if (ch.sections.length > 0 && ch.sections.every((s) => s.priority === "out")) {
    return "out";
  }
  if (ch.sections.some((s) => s.priority === "focus")) return "focus";
  if (
    ch.priority === "optional" ||
    ch.sections.some((s) => s.priority === "optional")
  ) {
    return "optional";
  }
  return "guide";
}

export function allReadableSections() {
  const list: {
    chapterId: string;
    chapterTitle: string;
    sectionId: string;
    title: string;
    priority: Priority;
  }[] = [];
  for (const ch of STUDY_CHAPTERS) {
    if (ch.intro.trim()) {
      list.push({
        chapterId: ch.id,
        chapterTitle: ch.title,
        sectionId: "intro",
        title: `${shortChapterTitle(ch)} · 章首`,
        priority: chapterPriority(ch) === "guide" ? "guide" : chapterPriority(ch),
      });
    }
    for (const s of ch.sections) {
      list.push({
        chapterId: ch.id,
        chapterTitle: ch.title,
        sectionId: s.id,
        title: s.title,
        priority: s.priority,
      });
    }
  }
  return list;
}

export function shortChapterTitle(ch: Chapter) {
  return ch.title
    .replace(/【.*?】/g, "")
    .replace(/（.*?）/g, "")
    .replace(/^第\d+章\s*/, "")
    .trim();
}

export function chapterNumberLabel(id: string) {
  if (id === "intro") return "导";
  if (id === "ch8s") return "8′";
  const m = /^ch(\d+)$/.exec(id);
  return m ? m[1] : "·";
}

export function getSection(
  chapterId: string,
  sectionId: string,
): { chapter: Chapter; section: Section | null; markdown: string; title: string } | null {
  const chapter = getChapter(chapterId);
  if (!chapter) return null;
  if (sectionId === "intro") {
    return {
      chapter,
      section: null,
      markdown: chapter.intro,
      title: chapter.title,
    };
  }
  const section = chapter.sections.find((s) => s.id === sectionId);
  if (!section) return null;
  return { chapter, section, markdown: section.markdown, title: section.title };
}

export function neighbors(chapterId: string, sectionId: string) {
  const list = allReadableSections();
  const i = list.findIndex(
    (x) => x.chapterId === chapterId && x.sectionId === sectionId,
  );
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
    index: i,
    total: list.length,
  };
}

function haystack(ch: Chapter, s: Section | null) {
  const md = s ? s.markdown : ch.intro;
  return `${ch.title}\n${s?.title ?? ""}\n${md}`.toLowerCase();
}

export function searchContent(query: string, limit = 24) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: {
    chapterId: string;
    sectionId: string;
    title: string;
    chapterTitle: string;
    snippet: string;
    priority: Priority;
  }[] = [];
  for (const item of allReadableSections()) {
    const ch = getChapter(item.chapterId);
    if (!ch) continue;
    const section =
      item.sectionId === "intro"
        ? null
        : (ch.sections.find((s) => s.id === item.sectionId) ?? null);
    const text = haystack(ch, section);
    const idx = text.indexOf(q);
    if (idx === -1) continue;
    const start = Math.max(0, idx - 18);
    const raw = text.slice(start, start + 90).replace(/\s+/g, " ");
    hits.push({
      chapterId: item.chapterId,
      sectionId: item.sectionId,
      title: item.title,
      chapterTitle: ch.title,
      snippet: (start > 0 ? "…" : "") + raw,
      priority: item.priority,
    });
    if (hits.length >= limit) break;
  }
  return hits;
}

export const OUT_OF_EXAM: Record<string, string[]> = {
  ch1: ["1.1", "1.2"],
  ch2: ["2.1", "2.2.4 追赶法", "2.3", "2.5.2", "2.6"],
  ch4: ["4.1 二分法", "4.4 非线性方程组"],
  ch5: ["全章（特征值数值方法）"],
  ch6: ["6.6 三次样条", "6.8.2 最佳均方逼近"],
  ch7: ["7.3 Romberg", "7.5 数值微分"],
  ch8: ["8.2.3 Taylor 法", "8.3.2 变步长 RK"],
  ch9: ["全章（偏微分方程差分方法）"],
};

export const CHAPTER_EXERCISES: Record<string, string> = {
  ch1: "1-3、1-4、1-8",
  ch2: "2-3、2-5、2-11、2-12、2-14、2-16、2-17、2-20",
  ch3: "3-1、3-8、3-9、3-12、3-16",
  ch4: "4-4、4-5、4-6、4-7、4-8、4-13、4-17",
  ch6: "6-2、6-3、6-4、6-8、6-9、6-10、6-12、6-16、6-17、6-18、6-26",
  ch7: "7-1、7-2、7-3、7-4、7-7、7-8、7-10、7-13、7-14",
  ch8: "8-3、8-7、8-11",
};
