export type QuestionKind = "mc" | "vf" | "discursive";

export interface Option {
  /** Chave da alternativa: "a"–"e" ou "v"/"f". */
  key: string;
  text: string;
}

export interface Question {
  /** Único em todas as matérias, com prefixo da matéria (ex.: "qs-m1-q1", "sa-c4-q27"). */
  id: string;
  /** Número da questão no material original. */
  number: number;
  kind: QuestionKind;
  /** Rótulo do material original (ex.: "Questão 1 (Múltipla escolha)"). */
  heading: string;
  prompt: string;
  options?: Option[];
  /** Chave da alternativa certa (objetivas). */
  answer?: string;
  /** Comentário do gabarito ou resposta-modelo (discursivas). */
  gabarito?: string;
  /** Objetiva que também pede justificativa escrita. */
  justification?: boolean;
}

export interface Flashcard {
  id: string;
  number: number;
  front: string;
  back: string;
}

export interface Unit {
  id: string;
  /** Usado na URL (ex.: "modulo-1", "capitulo-4"). */
  slug: string;
  number: number;
  title: string;
  intro?: string;
  study?: string;
  questions: Question[];
  flashcards: Flashcard[];
}

export interface Subject {
  id: string;
  /** Usado na URL (ex.: "seguranca-auditoria"). */
  slug: string;
  name: string;
  /** Sigla curta mostrada no selo da matéria. */
  code: string;
  professor: string;
  unitLabel: "Módulo" | "Capítulo";
  /** "derivado" = gabarito elaborado a partir dos slides, não o oficial do professor. */
  answerKey: "oficial" | "derivado";
  tone: "navy" | "green";
  units: Unit[];
}

export interface FoundQuestion {
  subject: Subject;
  unit: Unit;
  question: Question;
}
