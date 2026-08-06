import "./ChatMessage.css";
import { memo } from "react";
import MessageBubble from "../MessageBubble/MessageBubble";
import TypingIndicator from "../TypingIndicator/TypingIndicator";

const ChatMessage = ({ message, loading = false }) => {
  if (loading && !message) return <TypingIndicator />;
  return <MessageBubble message={message} />;
};

export default memo(ChatMessage);