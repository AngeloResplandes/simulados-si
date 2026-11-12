import { Link } from "react-router-dom";
import { DesktopBar } from "../components/Chrome.js";

export function NotFound({ message = "Esta página não existe." }: { message?: string }) {
  return (
    <div className="page">
      <DesktopBar />
      <main id="conteudo" className="container stack-md empty">
        <h1 className="display display-sm">Nada por aqui</h1>
        <p className="muted">{message}</p>
        <Link to="/" className="btn btn-primary">
          Ir para as matérias
        </Link>
      </main>
    </div>
  );
}
