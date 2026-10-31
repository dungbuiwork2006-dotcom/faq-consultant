// Kho câu hỏi thường gặp dùng cho chế độ giả lập (VITE_USE_MOCK=true)
// và để để�i ý câu hỏi ban đầu trên trang Hỏi đáp.
// Khi backend sẵn sàng, danh sách này cần khớp với kho FAQ phía backend
// (xem docs/API_CONTRACT.md).

export const faqKnowledge = [
  {
    id: 'gio-lam-viec',
    question: 'Trung tâm làm việc giờ nào?',
    answer:
      'Trung tâm tư vấn làm việc từ 8h00 đến 17h30, từ thứ Hai đến thứ Bảy. Chủ nhật và ngày lễ trung tâm nghỉ.',
    keywords: ['gio lam viec', 'gio mo cua', 'may gio', 'lam viec khi nao'],
    suggestions: [
      'Phí tư vấn là bao nhiêu?',
      'Làm sao để đặt lịch tư vấn?',
      'Trung tâm có làm việc cuối tuần không?',
    ],
  },
  {
    id: 'phi-tu-van',
    question: 'Phí tư vấn là bao nhiêu?',
    answer:
      'Buổi tư vấn đầu tiên hoàn toàn miễn phí. Từ buổi thứ hai trở đi, phí tư vấn được thông báo cụ thể tùy theo gói dịch vụ bạn lựa chọn.',
    keywords: ['phi', 'gia', 'chi phi', 'bao nhieu tien', 'mien phi'],
    suggestions: [
      'Buổi tư vấn đầu tiên có mất phí không?',
      'Làm sao để đặt lịch tư vấn?',
      'Có những gói dịch vụ nào?',
    ],
  },
  {
    id: 'dat-lich',
    question: 'Làm sao để đặt lịch tư vấn?',
    answer:
      'Bạn có thể đặt lịch tư vấn ngay trên trang "Đặt lịch tư vấn": chỉ cần nhập họ tên, số điện thoại, ngày và giờ mong muốn. Trung tâm sẽ liên hệ xác nhận với bạn trong vòng 24 giờ.',
    keywords: ['dat lich', 'hen tu van', 'book lich', 'dang ky tu van'],
    suggestions: [
      'Phí tư vấn là bao nhiêu?',
      'Tôi có thể đổi lịch hẹn không?',
      'Trung tâm làm việc giờ nào?',
    ],
  },
  {
    id: 'doi-lich',
    question: 'Tôi có thể đổi lịch hẹn không?',
    answer:
      'Được. Bạn vui lòng liên hệ trước ít nhất 12 giờ so với lịch hẹn cũ để được hỗ trợ đổi sang khung giờ khác còn trống.',
    keywords: ['doi lich', 'doi lich hen', 'huy lich', 'doi gio hen'],
    suggestions: [
      'Làm sao để đặt lịch tư vấn?',
      'Trung tâm làm việc giờ nào?',
      'Phí tư vấn là bao nhiêu?',
    ],
  },
  {
    id: 'hinh-thuc-tu-van',
    question: 'Trung tâm tư vấn trực tiếp hay online?',
    answer:
      'Trung tâm hỗ trợ cả hai hình thức: tư vấn trực tiếp tại văn phòng và tư vấn online qua Google Meet. Bạn có thể chọn hình thức phù hợp khi đặt lịch.',
    keywords: ['truc tiep', 'online', 'hinh thuc tu van', 'gap mat'],
    suggestions: [
      'Làm sao để đặt lịch tư vấn?',
      'Phí tư vấn là bao nhiêu?',
      'Tôi có thể đổi lịch hẹn không?',
    ],
  },
];

export const defaultSuggestions = [
  'Trung tâm làm việc giờ nào?',
  'Phí tư vấn là bao nhiêu?',
  'Làm sao để đặt lịch tư vấn?',
];
