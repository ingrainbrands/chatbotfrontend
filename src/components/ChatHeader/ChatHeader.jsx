import "./ChatHeader.css";
import { Sun, Moon, Trash2, X } from "lucide-react";
import LogoIcon from "../LogoIcon/LogoIcon";
import { useChatContext } from "../../context/ChatContext";

const ChatHeader = () => {
  const {
    theme,
    toggleTheme,
    clearChat,
    closeWidget,
  } = useChatContext();

  return (
    <header className="chat-header">
      <div className="header-left">
        <div className="header-avatar">
          <LogoIcon size={18} />
        </div>
        <div className="header-info">
          <span className="header-name">IRYAX AI</span>
          <span className="header-status">
            <span className="status-dot" />
            Online
          </span>
        </div>
      </div>

      <div className="header-actions">
        {/* Clear Chat Button */}
        <button
          className="hdr-btn"
          onClick={clearChat}
          aria-label="Clear chat"
          title="Clear chat"
        >
          <Trash2 size={16} />
        </button>

        {/* Dark / Light Mode Toggle Button */}
        <button
          className="hdr-btn"
          onClick={toggleTheme}
          aria-label="Toggle mode"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Close Button */}
        <button
          className="hdr-btn danger"
          onClick={closeWidget}
          aria-label="Close"
          title="Close"
        >
          <X size={16} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;