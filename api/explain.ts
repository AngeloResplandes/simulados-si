import { subjects } from "../src/content/index.js";
import { createHandler } from "../lib/explainHandler.js";

export default createHandler({
  subjects,
  fetchImpl: (url, init) => fetch(url, init),
  getApiKey: () => process.env.OPENAI_API_KEY,
  getModel: () => process.env.OPENAI_MODEL || "gpt-4o-mini"
});
