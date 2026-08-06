import apiClient from "./apiClient";
import API from "../config/api";

class ChatService {
  /**
   * Send a chat message and receive a complete response.
   * The backend streams NDJSON lines: {"token": "..."} per line.
   * We collect all tokens into a full answer string.
   */
  async sendMessage(message, sessionId = null, websiteId = "https://iryax.com") {
    const baseUrl = apiClient.defaults.baseURL || "";
    const response = await fetch(`${baseUrl}${API.CHAT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: message,
        message,
        website_id: websiteId,
        session_id: sessionId || "default_session",
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();

    if (contentType.includes("text/html") || text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
      throw new Error("API returned HTML instead of JSON. Check your VITE_API_BASE_URL or Nginx proxy settings.");
    }
    const lines = text.split("\n").filter((l) => l.trim());

    let answer = "";
    let sources = [];
    let followup_questions = [];
    let session_id = null;

    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        // Streaming token format: {"token": "..."}
        if (data.token !== undefined) {
          answer += data.token;
        }
        // Final object may have full answer + metadata
        if (data.answer) {
          answer = data.answer;
        }
        if (data.sources) sources = data.sources;
        if (data.followup_questions) followup_questions = data.followup_questions;
        if (data.session_id) session_id = data.session_id;
      } catch {
        // skip malformed lines
      }
    }

    return { answer: answer || null, sources, followup_questions, session_id };
  }

  /**
   * Start crawling a website URL.
   */
  async startCrawl(url, maxPages = 50, maxDepth = 3) {
    const response = await apiClient.post(API.CRAWL, {
      url,
      max_pages: maxPages,
      max_depth: maxDepth,
    });
    return response.data;
  }

  /**
   * Get crawl/indexing status for a website_id.
   * NOTE: /status uses query parameter ?website_id=...
   */
  async getCrawlStatus(websiteId) {
    const response = await apiClient.get(API.STATUS, {
      params: { website_id: websiteId },
    });
    return response.data;
  }

  /**
   * Stream chat response using Server-Sent Events.
   * Returns an async generator of {token, sources, done, error} objects.
   */
  async *streamMessage(message, sessionId = null, websiteId = "https://iryax.com") {
    const baseUrl = apiClient.defaults.baseURL || "";
    const response = await fetch(`${baseUrl}${API.STREAM_CHAT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: message,
        message,
        website_id: websiteId,
        session_id: sessionId || "default_session",
      }),
    });

    if (!response.ok) {
      throw new Error(`Stream request failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // Keep incomplete line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        try {
          const data = JSON.parse(trimmed.slice(6));
          yield data;
        } catch {
          // Skip malformed SSE lines
        }
      }
    }
  }

  /**
   * Check backend health.
   */
  async checkHealth() {
    const response = await apiClient.get("/health");
    return response.data;
  }
}

export default new ChatService();