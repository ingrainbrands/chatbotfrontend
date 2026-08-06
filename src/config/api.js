import env from "./env";

export const API = {
  BASE_URL: env.API_BASE_URL,

  VERSION: env.API_VERSION,

  CHAT: "/chat",

  STREAM_CHAT: "/chat/stream",

  HEALTH: "/health",

  STATUS: "/status",

  CRAWL: "/crawl",

  RECRAWL: "/crawl/restart",

  SOURCES: "/sources",

  FEEDBACK: "/feedback",
};

export const buildUrl = (endpoint = "") => {
  return `${API.BASE_URL}${endpoint}`;
};

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default API;