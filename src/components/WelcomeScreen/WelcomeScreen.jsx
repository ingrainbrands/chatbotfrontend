import "./WelcomeScreen.css";
import { useCallback } from "react";
import { useChatContext } from "../../context/ChatContext";
import {
  Globe,
  Phone,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Zap,
} from "lucide-react";

const QUICK_QUESTIONS = [
  { icon: Globe,       category: "Overview", question: "What does this website offer?",  color: "#3b82f6" },
  { icon: Sparkles,    category: "Features", question: "What are the main features?",     color: "#f59e0b" },
  { icon: Zap,         category: "Pricing",  question: "What are the pricing plans?",     color: "#ec4899" },
  { icon: Phone,       category: "Contact",  question: "How can I contact you?",          color: "#8b5cf6" },
  { icon: HelpCircle,  category: "Support",  question: "How do I get started?",           color: "#14b8a6" },
  { icon: ShieldCheck, category: "Trust",    question: "Is my data safe and private?",    color: "#22c55e" },
];

const QuestionCard = ({ icon: Icon, category, question, color, onSend }) => {
  const handleClick = useCallback(() => onSend(question), [onSend, question]);

  return (
    <button
      className="quick-q-card square-shape"
      onClick={handleClick}
      style={{ "--card-accent": color }}
      aria-label={`Ask: ${question}`}
      title={question}
      type="button"
      role="listitem"
    >
      <div className="qcard-icon" style={{ color }} aria-hidden="true">
        <Icon size={20} strokeWidth={2} />
      </div>
      <span className="qcard-category">{category}</span>
    </button>
  );
};

const WelcomeScreen = () => {
  const { send } = useChatContext();

  const handleSend = useCallback((q) => send(q), [send]);

  return (
    <main className="welcome fade-in" aria-label="Chat welcome screen">
      <div className="welcome-hero">
        <h1 className="welcome-title">How can I help you today?</h1>
        <p className="welcome-subtitle">Ask anything about Iryax Global products, pricing, or services</p>
      </div>

      <section className="quick-questions-section" aria-label="Suggested questions">
        <div className="quick-q-grid square-grid" role="list" aria-label="Suggested questions">
          {QUICK_QUESTIONS.map((q) => (
            <QuestionCard key={q.category} {...q} onSend={handleSend} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default WelcomeScreen;