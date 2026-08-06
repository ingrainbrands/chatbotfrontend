import "./TypingIndicator.css";
import LogoIcon from "../LogoIcon/LogoIcon";

const TypingIndicator = () => (
  // Fix: aria-live="polite" + aria-label so screen readers announce
  // "iG is thinking" when it appears — was completely inaccessible before
  <div
    className="typing-row fade-in"
    role="status"
    aria-live="polite"
    aria-label="iG is thinking, please wait"
  >
    <div className="typing-avatar thinking-pulse" aria-hidden="true">
      <LogoIcon size={16} />
    </div>
    <div className="typing-bubble">
      <span className="typing-label">iG is thinking...</span>
      <div className="typing-dots" aria-hidden="true">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;