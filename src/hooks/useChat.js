import { useCallback, useState } from "react";
import chatService from "../services/chatService";

const generateId = () =>
  `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const createMessage = ({ role, content, sources = [], followup_questions = [] }) => ({
  id: generateId(),
  role,
  content,
  sources,
  followup_questions,
  createdAt: Date.now(),
});

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [activeWebsite, setActiveWebsite] = useState("https://iryax.com");
  // Bug fix: track error separately so it can be shown in UI
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      if (!text || !text.trim()) return;
      setError(null);

      const userMsg = createMessage({ role: "user", content: text.trim() });
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const response = await chatService.sendMessage(
          text.trim(),
          sessionId,
          activeWebsite
        );

        // Bug fix: handle null/undefined/empty answer gracefully
        const answerText =
          response.answer ||
          response.text ||
          response.response ||
          response.reply ||
          "I received your message but got an empty response. Please try again.";

        const botMsg = createMessage({
          role: "assistant",
          content: answerText,
          sources: Array.isArray(response.sources) ? response.sources : [],
          followup_questions: Array.isArray(response.followup_questions)
            ? response.followup_questions
            : [],
        });

        setMessages((prev) => [...prev, botMsg]);

        // Bug fix: update sessionId regardless of previous value
        if (response.session_id) {
          setSessionId(response.session_id);
        }
      } catch (err) {
        const errText =
          err?.message ||
          "Unable to reach the server. Please check your connection.";
        setError(errText);
        const errMsg = createMessage({
          role: "assistant",
          content: `⚠️ ${errText}`,
        });
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setLoading(false);
      }
    },
    // Bug fix: sessionId and activeWebsite as stable deps
    [sessionId, activeWebsite]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sessionId,
    activeWebsite,
    setActiveWebsite,
    sendMessage,
    clearChat,
  };
};

export default useChat;