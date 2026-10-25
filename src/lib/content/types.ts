export type Priority = "focus" | "optional" | "guide" | "out";

export type Section = {
  id: string;
  title: string;
  priority: Priority;
  markdown: string;
};

export type Chapter = {
  id: string;
  title: string;
  priority: Priority;
  intro: string;
  sections: Section[];
};

export type Formula = {
  id: string;
  chapterId: string;
  section: string;
  title: string;
  latex: string;
  note: string;
  priority: Priority;
};

export type Mixup = {
  id: string;
  wrong: string;
  right: string;
  chapterId: string;
};

export type ProofItem = {
  id: string;
  title: string;
  steps: string[];
  chapterId: string;
  priority: Priority;
};

export type ExerciseProblem = {
  no: string;
  markdown: string;
};

export type ExerciseItem = {
  id: string;
  chapter: string;
  chapterId: string;
  numbers: string;
  goal: string;
  problems: ExerciseProblem[];
};
