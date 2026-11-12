import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { findSubject, findUnit, unitName } from "../content/index.js";
import { Icon } from "../components/Icon.js";
import { ProgressBar } from "../components/Chrome.js";
import { StudyFrame } from "../components/StudyFrame.js";
import { Inline } from "../lib/RichText.js";
import { progressStore } from "../store/useProgress.js";
import { NotFound } from "./NotFound.js";

const SWIPE = 60;

export function FlashcardSession() {
  const params = useParams();
  const subject = findSubject(params.subject);
  const unit = findUnit(subject, params.unit);
  const [search, setSearch] = useSearchParams();
  const [flipped, setFlipped] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const cards = unit?.flashcards || [];
  const raw = Number.parseInt(search.get("n") || "1", 10);
  const index = Number.isFinite(raw) ? Math.min(Math.max(raw - 1, 0), Math.max(cards.length - 1, 0)) : 0;
  const card = cards[index];

  // Ficha nova sempre começa pela frente (antes da pintura, para não mostrar o verso).
  const [shownIndex, setShownIndex] = useState(index);
  if (shownIndex !== index) {
    setShownIndex(index);
    setFlipped(false);
  }

  useEffect(() => {
    if (subject && unit) progressStore.setLast({ subject: subject.slug, unit: unit.slug, mode: "flashcards", index });
  }, [index, subject, unit]);

  function go(step: number) {
    const next = index + step;
    if (next < 0 || next >= cards.length) return;
    setSearch({ n: String(next + 1) }, { replace: true });
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("textarea, input")) return;
      const onControl = !!target?.closest("button, a");
      if ((event.key === " " || event.key === "Enter") && !onControl) {
        event.preventDefault();
        setFlipped((value) => !value);
      } else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!subject || !unit || !card) return <NotFound />;

  function onPointerDown(event: PointerEvent) {
    start.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
  }

  function onPointerUp(event: PointerEvent) {
    const from = start.current;
    start.current = null;
    if (!from) return;
    const dx = event.clientX - from.x;
    const dy = event.clientY - from.y;
    if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiped.current = true;
      go(dx < 0 ? 1 : -1);
    }
  }

  function onCardClick() {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    setFlipped((value) => !value);
  }

  const last = index === cards.length - 1;

  return (
    <StudyFrame
      subject={subject}
      activeUnit={unit}
      crumbs={[{ label: subject.name, to: `/${subject.slug}` }, { label: `${unitName(subject, unit)} · Flashcards` }]}
    >
      <header className="session-bar">
        <div className="session-row">
          <Link to={`/${subject.slug}`} className="icon-btn icon-btn-plain" aria-label="Sair e voltar para a matéria">
            <Icon name="close" />
          </Link>
          <div className="session-titles">
            <span className="small muted">
              {unitName(subject, unit)} · Flashcards
            </span>
            <span className="session-title">
              Ficha {index + 1} <span className="muted regular">de {cards.length}</span>
            </span>
          </div>
        </div>
        <div className="session-progress">
          <ProgressBar value={index + 1} max={cards.length} label="Posição nas fichas" />
        </div>
      </header>

      <main id="conteudo" className="session-main flash-main" tabIndex={-1}>
        <div className="flash-scene" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (start.current = null)}>
          <button
            key={card.id}
            type="button"
            className={flipped ? "flash-card is-flipped" : "flash-card"}
            aria-pressed={flipped}
            aria-label={flipped ? "Ficha virada, mostrando o verso. Toque para ver a frente." : "Toque para ver o verso"}
            onClick={onCardClick}
          >
            <span className="flash-face flash-front" aria-hidden={flipped}>
              <span className="eyebrow accent">Frente</span>
              <span className="flash-text flash-question">
                <Inline text={card.front} />
              </span>
              <span className="flash-hint small muted">
                <Icon name="flip" size={18} strokeWidth={1.8} />
                Toque para ver o verso
              </span>
            </span>
            <span className="flash-face flash-back" aria-hidden={!flipped}>
              <span className="eyebrow accent">Verso</span>
              <span className="flash-text">
                <Inline text={card.back} />
              </span>
              <span className="flash-hint small muted">
                <Icon name="flip" size={18} strokeWidth={1.8} />
                Toque para voltar à frente
              </span>
            </span>
          </button>
        </div>
        <p className="small muted center swipe-hint">Deslize para o lado para trocar de ficha</p>
        {last && flipped && (
          <p className="center">
            <Link to={`/${subject.slug}`} className="text-link">
              Terminou as fichas · voltar aos {subject.unitLabel.toLowerCase()}s
            </Link>
          </p>
        )}
      </main>

      <nav className="action-bar" aria-label="Ações do flashcard">
        <button type="button" className="icon-btn icon-btn-lg" onClick={() => go(-1)} disabled={index === 0} aria-label="Ficha anterior">
          <Icon name="back" />
        </button>
        <button type="button" className="btn btn-primary btn-grow" onClick={() => setFlipped((value) => !value)}>
          Virar
        </button>
        <button type="button" className="icon-btn icon-btn-lg" onClick={() => go(1)} disabled={last} aria-label="Próxima ficha">
          <Icon name="forward" />
        </button>
      </nav>
    </StudyFrame>
  );
}
