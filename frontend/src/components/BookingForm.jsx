import { useState } from 'react';
import { validateBookingForm } from '../utils/validators.js';
import { getTodayISODate } from '../utils/dateTime.js';

const initialForm = { name: '', phone: '', date: '', time: '' };

export default function BookingForm({ onSubmit, submitting, submitError }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { isValid, errors: nextErrors } = validateBookingForm(form);
    setErrors(nextErrors);
    if (!isValid) return;

    onSubmit(form, () => {
      setForm(initialForm);
      setErrors({});
    });
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="booking-form__field">
        <label htmlFor="name">Họ và tên</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(event) => handleChange('name', event.target.value)}
        />
        {errors.name && <p className="booking-form__error">{errors.name}</p>}
      </div>

      <div className="booking-form__field">
        <label htmlFor="phone">Số điện thoại</label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(event) => handleChange('phone', event.target.value)}
        />
        {errors.phone && <p className="booking-form__error">{errors.phone}</p>}
      </div>

      <div className="booking-form__row">
        <div className="booking-form__field">
          <label htmlFor="date">Ngày tư vấn</label>
          <input
            id="date"
            type="date"
            min={getTodayISODate()}
            value={form.date}
            onChange={(event) => handleChange('date', event.target.value)}
          />
          {errors.date && <p className="booking-form__error">{errors.date}</p>}
        </div>

        <div className="booking-form__field">
          <label htmlFor="time">Giờ tư vấn</label>
          <input
            id="time"
            type="time"
            value={form.time}
            onChange={(event) => handleChange('time', event.target.value)}
          />
          {errors.time && <p className="booking-form__error">{errors.time}</p>}
        </div>
      </div>

      {submitError && <p className="booking-form__error booking-form__error--general">{submitError}</p>}

      <button type="submit" className="booking-form__submit-btn" disabled={submitting}>
        {submitting ? 'Đang gửi...' : 'Đặt lịch tư vấn'}
      </button>
    </form>
  );
}
