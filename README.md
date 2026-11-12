# Simulados SI

App de estudo para as matérias do curso de Sistemas de Informação: questões com gabarito comentado, explicação da IA e flashcards. Feito para o celular, funciona também no desktop, com tema claro e escuro.

Matérias atuais:

| Matéria | Unidades | Questões | Flashcards | Gabarito |
|---|---|---|---|---|
| Segurança e Auditoria de Sistemas | 6 capítulos | 50 | 62 | elaborado a partir dos slides (não oficial) |
| Qualidade de Software | 4 módulos | 31 | 43 | oficial dos simulados |

O material de aula de cada matéria (slides, listas, simulados) fica em `docs/materias/`, só na máquina local: a pasta está no `.gitignore`. O app não lê esses arquivos; o conteúdo já está em `src/content/`.

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://127.0.0.1:3000/`. Para a explicação da IA funcionar localmente, copie `.env.example` para `.env` e preencha `OPENAI_API_KEY`. O próprio servidor do Vite atende `POST /api/explain`.

Outros comandos:

```bash
npm test          # Vitest: conteúdo, progresso e API de explicação
npm run typecheck # TypeScript
npm run build     # build de produção em dist/
```

## Estrutura

- `src/content/` — uma matéria por arquivo (`seguranca-auditoria.ts`, `qualidade-software.ts`), tipos em `types.ts` e a lista em `index.ts`.
- `src/screens/` — Início, Matéria, sessão de questões, resultado e flashcards.
- `src/store/progress.ts` — progresso salvo no navegador (`localStorage`), contagem por unidade e lista de erradas. Migra o progresso da versão antiga.
- `api/explain.ts` + `lib/` — função serverless que monta o prompt a partir do conteúdo oficial e chama a OpenAI. A chave fica só no servidor.

## Adicionar uma matéria

1. Crie `src/content/<slug>.ts` exportando um `Subject` (veja `types.ts`). Os ids das questões e fichas começam com o `id` da matéria (ex.: `bd-c1-q1`).
2. Inclua a matéria na lista `subjects` em `src/content/index.ts`.
3. Rode `npm test`: o teste de conteúdo confere ids únicos, respostas que existem entre as alternativas e flashcards em toda unidade.

Se o gabarito não for o oficial do professor, use `answerKey: "derivado"`: o app mostra o aviso e a IA é informada.

## Deploy na Vercel

1. Importe o repositório na Vercel. O `vercel.json` já define o preset Vite e o redirecionamento das rotas para o `index.html`.
2. Em Settings → Environment Variables, defina `OPENAI_API_KEY` (obrigatória) e, se quiser, `OPENAI_MODEL` (padrão `gpt-4o-mini`).
3. Publique.

Não coloque a chave no código nem no Git.
