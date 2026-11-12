import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { findSubject, findUnit, unitName } from "../content/index.js";
import type { Subject, Unit } from "../content/types.js";
import type { Crumb } from "../components/Chrome.js";
import { Icon } from "../components/Icon.js";
import { Gabarito, OptionList, kindLabel, needsDraft } from "../components/QuestionView.js";
import { StudyFrame } from "../components/StudyFrame.js";
import { Paragraphs } from "../lib/RichText.js";
import { requestExplanation } from "../lib/explanation.js";
import { EMPTY_ANSWER, answerKey, getAnswer, isCorrect, isObjective, isWrong, type LocatedQuestion } from "../store/progress.js";
import { progressStore, useProgress } from "../store/useProgress.js";
import { NotFound } from "./NotFound.js";

const MAX_DRAFT = 2000;

function useIndex(length: number): [number, (next: number) => void] {
  const [params, setParams] = useSearchParams();
  const raw = Number.parseInt(params.get("n") || "1", 10);
  const index = Number.isFinite(raw) ? Math.min(Math.max(raw - 1, 0), Math.max(length - 1, 0)) : 0;
  return [index, (next: number) => setParams({ n: String(next + 1) }, { replace: true })];
}

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT" || el.isContentEditable);
}

interface RunnerProps {
  subject: Subject;
  items: LocatedQuestion[];
  unit?: Unit;
  basePath: string;
  exitTo: string;
  title: string;
  crumbs: Crumb[];
  review?: boolean;
}

function QuestionRunner({ subject, items, unit, basePath, exitTo, title, crumbs, review = false }: RunnerProps) {
  const data = useProgress();
  const navigate = useNavigate();
  const [index, goTo] = useIndex(items.length);
  const [notice, setNotice] = useState("");
  const gabaritoRef = useRef<HTMLElement>(null);
  const noticeRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const justChecked = useRef(false);
  const reopened = useRef(new Set<string>());

  const current = items[index];
  const question = current.question;
  // Na revisão, até o efeito abaixo limpar a resposta, mostra a questão já em branco.
  const awaitingReset = review && !reopened.current.has(question.id);
  const answer = awaitingReset ? EMPTY_ANSWER : getAnswer(data, question.id);
  const objective = isObjective(question);
  const last = index === items.length - 1;

  // Na revisão, cada questão reabre limpa (uma vez por sessão).
  useEffect(() => {
    if (!review || reopened.current.has(question.id)) return;
    reopened.current.add(question.id);
    if (getAnswer(progressStore.getSnapshot(), question.id).revealed) progressStore.resetAnswers([question.id]);
  }, [review, question.id]);

  useEffect(() => {
    setNotice("");
    if (unit) progressStore.setLast({ subject: subject.slug, unit: unit.slug, mode: "questoes", index });
  }, [index, subject.slug, unit]);

  const key = answerKey(answer);
  useEffect(() => {
    if (answer.revealed) requestExplanation(question, answer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id, answer.revealed, key, answer.ai?.status]);

  useEffect(() => {
    if (!answer.revealed || !justChecked.current) return;
    justChecked.current = false;
    const el = gabaritoRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [answer.revealed]);

  function select(optionKey: string) {
    setNotice("");
    progressStore.setAnswer(question.id, { selected: optionKey });
  }

  function check() {
    if (objective && !answer.selected) {
      setNotice("Escolha uma alternativa.");
      requestAnimationFrame(() => noticeRef.current?.focus());
      return;
    }
    setNotice("");
    justChecked.current = true;
    progressStore.setAnswer(question.id, { revealed: true });
  }

  function move(step: number) {
    const next = index + step;
    if (next < 0) return;
    if (next >= items.length) {
      navigate(`${basePath}/resultado`);
      return;
    }
    goTo(next);
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }

  function primary() {
    if (answer.revealed) move(1);
    else check();
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;
      const keyName = event.key.toLowerCase();
      if (!answer.revealed && objective && question.options?.some((o) => o.key === keyName)) {
        select(keyName);
        return;
      }
      const target = event.target as HTMLElement | null;
      const onControl = !!target?.closest("button, a, summary");
      if (event.key === "Enter" && !onControl) {
        event.preventDefault();
        primary();
      } else if (event.key === "ArrowRight") {
        move(1);
      } else if (event.key === "ArrowLeft") {
        move(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <StudyFrame subject={subject} activeUnit={unit} crumbs={crumbs}>
      <header className="session-bar">
        <div className="session-row">
          <Link to={exitTo} className="icon-btn icon-btn-plain" aria-label="Sair e voltar para a matéria">
            <Icon name="close" />
          </Link>
          <div className="session-titles">
            <span className="small muted">{title}</span>
            <span className="session-title">
              Questão {question.number}{" "}
              <span className="muted regular">
                · {index + 1} de {items.length}
              </span>
            </span>
          </div>
        </div>
        <div className="segments" aria-hidden="true">
          {items.map((item, i) => {
            const a = getAnswer(data, item.question.id);
            const state =
              i === index
                ? "is-current"
                : isCorrect(item.question, a)
                  ? "is-right"
                  : isWrong(item.question, a)
                    ? "is-wrong"
                    : a.revealed
                      ? "is-done"
                      : "";
            return <span key={item.question.id} className={`segment ${state}`} />;
          })}
        </div>
      </header>

      <main id="conteudo" ref={mainRef} tabIndex={-1} className="session-main" key={question.id}>
        <p className="eyebrow">
          {review ? `${unitName(subject, current.unit)} · ` : ""}
          {kindLabel(question)}
        </p>
        <Paragraphs text={question.prompt} className="prompt" />

        {objective && (
          <OptionList question={question} answer={answer} onSelect={select} describedBy={notice ? "notice" : undefined} />
        )}

        {needsDraft(question) && (
          <div className="draft">
            <label htmlFor="draft">{question.kind === "discursive" ? "Sua resposta" : "Justificativa (opcional)"}</label>
            <textarea
              id="draft"
              value={answer.draft}
              maxLength={MAX_DRAFT}
              disabled={answer.revealed}
              placeholder={question.kind === "discursive" ? "Escreva com suas palavras antes de conferir." : ""}
              onChange={(event) => progressStore.setAnswer(question.id, { draft: event.target.value })}
            />
          </div>
        )}

        {notice && (
          <p className="notice" id="notice" role="alert" tabIndex={-1} ref={noticeRef}>
            {notice}
          </p>
        )}

        {answer.revealed && <Gabarito ref={gabaritoRef} subject={subject} question={question} answer={answer} />}
      </main>

      <nav className="action-bar" aria-label="Ações da questão">
        <button type="button" className="icon-btn icon-btn-lg" onClick={() => move(-1)} disabled={index === 0} aria-label="Questão anterior">
          <Icon name="back" />
        </button>
        <button type="button" className="btn btn-primary btn-grow" onClick={primary}>
          {answer.revealed ? (
            <>
              {last ? "Ver resultado" : "Próxima"}
              <Icon name="forward" size={20} />
            </>
          ) : (
            "Conferir resposta"
          )}
        </button>
        {!answer.revealed && (
          <button
            type="button"
            className="icon-btn icon-btn-lg"
            onClick={() => move(1)}
            aria-label={last ? "Pular para o resultado" : "Pular para a próxima"}
          >
            <Icon name="forward" />
          </button>
        )}
      </nav>
    </StudyFrame>
  );
}

export function UnitQuestions() {
  const params = useParams();
  const subject = findSubject(params.subject);
  const unit = findUnit(subject, params.unit);
  if (!subject || !unit) return <NotFound />;
  if (!unit.questions.length) return <NotFound message="Este capítulo só tem flashcards." />;
  const items = unit.questions.map((question) => ({ unit, question }));
  return (
    <QuestionRunner
      key={unit.id}
      subject={subject}
      unit={unit}
      items={items}
      basePath={`/${subject.slug}/${unit.slug}/questoes`}
      exitTo={`/${subject.slug}`}
      title={`${unitName(subject, unit)} · ${unit.title}`}
      crumbs={[{ label: subject.name, to: `/${subject.slug}` }, { label: `${unitName(subject, unit)} · Questões` }]}
    />
  );
}

export function ReviewQuestions() {
  const params = useParams();
  const subject = findSubject(params.subject);
  const data = useProgress();
  if (!subject) return <NotFound />;
  const items = reviewItems(subject, data.review[subject.slug] || []);
  if (!items.length) {
    return <NotFound message="Não há questões erradas para revisar nesta matéria." />;
  }
  return (
    <QuestionRunner
      key={`review-${subject.slug}`}
      subject={subject}
      items={items}
      review
      basePath={`/${subject.slug}/revisar`}
      exitTo={`/${subject.slug}`}
      title="Revisão das erradas"
      crumbs={[{ label: subject.name, to: `/${subject.slug}` }, { label: "Revisar erradas" }]}
    />
  );
}

export function reviewItems(subject: Subject, ids: string[]): LocatedQuestion[] {
  const out: LocatedQuestion[] = [];
  for (const id of ids) {
    for (const unit of subject.units) {
      const question = unit.questions.find((q) => q.id === id);
      if (question) out.push({ unit, question });
    }
  }
  return out;
}
