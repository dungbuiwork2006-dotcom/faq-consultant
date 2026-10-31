import QuestionSuggestions from './QuestionSuggestions.jsx';

export default function ChatMessage({ message, onSelectSuggestion, onBookingClick, disabled }) {
  const isUser = message.role === 'user';

  return (
    <div className={'chat-message' + (isUser ? ' chat-message--user' : ' chat-message--bot')}>
      <div className="chat-message__bubble">{message.text}</div>

      {!isUser && message.suggestions && message.suggestions.length > 0 && (
        <QuestionSuggestions
          suggestions={message.suggestions}
          onSelect={onSelectSuggestion}
          disabled={disabled}
        />
      )}

      {!isUser && message.needsBooking && (
        <button type="button" className="chat-message__booking-btn" onClick={onBookingClick}>
          Đặt lịch tư vấn
        </button>
      )}
    </div>
  );
}
