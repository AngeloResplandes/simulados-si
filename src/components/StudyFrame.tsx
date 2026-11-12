import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import type { Subject, Unit } from "../content/types.js";
import { unitProgress, wrongQuestions } from "../store/progress.js";
import { useProgress } from "../store/useProgress.js";
import { DesktopBar, type Crumb } from "./Chrome.js";
import { Icon } from "./Icon.js";

/** Moldura das sessões: barra lateral de unidades no desktop, só o conteúdo no celular. */
export function StudyFrame({
  subject,
  activeUnit,
  crumbs,
  children
}: {
  subject: Subject;
  activeUnit?: Unit;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  const data = useProgress();
  const wrong = wrongQuestions(subject, data).length;
  return (
    <div className="page page-study">
      <DesktopBar crumbs={crumbs} />
      <div className="frame">
        <aside className="sidebar" aria-label={`${subject.unitLabel}s de ${subject.name}`}>
          <p className="eyebrow sidebar-title">{subject.unitLabel}s</p>
          <ul className="sidebar-list">
            {subject.units.map((unit) => {
              const p = unitProgress(unit, data);
              const mode = unit.questions.length ? "questoes" : "flashcards";
              return (
                <li key={unit.id}>
                  <NavLink
                    to={`/${subject.slug}/${unit.slug}/${mode}`}
                    className={() => (unit.id === activeUnit?.id ? "sidebar-link is-active" : "sidebar-link")}
                    aria-current={unit.id === activeUnit?.id ? "page" : undefined}
                  >
                    <span className="sidebar-num">{unit.number}</span>
                    <span className="sidebar-name">{unit.title}</span>
                    <span className={p.total && p.checked === p.total ? "sidebar-count is-done" : "sidebar-count"}>
                      {p.total ? `${p.checked}/${p.total}` : "fichas"}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
          {wrong > 0 && (
            <NavLink to={`/${subject.slug}/revisar`} className="review-card review-card-small">
              <Icon name="retry" size={18} strokeWidth={1.8} />
              Revisar erradas ({wrong})
            </NavLink>
          )}
        </aside>
        <div className="frame-main">{children}</div>
      </div>
    </div>
  );
}
