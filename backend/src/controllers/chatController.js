import { defaultSuggestions } from "../data/faqKnowledge.js";
import { paraphraseVerifiedAnswer } from "../services/geminiService.js";
import { isConsultationQuestion, matchFaq } from "../utils/matchFaq.js";
import { buildChatResponse } from "../utils/responseBuilder.js";

const UNKNOWN_IN_SCOPE_ANSWER =
  "Hiện kho FAQ chưa có thông tin đã được nhóm xác minh để trả lời câu hỏi này. Bạn có thể đặt lịch tư vấn để được hỗ trợ trực tiếp.";

const OUT_OF_SCOPE_ANSWER =
  "Chatbot này chỉ hỗ trợ tra cứu FAQ đã xác minh về dự án và nội dung tư vấn, đặt lịch. Mình chưa thể trả lời câu hỏi ngoài phạm vi đó.";

export async function postChat(req, res, next) {
  const message = req.body?.message;
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Trường message bắt buộc là chuỗi không rỗng." });
  }
  if (message.trim().length > 2000) {
    return res.status(400).json({ error: "message không được dài quá 2000 ký tự." });
  }

  try {
    const faq = matchFaq(message.trim());
    if (faq) {
      const aiAnswer = await paraphraseVerifiedAnswer({
        question: message.trim(),
        verifiedAnswer: faq.answer,
      });
      return res.json(buildChatResponse({
        answer: aiAnswer || faq.answer,
        suggestions: faq.suggestions,
      }));
    }

    if (isConsultationQuestion(message)) {
      return res.json(buildChatResponse({
        answer: UNKNOWN_IN_SCOPE_ANSWER,
        suggestions: defaultSuggestions,
        needsBooking: true,
      }));
    }

    return res.json(buildChatResponse({
      answer: OUT_OF_SCOPE_ANSWER,
      suggestions: defaultSuggestions,
    }));
  } catch (error) {
    // Keep request content and credentials out of server logs.
    console.error("Chat request failed unexpectedly.");
    return next(error);
  }
}

