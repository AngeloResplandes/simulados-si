import { forwardRef } from "react";
import type { Question, Subject } from "../content/types.js";
import { Inline, Paragraphs } from "../lib/RichText.js";
import { retryExplanation } from "../lib/explanation.js";
import { isObjective, type AnswerState } from "../store/progress.js";
import { DerivedNotice } from "./Chrome.js";
import { Icon } from "./Icon.js";

const KIND_LABEL: Record<Question["kind"], string> = {
  mc: "Múltipla escolha",
  vf: "Verdadeiro ou falso",
  discursive: "Discursiva"
};

export function kindLabel(question: Question): string {
  const base = KIND_LABEL[question.kind];
  return question.justification ? `${base} + justificativa` : base;
}

export function needsDraft(question: Question): boolean {
  return question.kind === "discursive" || question.kind === "vf" || Boolean(question.justification);
}

interface OptionListProps {
  question: Question;
  answer: AnswerState;
  onSelect: (key: string) => void;
  describedBy?: string;
}

export function OptionList({ question, answer, onSelect, describedBy }: OptionListProps) {
  const options = question.options || [];
  const revealed = answer.revealed;
  return (
    <fieldset className="options" aria-describedby={describedBy}>
      <legend className="sr-only">Alternativas</legend>
      <div role="radiogroup" aria-label="Alternativas" className="options-list">
        {options.map((option) => {
          const checked = answer.selected === option.key;
          const right = revealed && option.key === question.answer;
          const wrong = revealed && checked && option.key !== question.answer;
          const state = right ? "is-right" : wrong ? "is-wrong" : checked ? "is-selected" : revealed ? "is-dim" : "";
          return (
            <button
              key={option.key}
              type="button"
              role="radio"
              aria-checked={checked}
              className={`option ${state}`}
              disabled={revealed}
              onClick={() => onSelect(option.key)}
            >
              <span className="option-key" aria-hidden="true">
                {right ? <Icon name="check" size={15} strokeWidth={3} /> : wrong ? <Icon name="close" size={15} strokeWidth={3} /> : option.key.toUpperCase()}
              </span>
              <span className="option-text">
                <span className="sr-only">{option.key.toUpperCase()}) </span>
                <Inline text={option.text} />
              </span>
              {right && <span className="option-tag">{checked ? "Sua resposta · Correta" : "Correta"}</span>}
              {wrong && <span className="option-tag">Sua resposta</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

interface GabaritoProps {
  subject: Subject;
  question: Question;
  answer: AnswerState;
}

export const Gabarito = forwardRef<HTMLElement, GabaritoProps>(function Gabarito({ subject, question, answer }, ref) {
  const objective = isObjective(question);
  const hit = objective && answer.selected === question.answer;
  const correct = question.options?.find((option) => option.key === question.answer);
  const comment = String(question.gabarito || "").trim();
  const bareKey = /^(v|f|[a-e])$/i.test(comment);

  return (
    <section className="gabarito" aria-live="polite" tabIndex={-1} ref={ref} aria-labelledby={`gab-${question.id}`}>
      <h2 id={`gab-${question.id}`} className="sr-only">
        Gabarito
      </h2>
      {objective ? (
        <p className={`gabarito-result ${hit ? "is-right" : "is-wrong"}`}>
          {hit ? "Resposta certa" : `Você marcou ${answer.selected.toUpperCase()} — incorreta`}
        </p>
      ) : (
        <p className="gabarito-result">Resposta esperada</p>
      )}
      {objective && !hit && correct && (
        <p className="gabarito-correct">
          <span className="label">Alternativa correta</span>
          {question.kind === "vf" ? correct.text : `${correct.key.toUpperCase()}) ${correct.text}`}
        </p>
      )}
      {comment && !bareKey && <Paragraphs text={comment} className="gabarito-text" />}
      {question.kind === "discursive" && !answer.draft.trim() && (
        <p className="muted small">Você não escreveu resposta. Compare com o texto acima.</p>
      )}
      <AiExplanation question={question} answer={answer} />
      {subject.answerKey === "derivado" && <DerivedNotice compact />}
    </section>
  );
});

function AiExplanation({ question, answer }: { question: Question; answer: AnswerState }) {
  const ai = answer.ai;
  return (
    <div className="ai">
      <h3 className="eyebrow accent">Explicação da IA</h3>
      {ai?.status === "ready" && ai.text ? (
        <Paragraphs text={ai.text} className="ai-text" />
      ) : ai?.status === "error" ? (
        <>
          <p className="muted small">Não foi possível obter a explicação. O gabarito acima continua valendo.</p>
          <button type="button" className="btn btn-quiet" onClick={() => retryExplanation(question)}>
            <Icon name="retry" size={18} strokeWidth={1.8} />
            Tentar de novo
          </button>
        </>
      ) : (
        <p className="muted small ai-loading" role="status">
          <span className="dot" aria-hidden="true" />
          Pensando na sua resposta…
        </p>
      )}
    </div>
  );
}
