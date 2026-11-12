import type { FoundQuestion, Subject } from "../src/content/types.js";

export const MAX_DRAFT_LENGTH = 2000;

export function buildSystemPrompt(subject: Pick<Subject, "name" | "answerKey">): string {
  const origin =
    subject.answerKey === "derivado"
      ? " O gabarito desta matéria foi elaborado a partir dos slides da disciplina, não é o oficial do professor; trate-o como a referência, sem mencionar isso."
      : "";
  return (
    `Você é um tutor da disciplina ${subject.name}. Responda em português do Brasil, em 2 a 4 frases curtas, sem emojis. ` +
    "Use o enunciado, as alternativas e o gabarito oficial. Se o texto do gabarito for só a letra, explique mesmo assim: diga se o estudante acertou ou errou, cite a alternativa correta e justifique com o enunciado e a redação dessa alternativa. " +
    "Não invente normas, números, autores ou conceitos que não apareçam nesse material. " +
    "Objetiva: comece dizendo se acertou ou errou; se errou, diga por que a marcada falha e por que a oficial é a certa. " +
    "Discursiva: diga o que a resposta cobriu e o que faltou em relação ao texto do gabarito. " +
    "Se não houver resposta escrita, explique o gabarito e diga que o estudante não escreveu." +
    origin
  );
}

export interface ChatMessage {
  role: "system" | "user";
  content: string;
}

export function buildMessages(
  found: FoundQuestion,
  user: { selected?: string; draft?: string }
): ChatMessage[] {
  const selected = String(user?.selected || "").trim();
  const draft = String(user?.draft || "").trim();
  const { subject, unit, question } = found;
  const lines = [
    `Matéria: ${subject.name}`,
    `${subject.unitLabel} ${unit.number}: ${unit.title}`,
    `Tipo: ${question.kind}`,
    `Enunciado: ${question.prompt}`
  ];

  if (question.options?.length) {
    lines.push("Alternativas:");
    for (const option of question.options) lines.push(`${option.key}) ${option.text}`);
  }

  if (question.answer) lines.push(`Gabarito oficial: ${question.answer}`);

  const gabarito = String(question.gabarito || "").trim();
  if (gabarito) lines.push(`Texto do gabarito: ${gabarito}`);
  const keyHint = gabarito || String(question.answer || "").trim();
  if (question.kind !== "discursive" && /^(v|f|[a-e])$/i.test(keyHint)) {
    lines.push(
      "Nota: o gabarito oficial é só a chave da alternativa. Justifique com o enunciado e o texto da alternativa correta."
    );
  }

  if (question.kind === "discursive") {
    lines.push(`Resposta do estudante: ${draft || "(sem resposta escrita)"}`);
  } else {
    lines.push(`Resposta do estudante: alternativa ${selected || "(não marcada)"}`);
    if (draft) lines.push(`Justificativa do estudante: ${draft}`);
  }

  return [
    { role: "system", content: buildSystemPrompt(subject) },
    { role: "user", content: lines.join("\n") }
  ];
}
