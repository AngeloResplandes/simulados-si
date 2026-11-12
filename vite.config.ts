import type { IncomingMessage, ServerResponse } from "node:http";
import { loadEnv, type Plugin, type ViteDevServer } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Em desenvolvimento, monta a função serverless `api/explain.ts` no próprio
 * servidor do Vite, com o mesmo formato `res.status().json()` da Vercel.
 */
function explainApi(): Plugin {
  return {
    name: "explain-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/explain", async (req: IncomingMessage, res: ServerResponse) => {
        const mod = await server.ssrLoadModule("/api/explain.ts");
        await mod.default(req, adaptResponse(res));
      });
    }
  };
}

function adaptResponse(res: ServerResponse) {
  return {
    status(code: number) {
      res.statusCode = code;
      return this;
    },
    json(body: unknown) {
      if (!res.headersSent) res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(body));
      return this;
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of ["OPENAI_API_KEY", "OPENAI_MODEL"]) {
    if (env[key] && !process.env[key]) process.env[key] = env[key];
  }
  return {
    plugins: [react(), explainApi()],
    server: { port: Number(env.PORT) || 3000, host: "127.0.0.1" },
    test: { include: ["test/**/*.test.ts"], environment: "node" }
  };
});
