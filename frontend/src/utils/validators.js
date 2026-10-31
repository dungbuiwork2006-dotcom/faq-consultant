// Các hàm kiểm tra dữ liệu đầu vào cho form đặt lịch tư vấn.

const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export function validateName(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) return 'Vui lòng nhập họ tên.';
  if (trimmed.length < 2) return 'Họ tên quá ngắn.';
  return '';
}

export function validatePhone(phone) {
  const trimmed = (phone || '').trim();
  if (!trimmed) return 'Vui lòng nhập số điện thoại.';
  if (!VN_PHONE_REGEX.test(trimmed)) {
    return 'Số điện thoại không hợp lệ (vui lòng nhập số di động Việt Nam).';
  }
  return '';
}

export function validateDate(date) {
  if (!date) return 'Vui lòng chọn ngày tư vấn.';
  return '';
}

export function validateTime(time) {
  if (!time) return 'Vui lòng chọn giờ tư vấn.';
  return '';
}

export function validateNotPast(date, time) {
  if (!date || !time) return '';
  const target = new Date(`${date}T${time}`);
  if (Number.isNaN(target.getTime())) return '';
  if (target.getTime() < Date.now()) {
    return 'Không thể chọn ngày giờ đã qua.';
  }
  return '';
}

export function validateBookingForm({ name, phone, date, time }) {
  const errors = {
    name: validateName(name),
    phone: validatePhone(phone),
    date: validateDate(date),
    time: validateTime(time),
  };

  if (!errors.date && !errors.time) {
    const pastError = validateNotPast(date, time);
    if (pastError) {
      errors.time = pastError;
    }
  }

  const isValid = Object.values(errors).every((message) => !message);
  return { isValid, errors };
}
