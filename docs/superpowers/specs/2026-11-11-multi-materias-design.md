# Simulados SI — várias matérias e redesign acadêmico

Data: 2026-11-11

## Objetivo

Transformar o app de estudo, que era só de Qualidade de Software, numa plataforma para várias matérias de Sistemas de Informação. A primeira matéria nova é Segurança e Auditoria de Sistemas (capítulos 1 a 6 e a lista de 50 questões). O design foi refeito com foco acadêmico e no uso pelo celular.

## Decisões

- **Stack:** Vite + React + TypeScript. Testes com Vitest. A função `api/explain.ts` continua na Vercel.
- **Gabarito de Segurança:** a lista não tem gabarito, então ele foi deduzido dos slides, com um comentário curto por questão. O app avisa que não é o oficial (`answerKey: "derivado"`), e o prompt da IA também.
- **Material novo:** flashcards por capítulo, escritos a partir dos slides (7 a 13 por capítulo). O capítulo 3 não tem questões na lista e fica só com flashcards. Não há resumos.
- **Tema:** claro e escuro. Segue o sistema e tem um botão de alternar (`localStorage` `si-tema`).
- **Recursos:** progresso por unidade e "Revisar erradas". Não há simulado geral nem busca.
- **Design:** mockups aprovados no Claude Design (artifact "Simulados SI — mockups"): papel quente, tinta azul-marinho, Source Serif 4 nos enunciados e Inter na interface. No celular, a barra de ações fica fixa no rodapé; no desktop, a barra lateral mostra os capítulos.

## Arquitetura

- `src/content/types.ts`: `Subject` → `Unit` → `Question` / `Flashcard`. Os ids levam o prefixo da matéria.
- `src/store/progress.ts`: um store puro e testável (`createProgressStore(storage)`). Guarda as respostas, a última visita e a lista congelada da revisão. Migra a chave antiga `qs-estudo-v1`, que tinha ids `m1-q1`, para `qs-m1-q1`.
- Rotas: `/`, `/:materia`, `/:materia/:unidade/questoes[?n=]`, `/:materia/:unidade/questoes/resultado`, `/:materia/:unidade/flashcards[?n=]`, `/:materia/revisar[/resultado]`.
- Revisão: ao começar, a lista de erradas fica congelada. Cada questão é limpa só quando é reaberta, para que quem sair no meio não perca as erradas ainda não refeitas.
- IA: `lib/explainHandler.ts` mantém o limite por IP, o tamanho máximo da resposta, a nova tentativa ajustando parâmetros e a regra de ignorar o gabarito enviado pelo cliente. O prompt de sistema traz o nome da matéria.

## Verificação

- `npm test` cobre conteúdo (ids, respostas, contagens), progresso (contagem, erradas, migração, armazenamento) e API (handler e prompt).
- `npm run build` (typecheck + build).
- Navegador no celular (375 px) e no desktop (1280 px), nos dois temas: questão, conferir, explicação da IA real, revisar erradas, resultado, flashcards (toque, teclado e deslize).
