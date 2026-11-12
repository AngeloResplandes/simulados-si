import { Fragment, type ReactNode } from "react";

/** Converte o markdown leve do conteúdo (`código`, **negrito**, *itálico*) em elementos React. */
export function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] != null) nodes.push(<code key={i++}>{match[1]}</code>);
    else if (match[2] != null) nodes.push(<strong key={i++}>{match[2]}</strong>);
    else nodes.push(<em key={i++}>{match[3]}</em>);
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Texto em parágrafos (uma linha do conteúdo = um parágrafo). */
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {text.split("\n").map((line, index) => (
        <p key={index}>{inline(line)}</p>
      ))}
    </div>
  );
}

/** Texto curto em linha, preservando quebras. */
export function Inline({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {inline(line)}
        </Fragment>
      ))}
    </>
  );
}
