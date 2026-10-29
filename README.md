\# FAQ Chatbot \& Consultation Booking



\## 1. Thông tin dự án



\- \*\*Tên dự án:\*\* FAQ Chatbot \& Đặt lịch tư vấn

\- \*\*Mã bài:\*\* Đề 4

\- \*\*Nhóm:\*\* \[Tên hoặc số nhóm]

\- \*\*Thành viên:\*\*

&#x20; - \[Thành viên A] — Front-end

&#x20; - \[Thành viên B] — Back-end

\- \*\*Repository:\*\* \[URL GitHub của nhóm]

\- \*\*Trạng thái:\*\* Đang phát triển



\## 2. Mục tiêu



Xây dựng chatbot hỗ trợ người dùng tra cứu các câu hỏi thường gặp (FAQ), nhận câu trả lời được diễn đạt tự nhiên bằng AI và gợi ý các câu hỏi liên quan.



Khi chatbot không có đủ thông tin để trả lời đáng tin cậy, hệ thống thông báo rõ giới hạn và đề xuất người dùng đặt lịch tư vấn.



\## 3. Công nghệ sử dụng



| Thành phần | Công nghệ |

|---|---|

| Front-end | React, Vite, JavaScript, CSS |

| Back-end | Node.js, Express |

| AI | Gemini API |

| Lưu lịch hẹn bản demo | Browser localStorage |

| Quản lý mã nguồn | Git, GitHub |

| Công cụ hỗ trợ phát triển | VS Code, OpenAI Codex |



\## 4. Cấu trúc dự án



```text

faq-consultation-chatbot/

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── assets/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── services/

│   │   ├── data/

│   │   ├── utils/

│   │   ├── styles/

│   │   ├── App.jsx

│   │   └── main.jsx

│   ├── .env.example

│   ├── package.json

│   └── vite.config.js

├── backend/

│   ├── src/

│   │   ├── routes/

│   │   ├── controllers/

│   │   ├── services/

│   │   ├── data/

│   │   ├── utils/

│   │   ├── app.js

│   │   └── server.js

│   ├── .env.example

│   └── package.json

├── docs/

│   ├── TEST\_CASES.md

│   ├── AI\_USAGE.md

│   ├── API\_CONTRACT.md

│   └── screenshots/

├── AGENTS.md

├── .gitignore

└── README.md

```



Các file được tạo dần trong quá trình phát triển. Cấu trúc thực tế cần được cập nhật khi dự án hoàn thiện.



\## 5. Chức năng dự kiến



\### 5.1. Chatbot FAQ

\- Nhận câu hỏi từ người dùng.

\- Tra cứu kho FAQ đã được nhóm xác minh.

\- Sử dụng AI để diễn đạt lại câu trả lời dựa trên thông tin đã duyệt.

\- Gợi ý ba câu hỏi liên quan sau câu trả lời.

\- Thông báo khi chưa có đủ thông tin đáng tin cậy.



\### 5.2. Đặt lịch tư vấn

\- Thu thập họ tên, số điện thoại, ngày và giờ tư vấn.

\- Kiểm tra dữ liệu bắt buộc và định dạng đầu vào.

\- Thông báo kết quả đặt lịch.

\- Lưu lịch hẹn bằng localStorage trên trình duyệt.



\### 5.3. Trang quản trị

\- Hiển thị danh sách lịch hẹn được lưu trên cùng trình duyệt.

\- Hiển thị thông tin và trạng thái lịch hẹn.

\- Cho phép xóa lịch đã xử lý.



Lưu ý: localStorage chỉ lưu dữ liệu trong trình duyệt hiện tại, không tự đồng bộ giữa các thiết bị.



\## 6. Yêu cầu môi trường



Cài đặt:

\- Node.js tương thích với phiên bản Vite sử dụng.

\- npm.

\- Git.

\- Visual Studio Code.

\- Tiện ích Codex nếu sử dụng trong quy trình phát triển.



Kiểm tra phiên bản:



```bash

git --version

node -v

npm -v

```



Nếu sử dụng PowerShell trên Windows và gặp lỗi thực thi `npm.ps1`, có thể thử `npm.cmd -v`.



\## 7. Cách cài đặt và chạy dự án



\### Bước 1: Clone repository



```bash

git clone \[URL\_GITHUB\_CUA\_NHOM]

cd faq-consultation-chatbot

```



Thay `\[URL\_GITHUB\_CUA\_NHOM]` bằng URL repository thực tế.



\### Bước 2: Cài đặt và chạy Front-end



```bash

cd frontend

npm install

npm run dev

```



Mở địa chỉ local do Vite hiển thị trong Terminal, thường là `http://localhost:5173`.



\### Bước 3: Cài đặt và chạy Back-end



Mở một Terminal khác:



```bash

cd backend

npm install

```



Tạo file `.env` dựa trên `.env.example`, sau đó điền các biến môi trường cần thiết.



Chạy server bằng script đã được cấu hình trong `backend/package.json`, ví dụ:



```bash

npm run dev

```



Địa chỉ backend dự kiến là `http://localhost:3000`, nếu nhóm cấu hình cổng 3000.



\### Bước 4: Kiểm tra server



Khi đã triển khai endpoint kiểm tra sức khỏe:



```text

GET http://localhost:3000/api/health

```



Kết quả dự kiến:



```json

{

&#x20; "status": "ok"

}

```



\### Bước 5: Kiểm tra chatbot



\- Gửi một câu hỏi có trong kho FAQ.

\- Kiểm tra nội dung trả lời và ba câu hỏi gợi ý.

\- Thử câu hỏi chưa có thông tin.

\- Kiểm tra lời mời đặt lịch và luồng gửi form.



Các lệnh và endpoint trên là hướng dẫn mục tiêu; cần đối chiếu với cấu hình thực tế của repository.



\## 8. Biến môi trường và bảo mật



Ví dụ `backend/.env.example`:



```dotenv

PORT=3000

GEMINI\_API\_KEY=your\_api\_key\_here

```



Ví dụ `frontend/.env.example` nếu cần cấu hình URL backend:



```dotenv

VITE\_API\_BASE\_URL=http://localhost:3000

```



Nguyên tắc:

\- Không commit file `.env`.

\- Không đưa API key vào mã nguồn front-end.

\- Không đăng API key hoặc mật khẩu trong README, ảnh chụp màn hình hay video demo.

\- Chỉ sử dụng các biến môi trường mà ứng dụng thực sự cần.



\## 9. API contract



\### GET /api/health



Kiểm tra trạng thái backend.



\### POST /api/chat



Request:



```json

{

&#x20; "message": "Câu hỏi của người dùng"

}

```



Response dự kiến:



```json

{

&#x20; "answer": "Nội dung câu trả lời",

&#x20; "suggestions": \[

&#x20;   "Câu hỏi gợi ý 1",

&#x20;   "Câu hỏi gợi ý 2",

&#x20;   "Câu hỏi gợi ý 3"

&#x20; ],

&#x20; "needsBooking": false

}

```



Quy ước:

\- `answer`: câu trả lời hoặc thông báo chưa đủ thông tin.

\- `suggestions`: ba câu hỏi liên quan.

\- `needsBooking`: xác định có nên đề xuất đặt lịch tư vấn hay không.



Nhóm cần cập nhật `docs/API\_CONTRACT.md` nếu cấu trúc API thay đổi.



\## 10. Phân công thành viên



\### Thành viên A — Front-end

\- Xây dựng giao diện chatbot.

\- Hiển thị câu trả lời và câu hỏi gợi ý.

\- Xây dựng form đặt lịch.

\- Lưu và hiển thị lịch hẹn trong localStorage.

\- Xây dựng trang quản trị.

\- Kiểm thử giao diện và luồng người dùng.



\### Thành viên B — Back-end

\- Xây dựng Express server và API.

\- Chuẩn bị kho kiến thức FAQ.

\- Xử lý truy vấn FAQ và tích hợp Gemini.

\- Xử lý câu hỏi chưa có thông tin.

\- Kiểm tra dữ liệu đầu vào và xử lý lỗi.

\- Kiểm thử API và bảo vệ thông tin xác thực.



\### Công việc chung

\- Thống nhất API contract.

\- Review và merge Pull Request.

\- Kiểm thử tích hợp.

\- Hoàn thiện README, test case, video demo và minh chứng sử dụng AI.



\## 11. Kiểm thử



Các test case được lưu tại `docs/TEST\_CASES.md`.



Nhóm cần kiểm tra tối thiểu:

\- Câu hỏi FAQ hợp lệ.

\- Hiển thị ba câu hỏi gợi ý.

\- Thiếu họ tên hoặc số điện thoại.

\- Số điện thoại không hợp lệ.

\- Câu hỏi ngoài phạm vi hoặc chưa có thông tin.

\- Lỗi kết nối backend hoặc dịch vụ AI.

\- Dữ liệu lịch hẹn sau khi tải lại trang.

\- Trang quản trị và thao tác xóa lịch đã xử lý.



Kết quả từng test case phải ghi đúng kết quả thực tế, trạng thái Pass/Fail và minh chứng khi cần. Không đánh dấu Pass trước khi kiểm tra.



\## 12. Sử dụng AI trong phát triển



Nhóm sử dụng OpenAI Codex để hỗ trợ:

\- Tạo cấu trúc file và thành phần giao diện.

\- Hỗ trợ triển khai logic và API.

\- Phân tích lỗi và đề xuất sửa lỗi.

\- Hỗ trợ viết tài liệu và test case.



Nhóm chịu trách nhiệm kiểm tra, hiểu và xác nhận các thay đổi do AI đề xuất.



Minh chứng sử dụng AI được lưu tại `docs/AI\_USAGE.md` theo yêu cầu của bài tập.



\## 13. Giới hạn hiện tại



\- FAQ chỉ bao phủ nội dung đã được nhóm xây dựng và xác minh.

\- AI có thể gặp lỗi hoặc không khả dụng khi hết hạn mức API hay mất kết nối.

\- localStorage không đồng bộ lịch hẹn giữa các thiết bị.

\- Trang quản trị bản demo chưa phải hệ thống quản trị an toàn cho triển khai thực tế.

\- Các giới hạn khác sẽ được cập nhật sau khi kiểm thử.



\## 14. Tài liệu tham khảo



\- React: https://react.dev/

\- Vite: https://vite.dev/

\- Node.js: https://nodejs.org/

\- Express: https://expressjs.com/

\- Gemini API: https://ai.google.dev/gemini-api/docs

\- Git: https://git-scm.com/doc

\- GitHub: https://docs.github.com/

\- OpenAI Codex: https://developers.openai.com/codex/



\## 15. Trạng thái bàn giao



\- \[ ] Front-end hoạt động.

\- \[ ] Back-end hoạt động.

\- \[ ] Chatbot và API đã tích hợp.

\- \[ ] Form đặt lịch và trang admin hoạt động.

\- \[ ] Test case đã chạy và ghi kết quả.

\- \[ ] README được cập nhật theo sản phẩm thực tế.

\- \[ ] Video demo tối đa 2 phút.

\- \[ ] Minh chứng sử dụng AI đã chuẩn bị.

\- \[ ] Repository không chứa API key hoặc mật khẩu.



