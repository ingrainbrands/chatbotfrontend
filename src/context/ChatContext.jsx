import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import useChat from "../hooks/useChat";
import chatService from "../services/chatService";

const ChatContext = createContext(null);

// Bug fix: read theme from localStorage immediately — prevents flash of wrong theme
const getInitialTheme = () => {
  try {
    return localStorage.getItem("chat_theme") || "dark";
  } catch {
    return "dark";
  }
};

export const ChatProvider = ({ children }) => {
  const {
    messages,
    loading,
    error,
    sessionId,
    activeWebsite,
    setActiveWebsite,
    sendMessage,
    clearChat,
  } = useChat();

  const [isOpen, setIsOpen] = useState(true);
  // Bug fix: theme initialized synchronously from localStorage — no flash
  const [theme, setTheme] = useState(getInitialTheme);
  const [input, setInput] = useState("");

  // Indexing state
  const [indexingStatus, setIndexingStatus] = useState("idle");
  const [currentWebsiteId, setCurrentWebsiteId] = useState(null);
  const pollRef = useRef(null);
  const pollCountRef = useRef(0);

  // Apply theme immediately on mount and whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Widget controls
  const openWidget = useCallback(() => setIsOpen(true), []);
  const closeWidget = useCallback(() => setIsOpen(false), []);
  const toggleWidget = useCallback(() => setIsOpen((prev) => !prev), []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("chat_theme", next);
      } catch {}
      return next;
    });
  }, []);

  // Stop polling helper
  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    pollCountRef.current = 0;
  }, []);

  // Poll crawl status
  const pollStatus = useCallback(
    async (websiteId) => {
      pollCountRef.current += 1;

      // Safety: stop after 200 polls (~10 minutes at 3s interval)
      if (pollCountRef.current > 200) {
        setIndexingStatus("failed");
        stopPolling();
        return;
      }

      try {
        const data = await chatService.getCrawlStatus(websiteId);
        const status = data.status;
        setIndexingStatus(status);
        if (status === "completed" || status === "failed") {
          stopPolling();
        }
      } catch (err) {
        if (err?.status && err.status !== 404) {
          setIndexingStatus("failed");
          stopPolling();
        }
      }
    },
    [stopPolling]
  );

  // Start indexing a website URL
  const startIndexing = useCallback(
    async (url) => {
      if (!url || !url.trim()) return;
      stopPolling();
      setIndexingStatus("crawling");
      setActiveWebsite(url.trim());
      clearChat();

      try {
        const data = await chatService.startCrawl(url.trim());
        const wid = data.website_id;
        setCurrentWebsiteId(wid);
        pollRef.current = setInterval(() => pollStatus(wid), 3000);
      } catch (err) {
        console.error("startCrawl failed:", err);
        setIndexingStatus("failed");
      }
    },
    [stopPolling, setActiveWebsite, clearChat, pollStatus]
  );

  // Clean up polling on unmount
  useEffect(() => () => stopPolling(), [stopPolling]);

  // Clear chat and reset input text
  const handleClearChat = useCallback(() => {
    clearChat();
    setInput("");
  }, [clearChat]);

  // Wrapped send — always passes active website
  const send = useCallback(
    async (message) => {
      if (!message || !message.trim()) return;
      await sendMessage(message.trim());
    },
    [sendMessage]
  );

  const value = useMemo(
    () => ({
      messages,
      loading,
      error,
      sessionId,
      input,
      setInput,
      isOpen,
      theme,
      activeWebsite,
      indexingStatus,
      currentWebsiteId,
      send,
      clearChat: handleClearChat,
      openWidget,
      closeWidget,
      toggleWidget,
      toggleTheme,
      startIndexing,
    }),
    [
      messages,
      loading,
      error,
      sessionId,
      input,
      isOpen,
      theme,
      activeWebsite,
      indexingStatus,
      currentWebsiteId,
      send,
      handleClearChat,
      openWidget,
      closeWidget,
      toggleWidget,
      toggleTheme,
      startIndexing,
    ]
  );

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used inside ChatProvider");
  return ctx;
};

export default ChatContext;