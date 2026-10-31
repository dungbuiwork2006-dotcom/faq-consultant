import { faqKnowledge } from "../data/faqKnowledge.js";

export function normalizeText(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function matchFaq(message) {
  const normalizedMessage = normalizeText(message);
  if (!normalizedMessage) return null;

  let best = null;
  let bestScore = 0;

  for (const faq of faqKnowledge) {
    let score = 0;
    for (const pattern of faq.patterns) {
      const normalizedPattern = normalizeText(pattern);
      if (normalizedMessage === normalizedPattern) score = Math.max(score, 100);
      else if (` ${normalizedMessage} `.includes(` ${normalizedPattern} `)) {
        score = Math.max(score, 80);
      } else {
        const terms = normalizedPattern.split(" ").filter((term) => term.length > 2);
        const matchedTerms = terms.filter((term) => normalizedMessage.includes(term)).length;
        if (terms.length && matchedTerms / terms.length >= 0.72) {
          score = Math.max(score, 40 + matchedTerms / terms.length);
        }
      }
    }
    if (score > bestScore) {
      best = faq;
      bestScore = score;
    }
  }

  return bestScore >= 40 ? best : null;
}

const consultationTerms = [
  "tu van", "dat lich", "lich hen", "lich tu van", "dich vu", "chi phi", "gia", "phi",
  "thoi gian", "ho so", "lien he", "nhan vien", "chuyen gia", "quy trinh", "ho tro",
  "appointment", "consultation", "booking", "service", "price", "cost", "fee", "schedule",
];

export function isConsultationQuestion(message) {
  const normalizedMessage = ` ${normalizeText(message)} `;
  return consultationTerms.some((term) => normalizedMessage.includes(` ${normalizeText(term)} `));
}

