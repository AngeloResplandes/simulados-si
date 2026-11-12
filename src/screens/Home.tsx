import { Link } from "react-router-dom";
import { findSubject, findUnit, subjects, unitName } from "../content/index.js";
import type { Subject } from "../content/types.js";
import { DesktopBar, ProgressBar, ThemeToggle } from "../components/Chrome.js";
import { Icon } from "../components/Icon.js";
import { subjectProgress, unitProgress, type ProgressData } from "../store/progress.js";
import { useProgress } from "../store/useProgress.js";

function ContinueCard({ data }: { data: ProgressData }) {
  const last = data.last;
  const subject = findSubject(last?.subject);
  const unit = findUnit(subject, last?.unit);
  if (!last || !subject || !unit) return null;
  const list = last.mode === "questoes" ? unit.questions : unit.flashcards;
  if (!list.length) return null;
  const index = Math.min(Math.max(0, last.index), list.length - 1);
  let detail: string;
  if (last.mode === "questoes") {
    const p = unitProgress(unit, data);
    detail = `Questão ${unit.questions[index].number} · ${p.checked} de ${p.total} respondidas`;
  } else {
    detail = `Flashcards · ficha ${index + 1} de ${list.length}`;
  }
  return (
    <Link to={`/${subject.slug}/${unit.slug}/${last.mode}?n=${index + 1}`} className="continue">
      <span className="continue-body">
        <span className="eyebrow">Continuar de onde parou</span>
        <span className="continue-title">
          {subject.name} · {unitName(subject, unit)}
        </span>
        <span className="continue-detail">{detail}</span>
      </span>
      <span className="continue-go" aria-hidden="true">
        <Icon name="forward" size={20} />
      </span>
    </Link>
  );
}

function SubjectCard({ subject, data }: { subject: Subject; data: ProgressData }) {
  const p = subjectProgress(subject, data);
  const cards = subject.units.reduce((n, unit) => n + unit.flashcards.length, 0);
  const units = subject.units.length;
  const label = subject.unitLabel === "Capítulo" ? (units === 1 ? "capítulo" : "capítulos") : units === 1 ? "módulo" : "módulos";
  return (
    <li>
      <Link to={`/${subject.slug}`} className="subject-card">
        <span className="subject-head">
          <span className={`badge badge-${subject.tone}`} aria-hidden="true">
            {subject.code}
          </span>
          <span className="subject-names">
            <span className="subject-name">{subject.name}</span>
            <span className="muted small">
              {subject.professor} · {units} {label}
            </span>
          </span>
        </span>
        <ProgressBar value={p.checked} max={p.total} tone={subject.tone === "green" ? "pass" : "accent"} label={`Progresso em ${subject.name}`} />
        <span className="subject-foot small muted">
          {p.checked > 0 ? (
            <>
              <span>
                {p.checked} de {p.total} questões
              </span>
              <span>{p.correct === 1 ? "1 certa" : `${p.correct} certas`}</span>
            </>
          ) : (
            <>
              <span>Nada respondido ainda</span>
              <span>
                {p.total} questões · {cards} fichas
              </span>
            </>
          )}
        </span>
      </Link>
    </li>
  );
}

export function Home() {
  const data = useProgress();
  return (
    <div className="page">
      <DesktopBar />
      <header className="mobile-bar">
        <span className="brand">Simulados SI</span>
        <ThemeToggle />
      </header>
      <main id="conteudo" className="container stack-lg home">
        <div className="stack-xs">
          <h1 className="display">O que vamos estudar hoje?</h1>
          <p className="muted">Escolha uma matéria do curso de Sistemas de Informação.</p>
        </div>
        <ContinueCard data={data} />
        <section className="stack-sm" aria-labelledby="materias">
          <h2 id="materias" className="eyebrow">
            Matérias
          </h2>
          <ul className="subject-list">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} data={data} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
