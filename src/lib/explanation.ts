import type { Question } from "../content/types.js";
import { answerKey, getAnswer, type AnswerState } from "../store/progress.js";
import { progressStore } from "../store/useProgress.js";

const EXPLAIN_API = "/api/explain";
const pending = new Map<string, string>();

/** Pede a explicação da IA para a resposta conferida, uma vez por resposta. */
export function requestExplanation(question: Question, answer: AnswerState) {
  if (!answer.revealed) return;
  const key = answerKey(answer);
  if (answer.ai && answer.ai.key === key && answer.ai.status !== "loading") return;
  if (pending.get(question.id) === key) return;
  pending.set(question.id, key);
  progressStore.setAnswer(question.id, { ai: { key, status: "loading", text: "" } });

  const stillCurrent = () => getAnswer(progressStore.getSnapshot(), question.id).ai?.key === key;

  fetch(EXPLAIN_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId: question.id, selected: answer.selected || "", draft: answer.draft || "" })
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })).catch(() => ({ ok: false, data: {} })))
    .then(({ ok, data }) => {
      if (!stillCurrent()) return;
      if (!ok || !data?.explanation) throw new Error("explain failed");
      progressStore.setAnswer(question.id, { ai: { key, status: "ready", text: String(data.explanation) } });
    })
    .catch(() => {
      if (stillCurrent()) progressStore.setAnswer(question.id, { ai: { key, status: "error", text: "" } });
    })
    .finally(() => {
      if (pending.get(question.id) === key) pending.delete(question.id);
    });
}

export function retryExplanation(question: Question) {
  pending.delete(question.id);
  const answer = getAnswer(progressStore.getSnapshot(), question.id);
  const fresh = { ...answer, ai: undefined };
  progressStore.setAnswer(question.id, { ai: undefined });
  requestExplanation(question, fresh);
}
