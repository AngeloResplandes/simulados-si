import type { IncomingMessage } from "node:http";
import type { Subject } from "../src/content/types.js";
import { findQuestion } from "../src/content/index.js";
import { buildMessages, MAX_DRAFT_LENGTH, type ChatMessage } from "./explainPrompt.js";

export const RATE_LIMIT = 30;
export const WINDOW_MS = 60 * 60 * 1000;
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export interface ExplainRequest {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
  body?: unknown;
  [Symbol.asyncIterator]?: IncomingMessage[typeof Symbol.asyncIterator];
}

export interface ExplainResponse {
  status(code: number): ExplainResponse;
  json(body: unknown): unknown;
}

type FetchLike = (
  url: string,
  init: { method: string; headers: Record<string, string>; body: string }
) => Promise<{ ok: boolean; status?: number; json(): Promise<any> }>;

export interface HandlerOptions {
  subjects: Subject[];
  fetchImpl: FetchLike;
  getApiKey: () => string | undefined;
  getModel?: () => string | undefined;
  now?: () => number;
  buckets?: Map<string, number[]>;
  limit?: number;
  windowMs?: number;
}

function clientIp(req: ExplainRequest): string {
  const forwarded = req.headers?.["x-forwarded-for"];
  const first = String(Array.isArray(forwarded) ? forwarded[0] : forwarded || "")
    .split(",")[0]
    .trim();
  return first || req.socket?.remoteAddress || "unknown";
}

function allowRequest(ip: string, buckets: Map<string, number[]>, now: number, windowMs: number, limit: number) {
  const hits = (buckets.get(ip) || []).filter((stamp) => now - stamp < windowMs);
  if (hits.length >= limit) {
    buckets.set(ip, hits);
    return false;
  }
  hits.push(now);
  buckets.set(ip, hits);
  return true;
}

async function readStream(req: ExplainRequest): Promise<string> {
  const iterate = req[Symbol.asyncIterator];
  if (typeof iterate !== "function") return "";
  const chunks: Buffer[] = [];
  for await (const chunk of req as AsyncIterable<Buffer | string>) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

async function readJsonBody(req: ExplainRequest): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body as Record<string, unknown>;
  }
  const raw = typeof req.body === "string" ? req.body : await readStream(req);
  if (!raw) return {};
  return JSON.parse(raw);
}

export function buildChatPayload(model: string | undefined, messages: ChatMessage[]) {
  const name = String(model || "gpt-4o-mini");
  const payload: Record<string, unknown> = { model: name, messages };
  if (/gpt-5|gpt-6|o1|o3|o4|luna|reason/i.test(name)) {
    payload.max_completion_tokens = 320;
  } else {
    payload.temperature = 0.3;
    payload.max_tokens = 320;
  }
  return payload;
}

function explanationFrom(data: any): string {
  return String(data?.choices?.[0]?.message?.content || "").trim();
}

function adaptPayloadFromError(payload: Record<string, unknown>, message: string) {
  const next = { ...payload };
  if (/max_tokens/i.test(message) && /max_completion_tokens/i.test(message)) {
    delete next.max_tokens;
    next.max_completion_tokens = 320;
  }
  if (/temperature/i.test(message)) delete next.temperature;
  return next;
}

async function requestChat(fetchImpl: FetchLike, apiKey: string, payload: Record<string, unknown>) {
  const response = await fetchImpl(OPENAI_URL, {
    method: "POST",
    headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

export function createHandler(options: HandlerOptions) {
  const { subjects, fetchImpl, getApiKey } = options;
  const getModel = options.getModel || (() => "gpt-4o-mini");
  const now = options.now || (() => Date.now());
  const buckets = options.buckets || new Map<string, number[]>();
  const limit = options.limit || RATE_LIMIT;
  const windowMs = options.windowMs || WINDOW_MS;

  return async function handler(req: ExplainRequest, res: ExplainResponse) {
    if (req.method !== "POST") {
      res.status(405).json({ error: "method_not_allowed" });
      return;
    }
    if (!allowRequest(clientIp(req), buckets, now(), windowMs, limit)) {
      res.status(429).json({ error: "rate_limited" });
      return;
    }

    let body: Record<string, unknown>;
    try {
      body = await readJsonBody(req);
    } catch {
      res.status(400).json({ error: "invalid_request" });
      return;
    }

    const questionId = typeof body?.questionId === "string" ? body.questionId.trim() : "";
    const selected = body?.selected != null ? String(body.selected) : "";
    const draft = body?.draft != null ? String(body.draft) : "";

    if (!questionId) {
      res.status(400).json({ error: "invalid_request" });
      return;
    }
    if (draft.length > MAX_DRAFT_LENGTH) {
      res.status(400).json({ error: "draft_too_long" });
      return;
    }

    const found = findQuestion(subjects, questionId);
    if (!found) {
      res.status(404).json({ error: "question_not_found" });
      return;
    }

    const apiKey = String(getApiKey() || "").trim();
    if (!apiKey) {
      res.status(503).json({ error: "unavailable" });
      return;
    }

    const messages = buildMessages(found, { selected, draft });
    try {
      let payload = buildChatPayload(getModel() || "gpt-4o-mini", messages);
      let { response, data } = await requestChat(fetchImpl, apiKey, payload);
      let explanation = explanationFrom(data);
      if (!response.ok) {
        const retried = adaptPayloadFromError(payload, String(data?.error?.message || ""));
        if (JSON.stringify(retried) !== JSON.stringify(payload)) {
          payload = retried;
          ({ response, data } = await requestChat(fetchImpl, apiKey, payload));
          explanation = explanationFrom(data);
        }
      }
      if (!response.ok || !explanation) {
        res.status(502).json({ error: "upstream_error" });
        return;
      }
      res.status(200).json({ explanation });
    } catch {
      res.status(502).json({ error: "upstream_error" });
    }
  };
}
