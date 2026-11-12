import { Link, useNavigate, useParams } from "react-router-dom";
import { findSubject } from "../content/index.js";
import type { Subject, Unit } from "../content/types.js";
import { BackLink, DerivedNotice, DesktopBar, ProgressBar, ThemeToggle } from "../components/Chrome.js";
import { Icon } from "../components/Icon.js";
import { Paragraphs } from "../lib/RichText.js";
import { unitProgress, wrongQuestions, type ProgressData } from "../store/progress.js";
import { progressStore, useProgress } from "../store/useProgress.js";
import { NotFound } from "./NotFound.js";

function UnitCard({ subject, unit, data }: { subject: Subject; unit: Unit; data: ProgressData }) {
  const p = unitProgress(unit, data);
  const base = `/${subject.slug}/${unit.slug}`;
  const cards = `${unit.flashcards.length} ${unit.flashcards.length === 1 ? "ficha" : "fichas"}`;
  const started = p.checked > 0;
  const done = p.total > 0 && p.checked === p.total;
  return (
    <li className="unit-card">
      <div className="unit-head">
        <span className="unit-num" aria-hidden="true">
          {unit.number}
        </span>
        <div className="unit-body">
          <h2 className="unit-title">
            <span className="sr-only">
              {subject.unitLabel} {unit.number}:{" "}
            </span>
            {unit.title}
          </h2>
          {started && !done && (
            <ProgressBar value={p.checked} max={p.total} label={`Progresso no ${subject.unitLabel.toLowerCase()} ${unit.number}`} />
          )}
          <p className="small muted">
            {unit.questions.length === 0 ? (
              <>Só flashcards · {cards}</>
            ) : started ? (
              <>
                {p.checked} de {p.total} questões · <span className="text-pass">{p.correct === 1 ? "1 certa" : `${p.correct} certas`}</span> · {cards}
              </>
            ) : (
              <>
                {p.total} questões · {cards} · Não iniciado
              </>
            )}
          </p>
        </div>
      </div>
      {(unit.intro || unit.study) && (
        <details className="unit-about">
          <summary>Sobre o {subject.unitLabel.toLowerCase()}</summary>
          {unit.intro && <Paragraphs text={unit.intro} className="small" />}
          {unit.study && <Paragraphs text={unit.study} className="small" />}
        </details>
      )}
      <div className="unit-actions">
        {unit.questions.length > 0 && (
          <Link to={`${base}/questoes`} className="btn btn-soft">
            {done ? "Rever questões" : started ? "Continuar questões" : "Questões"}
          </Link>
        )}
        <Link to={`${base}/flashcards`} className="btn btn-line">
          Flashcards
        </Link>
      </div>
    </li>
  );
}

export function SubjectPage() {
  const { subject: slug } = useParams();
  const subject = findSubject(slug);
  const data = useProgress();
  const navigate = useNavigate();
  if (!subject) return <NotFound />;

  const wrong = wrongQuestions(subject, data);
  const total = subject.units.reduce((n, unit) => n + unit.questions.length, 0);
  const label = subject.unitLabel === "Capítulo" ? "capítulos" : "módulos";

  function startReview() {
    progressStore.startReview(
      subject!.slug,
      wrong.map((item) => item.question.id)
    );
    navigate(`/${subject!.slug}/revisar`);
  }

  return (
    <div className="page">
      <DesktopBar crumbs={[{ label: subject.name }]} />
      <header className="mobile-bar">
        <BackLink to="/">Matérias</BackLink>
        <ThemeToggle />
      </header>
      <main id="conteudo" className="container stack-md">
        <div className="stack-xs">
          <h1 className="display display-sm">{subject.name}</h1>
          <p className="muted small">
            {subject.professor} · {total} questões · {subject.units.length} {label}
          </p>
        </div>

        {wrong.length > 0 && (
          <button type="button" className="review-card" onClick={startReview}>
            <Icon name="retry" size={22} strokeWidth={1.8} />
            <span className="review-text">
              <span className="review-title">Revisar erradas</span>
              <span className="review-detail">
                {wrong.length} {wrong.length === 1 ? "questão para refazer" : "questões para refazer"}
              </span>
            </span>
            <Icon name="forward" size={20} />
          </button>
        )}

        {subject.answerKey === "derivado" && <DerivedNotice />}

        <ol className="unit-list">
          {subject.units.map((unit) => (
            <UnitCard key={unit.id} subject={subject} unit={unit} data={data} />
          ))}
        </ol>
      </main>
    </div>
  );
}
