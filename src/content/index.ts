import type { FoundQuestion, Subject, Unit } from "./types.js";
import seguranca from "./seguranca-auditoria.js";
import qualidade from "./qualidade-software.js";

/** Matérias na ordem em que aparecem no Início. Para adicionar uma, crie o arquivo e inclua aqui. */
export const subjects: Subject[] = [seguranca, qualidade];

export function findSubject(slug: string | undefined): Subject | undefined {
  return subjects.find((subject) => subject.slug === slug);
}

export function findUnit(subject: Subject | undefined, slug: string | undefined): Unit | undefined {
  return subject?.units.find((unit) => unit.slug === slug);
}

export function findQuestion(list: Subject[], id: string): FoundQuestion | null {
  if (!id) return null;
  for (const subject of list) {
    for (const unit of subject.units) {
      const question = unit.questions.find((item) => item.id === id);
      if (question) return { subject, unit, question };
    }
  }
  return null;
}

export function unitName(subject: Subject, unit: Unit): string {
  const short = subject.unitLabel === "Capítulo" ? "Cap." : "Mód.";
  return `${short} ${unit.number}`;
}

export type { FoundQuestion, Subject, Unit, Question, Flashcard, Option } from "./types.js";
