import { describe, test } from "vitest";
import assert from "node:assert/strict";
import { findSubject } from "../src/content/index.js";
import {
  LEGACY_KEY,
  STORAGE_KEY,
  createProgressStore,
  migrateLegacy,
  subjectProgress,
  unitProgress,
  wrongQuestions,
  type StorageLike
} from "../src/store/progress.js";

function memoryStorage(initial: Record<string, string> = {}): StorageLike & { data: Record<string, string> } {
  const data = { ...initial };
  return {
    data,
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = value;
    },
    removeItem: (key) => {
      delete data[key];
    }
  };
}

const sa = findSubject("seguranca-auditoria")!;
const cap4 = sa.units.find((u) => u.number === 4)!;

describe("progresso", () => {
  test("conta conferidas, certas e erradas por unidade e por matéria", () => {
    const store = createProgressStore(memoryStorage());
    store.setAnswer("sa-c4-q24", { selected: "e", revealed: true });
    store.setAnswer("sa-c4-q38", { selected: "d", revealed: true });
    store.setAnswer("sa-c4-q27", { selected: "d" }); // marcada, mas não conferida
    const data = store.getSnapshot();
    assert.deepEqual(unitProgress(cap4, data), { total: 20, checked: 2, correct: 1, wrong: 1 });
    assert.deepEqual(subjectProgress(sa, data), { total: 50, checked: 2, correct: 1, wrong: 1 });
  });

  test("lista as erradas e tira da lista quando a questão é refeita", () => {
    const store = createProgressStore(memoryStorage());
    store.setAnswer("sa-c4-q38", { selected: "d", revealed: true });
    store.setAnswer("sa-c1-q2", { selected: "a", revealed: true });
    let wrong = wrongQuestions(sa, store.getSnapshot()).map((w) => w.question.id);
    assert.deepEqual(wrong, ["sa-c1-q2", "sa-c4-q38"]);

    store.startReview(sa.slug, wrong);
    assert.deepEqual(store.getSnapshot().review[sa.slug], wrong);
    // Sair da revisão no meio não perde as erradas ainda não refeitas.
    assert.equal(wrongQuestions(sa, store.getSnapshot()).length, 2);

    store.resetAnswers(["sa-c4-q38"]);
    store.setAnswer("sa-c4-q38", { selected: "e", revealed: true });
    store.setAnswer("sa-c1-q2", { selected: "b", revealed: true });
    wrong = wrongQuestions(sa, store.getSnapshot()).map((w) => w.question.id);
    assert.deepEqual(wrong, ["sa-c1-q2"]);
  });

  test("salva no armazenamento e recarrega, sem guardar explicação em andamento", () => {
    const storage = memoryStorage();
    const store = createProgressStore(storage);
    store.setAnswer("sa-c4-q38", { selected: "d", revealed: true, ai: { key: "k", status: "loading", text: "" } });
    store.setLast({ subject: sa.slug, unit: cap4.slug, mode: "questoes", index: 14 });
    const reloaded = createProgressStore(storage).getSnapshot();
    assert.equal(reloaded.answers["sa-c4-q38"].selected, "d");
    assert.equal(reloaded.answers["sa-c4-q38"].ai, undefined);
    assert.deepEqual(reloaded.last, { subject: sa.slug, unit: cap4.slug, mode: "questoes", index: 14 });
  });

  test("migra o progresso antigo de Qualidade de Software e apaga a chave antiga", () => {
    const legacy = JSON.stringify({
      moduleId: "m1",
      answers: {
        "m1-q1": { selected: "b", draft: "", revealed: true, aiStatus: "ready", aiKey: "v2\nb\n", aiExplanation: "Certo." },
        "m2-q5": { selected: "", draft: "minha resposta", revealed: false },
        lixo: { selected: "x" }
      }
    });
    const storage = memoryStorage({ [LEGACY_KEY]: legacy });
    const data = createProgressStore(storage).getSnapshot();
    assert.equal(data.answers["qs-m1-q1"].revealed, true);
    assert.deepEqual(data.answers["qs-m1-q1"].ai, { key: "v2\nb\n", status: "ready", text: "Certo." });
    assert.equal(data.answers["qs-m2-q5"].draft, "minha resposta");
    assert.equal(data.answers.lixo, undefined);
    assert.equal(storage.getItem(LEGACY_KEY), null);
    assert.ok(storage.getItem(STORAGE_KEY));
  });

  test("ignora progresso antigo corrompido", () => {
    assert.deepEqual(migrateLegacy("{não é json"), {});
    assert.deepEqual(migrateLegacy(null), {});
  });

  test("funciona sem armazenamento disponível", () => {
    const store = createProgressStore(null);
    store.setAnswer("sa-c4-q38", { selected: "e", revealed: true });
    assert.equal(store.getSnapshot().answers["sa-c4-q38"].selected, "e");
  });
});
