import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./screens/Home.js";
import { SubjectPage } from "./screens/SubjectPage.js";
import { ReviewQuestions, UnitQuestions } from "./screens/QuestionSession.js";
import { ReviewResult, UnitResult } from "./screens/ResultPage.js";
import { FlashcardSession } from "./screens/FlashcardSession.js";
import { NotFound } from "./screens/NotFound.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <>
      <a className="skip" href="#conteudo">
        Ir para o conteúdo
      </a>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:subject" element={<SubjectPage />} />
        <Route path="/:subject/revisar" element={<ReviewQuestions />} />
        <Route path="/:subject/revisar/resultado" element={<ReviewResult />} />
        <Route path="/:subject/:unit/questoes" element={<UnitQuestions />} />
        <Route path="/:subject/:unit/questoes/resultado" element={<UnitResult />} />
        <Route path="/:subject/:unit/flashcards" element={<FlashcardSession />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
