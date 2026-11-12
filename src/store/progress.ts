import type { Question, Subject, Unit } from "../content/types.js";

export const STORAGE_KEY = "si-progresso-v2";
export const LEGACY_KEY = "qs-estudo-v1";

export interface AiState {
  /** Resposta que gerou a explicação; se a resposta mudar, a explicação é refeita. */
  key: string;
  status: "loading" | "ready" | "error";
  text: string;
}

export interface AnswerState {
  selected: string;
  draft: string;
  revealed: boolean;
  ai?: AiState;
}

export type StudyMode = "questoes" | "flashcards";

export interface LastVisit {
  subject: string;
  unit: string;
  mode: StudyMode;
  index: number;
}

export interface ProgressData {
  v: 2;
  answers: Record<string, AnswerState>;
  last?: LastVisit;
  /** Lista congelada de questões em revisão, por matéria (não muda enquanto se revisa). */
  review: Record<string, string[]>;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const EMPTY_ANSWER: AnswerState = { selected: "", draft: "", revealed: false };

export function emptyProgress(): ProgressData {
  return { v: 2, answers: {}, review: {} };
}

export function isObjective(question: Question): boolean {
  return question.kind === "mc" || question.kind === "vf";
}

export function getAnswer(data: ProgressData, id: string): AnswerState {
  return data.answers[id] || EMPTY_ANSWER;
}

export function isCorrect(question: Question, answer: AnswerState): boolean {
  return isObjective(question) && answer.revealed && answer.selected === question.answer;
}

export function isWrong(question: Question, answer: AnswerState): boolean {
  return isObjective(question) && answer.revealed && answer.selected !== question.answer;
}

/** Chave da resposta para o cache da explicação da IA. */
export function answerKey(answer: Pick<AnswerState, "selected" | "draft">): string {
  return "v2\n" + String(answer.selected || "") + "\n" + String(answer.draft || "");
}

export interface Progress {
  total: number;
  checked: number;
  correct: number;
  wrong: number;
}

export function unitProgress(unit: Unit, data: ProgressData): Progress {
  const result: Progress = { total: unit.questions.length, checked: 0, correct: 0, wrong: 0 };
  for (const question of unit.questions) {
    const answer = getAnswer(data, question.id);
    if (!answer.revealed) continue;
    result.checked += 1;
    if (isCorrect(question, answer)) result.correct += 1;
    if (isWrong(question, answer)) result.wrong += 1;
  }
  return result;
}

export function subjectProgress(subject: Subject, data: ProgressData): Progress {
  return subject.units.reduce<Progress>(
    (sum, unit) => {
      const p = unitProgress(unit, data);
      return {
        total: sum.total + p.total,
        checked: sum.checked + p.checked,
        correct: sum.correct + p.correct,
        wrong: sum.wrong + p.wrong
      };
    },
    { total: 0, checked: 0, correct: 0, wrong: 0 }
  );
}

export interface LocatedQuestion {
  unit: Unit;
  question: Question;
}

export function wrongQuestions(subject: Subject, data: ProgressData): LocatedQuestion[] {
  const list: LocatedQuestion[] = [];
  for (const unit of subject.units) {
    for (const question of unit.questions) {
      if (isWrong(question, getAnswer(data, question.id))) list.push({ unit, question });
    }
  }
  return list;
}

/** Converte o progresso da versão antiga (só Qualidade de Software, ids "m1-q1"). */
export function migrateLegacy(raw: string | null): Record<string, AnswerState> {
  if (!raw) return {};
  try {
    const saved = JSON.parse(raw);
    const answers = saved && typeof saved.answers === "object" ? saved.answers : {};
    const out: Record<string, AnswerState> = {};
    for (const [id, value] of Object.entries<any>(answers)) {
      if (!/^m\d+-q\d+$/.test(id) || !value || typeof value !== "object") continue;
      const answer: AnswerState = {
        selected: String(value.selected || ""),
        draft: String(value.draft || ""),
        revealed: Boolean(value.revealed)
      };
      if (value.aiStatus === "ready" && value.aiExplanation && value.aiKey) {
        answer.ai = { key: String(value.aiKey), status: "ready", text: String(value.aiExplanation) };
      }
      out["qs-" + id] = answer;
    }
    return out;
  } catch {
    return {};
  }
}

export function loadProgress(storage: StorageLike | null): ProgressData {
  if (!storage) return emptyProgress();
  let data = emptyProgress();
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.v === 2) {
        data = {
          v: 2,
          answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
          review: parsed.review && typeof parsed.review === "object" ? parsed.review : {},
          ...(parsed.last ? { last: parsed.last } : {})
        };
      }
    }
    const legacy = storage.getItem(LEGACY_KEY);
    if (legacy) {
      data.answers = { ...migrateLegacy(legacy), ...data.answers };
      storage.setItem(STORAGE_KEY, JSON.stringify(data));
      storage.removeItem(LEGACY_KEY);
    }
  } catch {
    /* armazenamento indisponível: começa vazio */
  }
  return data;
}

/** Loading não é salvo: ao recarregar, a explicação é pedida de novo. */
function forStorage(data: ProgressData): ProgressData {
  const answers: Record<string, AnswerState> = {};
  for (const [id, answer] of Object.entries(data.answers)) {
    if (answer.ai?.status === "loading") {
      const { ai: _ai, ...rest } = answer;
      answers[id] = rest;
    } else {
      answers[id] = answer;
    }
  }
  return { ...data, answers };
}

export function createProgressStore(storage: StorageLike | null) {
  let data = loadProgress(storage);
  const listeners = new Set<() => void>();

  function commit(next: ProgressData) {
    data = next;
    try {
      storage?.setItem(STORAGE_KEY, JSON.stringify(forStorage(next)));
    } catch {
      /* cota cheia ou bloqueado: segue só em memória */
    }
    listeners.forEach((listener) => listener());
  }

  return {
    getSnapshot: () => data,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setAnswer(id: string, patch: Partial<AnswerState>) {
      const prev = getAnswer(data, id);
      commit({ ...data, answers: { ...data.answers, [id]: { ...prev, ...patch } } });
    },
    resetAnswers(ids: string[]) {
      const answers = { ...data.answers };
      for (const id of ids) delete answers[id];
      commit({ ...data, answers });
    },
    setLast(last: LastVisit) {
      const prev = data.last;
      if (
        prev &&
        prev.subject === last.subject &&
        prev.unit === last.unit &&
        prev.mode === last.mode &&
        prev.index === last.index
      ) {
        return;
      }
      commit({ ...data, last });
    },
    /** Congela a lista da revisão. As respostas só são limpas quando cada questão é reaberta. */
    startReview(subjectSlug: string, ids: string[]) {
      commit({ ...data, review: { ...data.review, [subjectSlug]: ids } });
    }
  };
}

export type ProgressStore = ReturnType<typeof createProgressStore>;
