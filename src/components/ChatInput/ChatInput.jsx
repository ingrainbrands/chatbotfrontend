import "./ChatInput.css";
import { useCallback, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useChatContext } from "../../context/ChatContext";
import env from "../../config/env";

const MAX_LENGTH = env.MAX_MESSAGE_LENGTH || 4000;

const ChatInput = () => {
  const { input, setInput, send, loading } = useChatContext();
  const textareaRef = useRef(null);

  // Auto-resize textarea height based on content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    // Reset to 0 first so shrinking works correctly
    el.style.height = "0";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  // Refocus textarea after message sent (critical UX — was missing)
  useEffect(() => {
    if (!loading) {
      textareaRef.current?.focus();
    }
  }, [loading]);

  // Memoized send handler — prevents re-creation on every render
  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    if (trimmed.length > MAX_LENGTH) return; // Enforce max length
    send(trimmed);
    setInput("");
  }, [input, loading, send, setInput]);

  // Memoized key handler
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const charCount = input.length;
  const isOverLimit = charCount > MAX_LENGTH;
  const isEmpty = !input.trim();
  const canSend = !isEmpty && !loading && !isOverLimit;

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrap">

        <textarea
          ref={textareaRef}
          id="chat-textarea"
          className="chat-textarea"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything"
          disabled={loading}
          aria-label="Type your message"
          aria-describedby="chat-char-count"
          maxLength={MAX_LENGTH + 200} /* Soft limit UI, hard limit in handler */
          autoComplete="off"
          spellCheck="true"
        />

        {/* Character counter — only shown when approaching limit */}
        {charCount > MAX_LENGTH * 0.8 && (
          <span
            id="chat-char-count"
            className={`chat-char-count ${isOverLimit ? "over-limit" : ""}`}
            aria-live="polite"
          >
            {charCount}/{MAX_LENGTH}
          </span>
        )}


        <button
          className="send-btn"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          type="button"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;