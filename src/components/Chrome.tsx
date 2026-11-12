import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { toggleTheme, useTheme } from "../store/theme.js";
import { Icon } from "./Icon.js";

export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "dark" ? "claro" : "escuro";
  return (
    <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={`Mudar para tema ${next}`}>
      <Icon name={theme === "dark" ? "sun" : "moon"} size={20} strokeWidth={1.8} />
    </button>
  );
}

export interface Crumb {
  label: string;
  to?: string;
}

/** Barra superior do desktop: marca, trilha e tema. Some no celular. */
export function DesktopBar({ crumbs = [] }: { crumbs?: Crumb[] }) {
  return (
    <header className="desk-bar">
      <Link to="/" className="brand">
        Simulados SI
      </Link>
      {crumbs.length > 0 && (
        <nav aria-label="Trilha" className="crumbs">
          {crumbs.map((crumb, index) => (
            <span key={index} className="crumb">
              <span aria-hidden="true">/</span>
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <ThemeToggle />
    </header>
  );
}

export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="back-link">
      <Icon name="back" />
      {children}
    </Link>
  );
}

export function ProgressBar({ value, max, tone = "accent", label }: { value: number; max: number; tone?: "accent" | "pass"; label: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}>
      <div className={`bar-fill bar-${tone}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function DerivedNotice({ compact = false }: { compact?: boolean }) {
  return (
    <p className={compact ? "derived derived-compact" : "derived"}>
      {!compact && <Icon name="info" size={16} strokeWidth={1.8} />}
      Gabarito elaborado a partir dos slides — não é o oficial do professor.
    </p>
  );
}
