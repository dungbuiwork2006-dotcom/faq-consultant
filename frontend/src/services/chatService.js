// Giao tiếp với backend chatbot (POST /api/chat), kèm chế độ giả lập
// để thử giao diện khi backend chưa chạy (VITE_USE_MOCK=true).

import { faqKnowledge, defaultSuggestions } from '../data/faq.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function findMockAnswer(message) {
  const normalizedMessage = normalize(message);
  const match = faqKnowledge.find((item) =>
    item.keywords.some((keyword) => normalizedMessage.includes(normalize(keyword)))
  );

  if (match) {
    return {
      answer: match.answer,
      suggestions: match.suggestions,
      needsBooking: false,
    };
  }

  return {
    answer:
      'Mình chưa có đủ thông tin đáng tin cậy để trả lời câu hỏi này. Bạn có thể đặt lịch tư vấn trực tiếp với trung tâm để được hỗ trợ chi tiết hơn nhé.',
    suggestions: defaultSuggestions,
    needsBooking: true,
  };
}

async function mockSendMessage(message) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return findMockAnswer(message);
}

async function realSendMessage(message) {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Backend trả về lỗi ${response.status}`);
  }

  const data = await response.json();
  return {
    answer: data.answer,
    suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
    needsBooking: Boolean(data.needsBooking),
  };
}

export async function sendChatMessage(message) {
  if (USE_MOCK) {
    return mockSendMessage(message);
  }

  try {
    return await realSendMessage(message);
  } catch (error) {
    console.error('Lỗi kết nối tới backend:', error);
    return {
      answer:
        'Không thể kết nối tới máy chủ lúc này. Bạn có thể đặt lịch tư vấn để được hỗ trợ trực tiếp.',
      suggestions: defaultSuggestions,
      needsBooking: true,
      connectionError: true,
    };
  }
}

export function getInitialSuggestions() {
  return defaultSuggestions;
}
