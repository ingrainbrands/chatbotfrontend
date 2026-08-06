import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/scrollbar.css";
import "./styles/animations.css";
import "./styles/markdown.css";

import { ChatProvider } from "./context/ChatContext";
import ChatWidget from "./components/ChatWidget/ChatWidget";

function App() {
  return (
    <ChatProvider>
      <ChatWidget />
    </ChatProvider>
  );
}

export default App;