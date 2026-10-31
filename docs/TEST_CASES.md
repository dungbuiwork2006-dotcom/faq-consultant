# Test Cases — Frontend

Các test case dưới đây được kiểm thử thủ công trên frontend, ở chế độ giả lập
(`VITE_USE_MOCK=true`, không cần backend chạy) trừ khi ghi chú khác.

Cách chạy:

```bash
cd frontend
cp .env.example .env
# sửa .env: VITE_USE_MOCK=true
npm install
npm run dev
```

## 1. Chatbot FAQ

| # | Bước thực hiện | Kết quả mong đợi | Trạng thái |
|---|---|---|---|
| TC-01 | Mở trang Hỏi đáp lần đầu | Hiện tin nhắn chào mừng kèm 3 câu hỏi gợi ý mặc định | Pass |
| TC-02 | Gõ "giờ làm việc" và gửi | Trả lời đúng khung giờ làm việc (8h00–17h30, T2–T7), kèm 3 gợi ý liên quan | Pass |
| TC-03 | Gõ "phí tư vấn bao nhiêu" (có dấu cách, không dấu) | Vẫn khớp đúng FAQ phí tư vấn nhờ chuẩn hóa bỏ dấu (`normalize`) | Pass |
| TC-04 | Bấm vào một câu hỏi gợi ý | Câu hỏi được gửi như tin nhắn người dùng, nhận câu trả lời tương ứng | Pass |
| TC-05 | Gõ câu hỏi không có trong kho FAQ (vd: "trung tâm có chỗ đậu xe không") | Hiện thông báo chưa đủ thông tin + nút "Đặt lịch tư vấn" | Pass |
| TC-06 | Bấm nút "Đặt lịch tư vấn" trong khung chat | Chuyển sang trang Đặt lịch tư vấn | Pass |
| TC-07 | Gửi câu hỏi khi đang chờ phản hồi trước đó | Ô nhập và nút gửi bị disable, hiện `LoadingIndicator` (3 chấm nhấp nháy) trong lúc chờ | Pass |
| TC-08 | Gửi tin nhắn rỗng hoặc chỉ khoảng trắng | Nút "Gửi" bị disable, không gửi được | Pass |
| TC-09 | Tắt `VITE_USE_MOCK` (chạy với backend thật nhưng backend chưa chạy) | Hiện thông báo không thể kết nối máy chủ, kèm gợi ý đặt lịch trực tiếp (`connectionError`) | Pass — cần chạy lại khi backend hoàn thiện |

## 2. Đặt lịch tư vấn

| # | Bước thực hiện | Kết quả mong đợi | Trạng thái |
|---|---|---|---|
| TC-10 | Submit form khi để trống tất cả | Hiện lỗi validate cho từng trường bắt buộc (họ tên, SĐT, ngày, giờ) | Pass |
| TC-11 | Nhập số điện thoại sai định dạng (vd: `12345`) | Hiện lỗi "số điện thoại không hợp lệ" | Pass |
| TC-12 | Nhập số điện thoại hợp lệ dạng `09xxxxxxxx` và `+849xxxxxxxx` | Không báo lỗi | Pass |
| TC-13 | Chọn ngày/giờ trong quá khứ | Hiện lỗi "không thể chọn ngày giờ đã qua" | Pass |
| TC-14 | Điền đầy đủ và hợp lệ, bấm "Đặt lịch tư vấn" | Lưu vào `localStorage`, hiện thông báo đặt lịch thành công, form được reset | Pass |
| TC-15 | Đặt lịch trùng đúng ngày + giờ với một lịch hẹn `pending`/`done` đã có | Hiện lỗi "khung giờ này đã có người đặt", không lưu thêm | Pass |
| TC-16 | Đặt lịch trùng ngày + giờ với một lịch hẹn đã bị xóa trước đó | Đặt lịch thành công bình thường (không còn bị tính là trùng) | Pass |

## 3. Trang quản trị

| # | Bước thực hiện | Kết quả mong đợi | Trạng thái |
|---|---|---|---|
| TC-17 | Mở trang Quản trị khi chưa có lịch hẹn nào | Hiện thông báo "Không có lịch hẹn nào" | Pass |
| TC-18 | Mở trang Quản trị sau khi đã đặt vài lịch hẹn (TC-14) | Danh sách hiện thị đầy đủ, sắp xếp theo ngày giờ tăng dần | Pass |
| TC-19 | Lọc theo "Chờ xử lý" / "Đã xử lý" / "Tất cả" | Danh sách lọc đúng theo trạng thái tương ứng | Pass |
| TC-20 | Bấm "Đánh dấu đã xử lý" trên một lịch hẹn | Trạng thái chuyển sang "Đã xử lý", nút đổi thành "Xóa" | Pass |
| TC-21 | Bấm "Xóa" trên lịch hẹn đã xử lý | Lịch hẹn biến mất khỏi danh sách và khỏi `localStorage` | Pass |
| TC-22 | Tải lại trang (F5) sau khi đã có dữ liệu | Danh sách vẫn giữ nguyên nhờ đọc lại từ `localStorage` | Pass |

## 4. Kiểm thử kỹ thuật đã chạy

- `npm run build` trong `frontend/` — build thành công, không lỗi cú pháp/import.
- Test logic thủ công bằng script Node.js độc lập cho `utils/validators.js` và
  `utils/dateTime.js` trước khi đưa vào repo (xác nhận: validate đúng/sai định
  dạng số điện thoại VN, từ chối ngày giờ quá khứ, phát hiện đúng khung giờ
  trùng kể cả khi loại trừ chính lịch hẹn đang sửa).
- Từ bản này trở đi, các hàm trên có unit test tự động bằng Vitest, xem
  `frontend/src/utils/validators.test.js` và `frontend/src/utils/dateTime.test.js`.
  Chạy: `cd frontend && npm test`.

## 5. Giới hạn chưa kiểm thử được

- Luồng thật với backend (`POST /api/chat`, Gemini API) — chưa chạy được vì
  `backend/src/` chưa được triển khai (thuộc Developer B). Cần test lại toàn bộ
  mục 1 khi backend sẵn sàng.
- Chưa có test end-to-end (Cypress/Playwright) tự động cho giao diện, mới có
  unit test cho tầng logic thuần (`utils/`).
