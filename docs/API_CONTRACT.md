# API Contract — Frontend ↔ Backend

Hợp đồng dùng chung giữa frontend (`frontend/src/services/chatService.js`) và
backend (`backend/src/`), dựa theo `AGENTS.md`. Backend cần tuân thủ đúng hình
dạng dữ liệu dưới đây để frontend hoạt động đúng mà không cần sửa lại.

## 1. `GET /api/health`

Kiểm tra backend đang chạy.

**Response `200 OK`:**

```json
{ "status": "ok" }
```

## 2. `POST /api/chat`

Gửi câu hỏi của người dùng, nhận câu trả lời đã được AI diễn đạt lại dựa trên
kho FAQ đã duyệt.

**Request:**

```json
{ "message": "Trung tâm làm việc giờ nào?" }
```

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `message` | `string` | Có | Câu hỏi thô của người dùng, chưa qua xử lý |

**Response `200 OK`:**

```json
{
  "answer": "Trung tâm làm việc từ 8h00 đến 17h30, từ thứ Hai đến thứ Bảy.",
  "suggestions": [
    "Phí tư vấn là bao nhiêu?",
    "Làm sao để đặt lịch tư vấn?",
    "Trung tâm có làm việc cuối tuần không?"
  ],
  "needsBooking": false
}
```

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `answer` | `string` | Có | Câu trả lời đã được AI diễn đạt lại, dựa trên thông tin đã duyệt. Không tự bịa dữ kiện. |
| `suggestions` | `string[]` | Có | Luôn gồm đúng 3 câu hỏi liên quan |
| `needsBooking` | `boolean` | Có | `true` khi kho FAQ không đủ thông tin đáng tin cậy để trả lời — frontend sẽ hiện nút "Đặt lịch tư vấn" |

**Response lỗi (bất kỳ status khác 2xx):**

Frontend coi mọi response không `ok` (status ngoài 200–299) hoặc lỗi mạng là
sự cố kết nối, và tự hiển thị thông báo dự phòng phía client — backend không
cần trả về một hình dạng lỗi cụ thể, nhưng nên trả mã lỗi HTTP phù hợp
(400 cho request sai định dạng, 500 cho lỗi server/AI).

## 3. Appointment record (dùng trong `localStorage`, phía frontend)

Bản ghi lịch hẹn hiện chỉ lưu ở `localStorage` trình duyệt
(`frontend/src/services/bookingService.js`), backend **không** cần triển khai
API đặt lịch trừ khi nhóm quyết định chuyển sang lưu phía server.

```json
{
  "id": "msg_1730000000000_abc123",
  "name": "Nguyễn Văn A",
  "phone": "0912345678",
  "date": "2026-11-05",
  "time": "14:00",
  "status": "pending",
  "note": ""
}
```

| Trường | Kiểu | Ghi chú |
|---|---|---|
| `id` | `string` | Sinh bằng `crypto.randomUUID()` (có fallback) |
| `name` | `string` | Họ tên, bắt buộc |
| `phone` | `string` | SĐT Việt Nam, regex `^(0\|\+84)(3\|5\|7\|8\|9)\d{8}$` |
| `date` | `string` | Định dạng `YYYY-MM-DD` |
| `time` | `string` | Định dạng `HH:mm` |
| `status` | `"pending" \| "done"` | Mặc định `pending` khi tạo mới |

## 4. Biến môi trường liên quan (frontend)

```bash
VITE_API_BASE_URL=http://localhost:3000   # địa chỉ gốc của backend Express
VITE_USE_MOCK=false                        # true = dùng FAQ giả lập, không gọi backend
```

Khi `VITE_USE_MOCK=true`, frontend tự trả lời dựa trên
`frontend/src/data/faq.js` và không gọi `POST /api/chat` — hữu ích để test
giao diện độc lập trước khi backend sẵn sàng.
