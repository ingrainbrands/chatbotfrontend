import "./MessageBubble.css";
import { memo, useState, useCallback, useEffect, useRef } from "react";
import { User, Copy, Check } from "lucide-react";
// Fix: ExternalLink was imported but NEVER used — removed dead import
import LogoIcon from "../LogoIcon/LogoIcon";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// Fix: memoised outside component — was re-creating Intl.DateTimeFormat on every render
const timeFormatter = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
});

const formatTime = (ts) => {
  if (!ts) return "";
  return timeFormatter.format(new Date(ts));
};

// Fix: remarkPlugins and rehypePlugins defined outside component
// so they are stable references — prevents ReactMarkdown from re-rendering
// unnecessarily on every parent render
const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [rehypeHighlight];

// react-markdown v10 strips non-http(s) URLs by default (tel:, mailto: become "#")
// This causes page refresh/scroll-to-top when phone numbers are clicked.
// urlTransform explicitly allows safe protocols we need.
const urlTransform = (url) => {
  if (
    url.startsWith('tel:') ||
    url.startsWith('mailto:') ||
    url.startsWith('http:') ||
    url.startsWith('https://')
  ) {
    return url;
  }
  return '#';
};

// Robust clipboard copy that works on mobile HTTP dev environments
const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";  // Avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try { document.execCommand('copy'); } catch (err) {}
  document.body.removeChild(textArea);
};

const copyToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return Promise.resolve();
  }
  return navigator.clipboard.writeText(text).catch(() => fallbackCopyTextToClipboard(text));
};

const ChatLink = ({ href, children, ...props }) => {
  const [showToast, setShowToast] = useState(false);
  const isWebUrl = href?.startsWith("http://") || href?.startsWith("https://");
  const isTel = href?.startsWith("tel:");
  const isMail = href?.startsWith("mailto:");

  const handleClick = (e) => {
    if (isTel) {
      e.preventDefault();
      e.stopPropagation();
      const phone = href.replace("tel:", "");
      copyToClipboard(phone);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  let title = undefined;
  if (isTel) title = "Click to copy phone number";
  if (isMail) title = "Click to email";

  const Component = isTel ? "span" : "a";

  return (
    <>
      <Component
        href={isTel ? undefined : href}
        target={isWebUrl ? "_blank" : undefined}
        rel={isWebUrl ? "noopener noreferrer" : undefined}
        className="chat-link"
        onClick={handleClick}
        title={title}
        style={{ cursor: "pointer" }}
        {...props}
      >
        {children}
      </Component>
      {showToast && (
        <div className="contact-toast">
          Phone number copied to clipboard.
        </div>
      )}
    </>
  );
};

const MARKDOWN_COMPONENTS = {
  a: ChatLink,
};


const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);
  // Fix: track timeout ref to clear on unmount — prevents setState on unmounted component
  const copyTimerRef = useRef(null);

  // Cleanup copy timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  // Fix: useCallback so this function is stable across re-renders
  const handleCopy = useCallback(async () => {
    if (!message?.content) return;
    try {
      // Use shared helper — has textarea execCommand fallback for HTTP/non-secure devices
      await copyToClipboard(message.content);
      setCopied(true);
      // Clear previous timer before setting new one
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Silently ignore if all methods fail
    }
  }, [message?.content]);

  // Fix: guard against undefined/null message
  if (!message) return null;

  const isBot = message.role === "assistant";
  const timeLabel = formatTime(message.createdAt);

  return (
    <div
      className={`msg-row${isBot ? " bot" : " user"}`}
      role="listitem"
    >
      {/* Avatar */}
      <div
        className={`msg-avatar ${isBot ? "bot" : "user"}`}
        aria-hidden="true"
      >
        {isBot ? <LogoIcon size={14} /> : <User size={14} />}
      </div>

      {/* Content */}
      <div className="msg-content">
        <div
          className={`msg-bubble ${isBot ? "bot" : "user"}`}
          /* Fix: proper ARIA role so screen readers treat as a chat message */
          role="article"
          aria-label={`${isBot ? "Assistant" : "You"} at ${timeLabel}`}
        >
          <div className="markdown">
            <ReactMarkdown
              remarkPlugins={REMARK_PLUGINS}
              rehypePlugins={REHYPE_PLUGINS}
              components={MARKDOWN_COMPONENTS}
              urlTransform={urlTransform}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer: timestamp + copy button */}
        <div className="msg-footer">
          <time
            className="msg-time"
            dateTime={message.createdAt ? new Date(message.createdAt).toISOString() : ""}
          >
            {timeLabel}
          </time>

          {isBot && (
            <button
              className="msg-action"
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy response"}
              aria-label={copied ? "Copied to clipboard" : "Copy response to clipboard"}
              type="button"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Fix: custom equality function — only re-render if message content/role actually changed
export default memo(MessageBubble, (prev, next) => {
  return (
    prev.message?.id === next.message?.id &&
    prev.message?.content === next.message?.content
  );
});