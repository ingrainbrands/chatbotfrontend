import "./FloatingButton.css";
import { MessageCircle } from "lucide-react";
import { useChatContext } from "../../context/ChatContext";
import LogoIcon from "../LogoIcon/LogoIcon";

const FloatingButton = () => {
  const { isOpen, openWidget } = useChatContext();

  // Only show the floating button when widget is closed
  if (isOpen) return null;

  return (
    <button
      className="floating-btn"
      onClick={openWidget}
      aria-label="Open Chat"
      title="Chat with iG"
    >
      <div className="floating-btn-logo">
        <LogoIcon size={22} />
      </div>
      <span className="floating-btn-ping" />
    </button>
  );
};

export default FloatingButton;