import { useState } from 'react';
import BookingForm from '../components/BookingForm.jsx';
import { createAppointment, getAppointments } from '../services/bookingService.js';
import { hasConflictingSlot } from '../utils/dateTime.js';

export default function BookingPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleSubmit(form, resetForm) {
    setSubmitError('');
    setSuccessMessage('');
    setSubmitting(true);

    const appointments = getAppointments();
    if (hasConflictingSlot(appointments, form.date, form.time)) {
      setSubmitError('Khung giờ này đã có người đặt, vui lòng chọn khung giờ khác.');
      setSubmitting(false);
      return;
    }

    createAppointment(form);
    setSubmitting(false);
    setSuccessMessage('Đặt lịch thành công! Trung tâm sẽ liên hệ xác nhận với bạn sớm.');
    resetForm();
  }

  return (
    <section className="booking-page">
      <h1 className="booking-page__title">Đặt lịch tư vấn</h1>
      <p className="booking-page__subtitle">
        Điền thông tin bên dưới, trung tâm sẽ liên hệ xác nhận lịch hẹn với bạn.
      </p>

      {successMessage && <p className="booking-page__success">{successMessage}</p>}

      <BookingForm onSubmit={handleSubmit} submitting={submitting} submitError={submitError} />
    </section>
  );
}
