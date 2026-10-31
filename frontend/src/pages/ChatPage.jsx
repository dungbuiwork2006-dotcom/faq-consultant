import { useState } from 'react';
import ChatMessage from '../components/ChatMessage.jsx';
import ChatInput from '../components/ChatInput.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import { sendChatMessage, getInitialSuggestions } from '../services/chatService.js';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'bot',
  text: 'Chào bạn! Mình là trợ lý ảo, hãy đặt câu hỏi hoặc chọn một gợi ý bên dưới nhé.',
  suggestions: getInitialSuggestions(),
  needsBooking: false,
};

function createId() {
  return `msg_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function ChatPage({ onRequestBooking }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [loading, setLoading] = useState(false);

  async function handleSend(text) {
    const userMessage = { id: createId(), role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const result = await sendChatMessage(text);

    const botMessage = {
      id: createId(),
      role: 'bot',
      text: result.answer,
      suggestions: result.suggestions,
      needsBooking: result.needsBooking,
    };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  }

  return (
    <section className="chat-page">
      <div className="chat-page__messages">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onSelectSuggestion={handleSend}
            onBookingClick={onRequestBooking}
            disabled={loading}
          />
        ))}
        {loading && <LoadingIndicator />}
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </section>
  );
}
