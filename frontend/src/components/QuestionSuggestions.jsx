export default function QuestionSuggestions({ suggestions, onSelect, disabled }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="question-suggestions">
      {suggestions.map((question) => (
        <button
          key={question}
          type="button"
          className="question-suggestions__chip"
          onClick={() => onSelect(question)}
          disabled={disabled}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
