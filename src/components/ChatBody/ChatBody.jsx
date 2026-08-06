import "./ChatBody.css";
import { Fragment, useRef, useEffect } from "react";
import { useChatContext } from "../../context/ChatContext";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";

const ChatBody = () => {
  const { messages, loading } = useChatContext();
  const bottomRef = useRef(null);
  const messagesRef = useRef(null);

  // Bug fix: scroll to bottom on every message change AND when loading state changes
  useEffect(() => {
    // Use requestAnimationFrame to scroll AFTER the DOM has painted
    const raf = requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    return () => cancelAnimationFrame(raf);
  }, [messages, loading]);

  return (
    <div className="chat-body" aria-label="Chat conversation">
      {/* Fix: role="log" + aria-live="polite" — screen readers announce new messages */}
      <div
        className="chat-messages"
        ref={messagesRef}
        role="log"
        aria-live="polite"
        aria-label="Message history"
        aria-relevant="additions"
      >
        {messages.length === 0 && !loading ? (
          <WelcomeScreen />
        ) : (
          <>
            {messages.map((msg) => (
              // Bug fix: key on Fragment — previously key was on Fragment but
              // msg.id is now guaranteed unique from generateId()
              <Fragment key={msg.id}>
                <ChatMessage message={msg} />
              </Fragment>
            ))}
            {/* Bug fix: stable key for loading indicator — prevents remount flicker */}
            {loading && <ChatMessage key="__loading__" loading />}
            <div ref={bottomRef} style={{ height: 1 }} />
          </>
        )}
      </div>
      <div className="chat-input-area">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatBody;