import "./ChatWidget.css";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatBody from "../ChatBody/ChatBody";
import ChatFooter from "../ChatFooter/ChatFooter";
import LogoIcon from "../LogoIcon/LogoIcon";

const ChatWidget = () => {
  return (
    <div className="chat-widget slide-up">
      <ChatHeader />
      <div className="chat-bg-watermark" aria-hidden="true">
        <LogoIcon size="100%" />
      </div>
      <ChatBody />
      <ChatFooter />
    </div>
  );
};

export default ChatWidget;