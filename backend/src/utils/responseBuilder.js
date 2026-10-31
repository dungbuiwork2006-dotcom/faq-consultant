import { defaultSuggestions } from "../data/faqKnowledge.js";

export function buildChatResponse({ answer, suggestions, needsBooking = false }) {
  const safeSuggestions = Array.isArray(suggestions)
    ? suggestions.filter((item) => typeof item === "string").slice(0, 3)
    : [];

  while (safeSuggestions.length < 3) {
    safeSuggestions.push(defaultSuggestions[safeSuggestions.length]);
  }

  return {
    answer: String(answer || ""),
    suggestions: safeSuggestions,
    needsBooking: Boolean(needsBooking),
  };
}

