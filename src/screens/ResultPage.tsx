import { Link, useNavigate, useParams } from "react-router-dom";
import { findSubject, findUnit } from "../content/index.js";
import type { Subject, Unit } from "../content/types.js";
import { BackLink, ThemeToggle } from "../components/Chrome.js";
import { StudyFrame } from "../components/StudyFrame.js";
import { getAnswer, isCorrect, isObjective, isWrong, type LocatedQuestion } from "../store/progress.js";
import { progressStore, useProgress } from "../store/useProgress.js";
import { reviewItems } from "./QuestionSession.js";
import { NotFound } from "./NotFound.js";

interface ResultProps {
  subject: Subject;
  unit?: Unit;
  items: LocatedQuestion[];
  basePath: string;
  eyebrow: string;
  heading: string;
}

function Result({ subject, unit, items, basePath, eyebrow, heading }: ResultProps) {
  const data = useProgress();
  const navigate = useNavigate();
  const objective = items.filter((item) => isObjective(item.question));
  const correct = objective.filter((item) => isCorrect(item.question, getAnswer(data, item.question.id))).length;
  const wrong = items.filter((item) => isWrong(item.question, getAnswer(data, item.question.id)));
  const discursive = items.length - objective.length;
  const pct = objective.length ? Math.round((correct / objective.length) * 100) : 0;

  function reviewWrong() {
    progressStore.startReview(
      subject.slug,
      wrong.map((item) => item.question.id)
    );
    navigate(`/${subject.slug}/revisar`);
  }

  function redo() {
    progressStore.resetAnswers(items.map((item) => item.question.id));
    navigate(`${basePath}?n=1`);
  }

  return (
    <StudyFrame
      subject={subject}
      activeUnit={unit}
      crumbs={[{ label: subject.name, to: `/${subject.slug}` }, { label: "Resultado" }]}
    >
      <header className="mobile-bar">
        <BackLink to={`/${subject.slug}`}>{subject.unitLabel}s</BackLink>
        <ThemeToggle />
      </header>
      <main id="conteudo" className="session-main result stack-md" tabIndex={-1}>
        <div className="stack-xs">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display display-sm">{heading}</h1>
        </div>

        {objective.length > 0 && (
          <div className="score">
            <span className="score-num">{correct}</span>
            <span className="score-of">
              de {objective.length} {correct === 1 ? "certa" : "certas"}
            </span>
            <span className="score-pct">{pct}%</span>
          </div>
        )}
        {discursive > 0 && (
          <p className="muted small">
            {discursive === 1 ? "1 discursiva" : `${discursive} discursivas`}: compare a sua resposta com o gabarito.
          </p>
        )}

        <section className="stack-sm" aria-labelledby="por-questao">
          <h2 id="por-questao" className="eyebrow">
            Questão a questão
          </h2>
          <ol className="result-grid">
            {items.map((item, i) => {
              const answer = getAnswer(data, item.question.id);
              const state = isCorrect(item.question, answer)
                ? "is-right"
                : isWrong(item.question, answer)
                  ? "is-wrong"
                  : answer.revealed
                    ? "is-done"
                    : "is-open";
              const status =
                state === "is-right" ? "certa" : state === "is-wrong" ? "errada" : state === "is-done" ? "conferida" : "não respondida";
              return (
                <li key={item.question.id}>
                  <Link to={`${basePath}?n=${i + 1}`} className={`result-cell ${state}`} aria-label={`Questão ${item.question.number}, ${status}`}>
                    {item.question.number}
                  </Link>
                </li>
              );
            })}
          </ol>
          <p className="small muted">Verde: certa · Vermelho: errada · Toque num número para rever a questão.</p>
        </section>
      </main>

      <nav className="action-bar action-bar-stack" aria-label="Próximos passos">
        {wrong.length > 0 && (
          <button type="button" className="btn btn-primary" onClick={reviewWrong}>
            {wrong.length === 1 ? "Revisar a errada" : `Revisar as ${wrong.length} erradas`}
          </button>
        )}
        <div className="action-row">
          <button type="button" className={wrong.length ? "btn btn-line" : "btn btn-primary"} onClick={redo}>
            Refazer {unit ? subject.unitLabel.toLowerCase() : "revisão"}
          </button>
          {unit ? (
            <Link to={`/${subject.slug}/${unit.slug}/flashcards`} className="btn btn-line">
              Ver flashcards
            </Link>
          ) : (
            <Link to={`/${subject.slug}`} className="btn btn-line">
              Voltar à matéria
            </Link>
          )}
        </div>
      </nav>
    </StudyFrame>
  );
}

export function UnitResult() {
  const params = useParams();
  const subject = findSubject(params.subject);
  const unit = findUnit(subject, params.unit);
  const data = useProgress();
  if (!subject || !unit || !unit.questions.length) return <NotFound />;
  const items = unit.questions.map((question) => ({ unit, question }));
  const allChecked = items.every((item) => getAnswer(data, item.question.id).revealed);
  return (
    <Result
      subject={subject}
      unit={unit}
      items={items}
      basePath={`/${subject.slug}/${unit.slug}/questoes`}
      eyebrow={`${subject.unitLabel} ${unit.number} ${allChecked ? "concluído" : "· resultado parcial"}`}
      heading={unit.title}
    />
  );
}

export function ReviewResult() {
  const params = useParams();
  const subject = findSubject(params.subject);
  const data = useProgress();
  if (!subject) return <NotFound />;
  const items = reviewItems(subject, data.review[subject.slug] || []);
  if (!items.length) return <NotFound message="Não há revisão em andamento nesta matéria." />;
  return (
    <Result
      subject={subject}
      items={items}
      basePath={`/${subject.slug}/revisar`}
      eyebrow="Revisão das erradas"
      heading={subject.name}
    />
  );
}
