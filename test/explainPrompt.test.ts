import { test } from "vitest";
import assert from "node:assert/strict";
import { subjects, findQuestion } from "../src/content/index.js";
import { buildMessages, buildSystemPrompt, MAX_DRAFT_LENGTH } from "../lib/explainPrompt.js";

function found(id: string) {
  const result = findQuestion(subjects, id);
  assert.ok(result, `questão ${id} não encontrada`);
  return result;
}

test("findQuestion returns subject, unit and question for a known id", () => {
  const result = found("qs-m1-q1");
  assert.equal(result.subject.slug, "qualidade-software");
  assert.equal(result.unit.number, 1);
  assert.equal(result.question.answer, "b");
  assert.equal(result.question.kind, "mc");
});

test("findQuestion returns null for unknown ids and for flashcards", () => {
  assert.equal(findQuestion(subjects, "nao-existe"), null);
  assert.equal(findQuestion(subjects, "qs-m1-f1"), null);
  assert.equal(findQuestion(subjects, "sa-c1-f1"), null);
});

test("system prompt names the subject and keeps the tutoring rules", () => {
  const prompt = buildSystemPrompt(found("qs-m1-q1").subject);
  assert.match(prompt, /disciplina Qualidade de Software/);
  assert.match(prompt, /portugu[eê]s/i);
  assert.match(prompt, /2.{0,6}4 frases/i);
  assert.match(prompt, /gabarito/i);
  assert.match(prompt, /n[aã]o invente/i);
  assert.match(prompt, /s[oó] a letra/i);
  assert.doesNotMatch(prompt, /slides/);
});

test("system prompt for Segurança says the key was derived from the slides", () => {
  const prompt = buildSystemPrompt(found("sa-c4-q38").subject);
  assert.match(prompt, /disciplina Segurança e Auditoria de Sistemas/);
  assert.match(prompt, /a partir dos slides/);
});

test("buildMessages for a wrong objective answer includes subject, unit, options, key and pick", () => {
  const messages = buildMessages(found("qs-m1-q1"), { selected: "a", draft: "" });
  assert.equal(messages[0].role, "system");
  assert.equal(messages[1].role, "user");
  const user = messages[1].content;
  assert.match(user, /Matéria: Qualidade de Software/);
  assert.match(user, /Módulo 1: Fundamentos de Qualidade/);
  assert.match(user, /Tipo: mc/);
  assert.match(user, /emissão de boletos/);
  assert.match(user, /a\) Alta, porque a funcionalidade/);
  assert.match(user, /Gabarito oficial: b/);
  assert.match(user, /Resposta do estudante: alternativa a/);
  assert.match(user, /gabarito oficial é só a chave/i);
});

test("buildMessages for a Segurança question carries the slide-based comment", () => {
  const user = buildMessages(found("sa-c4-q38"), { selected: "d" })[1].content;
  assert.match(user, /Capítulo 4: Controles Internos e Avaliação/);
  assert.match(user, /Gabarito oficial: e/);
  assert.match(user, /Texto do gabarito: Valor monetário esperado/);
  assert.doesNotMatch(user, /só a chave/);
});

test("buildMessages for true/false includes the student mark and justification", () => {
  const user = buildMessages(found("qs-m1-q4"), { selected: "f", draft: "acho falso" })[1].content;
  assert.match(user, /Tipo: vf/);
  assert.match(user, /v\) Verdadeiro/);
  assert.match(user, /Resposta do estudante: alternativa f/);
  assert.match(user, /Justificativa do estudante: acho falso/);
});

test("buildMessages for discursive comments on the draft, or notes there is none", () => {
  const withText = buildMessages(found("qs-m1-q2"), { draft: "Erro é o if errado." })[1].content;
  assert.match(withText, /Tipo: discursive/);
  assert.match(withText, /Texto do gabarito: Erro = engano humano/);
  assert.match(withText, /Resposta do estudante: Erro é o if errado\./);
  assert.doesNotMatch(withText, /alternativa /);
  const empty = buildMessages(found("qs-m1-q2"), { draft: "   " })[1].content;
  assert.match(empty, /Resposta do estudante: \(sem resposta escrita\)/);
});

test("MAX_DRAFT_LENGTH is 2000", () => {
  assert.equal(MAX_DRAFT_LENGTH, 2000);
});
