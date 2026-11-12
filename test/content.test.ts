import { describe, test } from "vitest";
import assert from "node:assert/strict";
import { subjects, findSubject } from "../src/content/index.js";

describe("conteúdo das matérias", () => {
  test("ids são únicos entre todas as matérias", () => {
    const ids = new Set<string>();
    for (const subject of subjects) {
      for (const unit of subject.units) {
        for (const item of [...unit.questions, ...unit.flashcards]) {
          assert.ok(!ids.has(item.id), `id repetido: ${item.id}`);
          ids.add(item.id);
          assert.ok(item.id.startsWith(subject.id + "-"), `${item.id} sem prefixo ${subject.id}`);
        }
      }
    }
  });

  test("slugs de matéria e de unidade são únicos", () => {
    assert.equal(new Set(subjects.map((s) => s.slug)).size, subjects.length);
    for (const subject of subjects) {
      assert.equal(new Set(subject.units.map((u) => u.slug)).size, subject.units.length);
    }
  });

  test("toda objetiva tem alternativas e a resposta existe entre elas", () => {
    for (const subject of subjects) {
      for (const unit of subject.units) {
        for (const q of unit.questions) {
          assert.ok(q.prompt.trim(), `${q.id} sem enunciado`);
          if (q.kind === "discursive") {
            assert.ok(q.gabarito?.trim(), `${q.id} discursiva sem gabarito`);
            continue;
          }
          assert.ok(q.options && q.options.length >= 2, `${q.id} sem alternativas`);
          assert.ok(q.answer, `${q.id} sem resposta`);
          assert.ok(q.options.some((o) => o.key === q.answer), `${q.id}: resposta ${q.answer} fora das alternativas`);
          assert.equal(new Set(q.options.map((o) => o.key)).size, q.options.length, `${q.id} com chave repetida`);
        }
      }
    }
  });

  test("toda unidade tem flashcards com frente e verso", () => {
    for (const subject of subjects) {
      for (const unit of subject.units) {
        assert.ok(unit.flashcards.length > 0, `${unit.id} sem flashcards`);
        for (const card of unit.flashcards) assert.ok(card.front.trim() && card.back.trim(), `${card.id} vazio`);
      }
    }
  });

  test("Qualidade de Software mantém 31 questões e 43 flashcards", () => {
    const qs = findSubject("qualidade-software");
    assert.ok(qs);
    assert.equal(qs.units.length, 4);
    assert.equal(qs.units.reduce((n, u) => n + u.questions.length, 0), 31);
    assert.equal(qs.units.reduce((n, u) => n + u.flashcards.length, 0), 43);
    assert.equal(qs.answerKey, "oficial");
  });

  test("Segurança e Auditoria tem as 50 questões da lista, numeradas de 1 a 50, em 6 capítulos", () => {
    const sa = findSubject("seguranca-auditoria");
    assert.ok(sa);
    assert.equal(sa.units.length, 6);
    assert.equal(sa.answerKey, "derivado");
    const numbers = sa.units.flatMap((u) => u.questions.map((q) => q.number));
    assert.deepEqual(numbers, Array.from({ length: 50 }, (_, i) => i + 1));
    for (const q of sa.units.flatMap((u) => u.questions)) {
      assert.equal(q.options?.length, 5, `${q.id} deveria ter 5 alternativas`);
      assert.ok(q.gabarito && q.gabarito.length > 20, `${q.id} sem comentário do gabarito`);
    }
  });

  test("respostas de Segurança conferidas à mão em questões de cálculo e de conceito", () => {
    const sa = findSubject("seguranca-auditoria")!;
    const byNumber = new Map(sa.units.flatMap((u) => u.questions).map((q) => [q.number, q]));
    assert.equal(byNumber.get(38)?.answer, "e"); // 20% × R$ 15.000 = R$ 3.000
    assert.match(byNumber.get(38)!.options!.find((o) => o.key === "e")!.text, /3\.000/);
    assert.equal(byNumber.get(8)?.answer, "e"); // Governança, riscos e conformidade
    assert.equal(byNumber.get(24)?.answer, "e"); // Segregação de funções
  });
});
