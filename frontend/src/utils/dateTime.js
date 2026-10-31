// Tiện ích xử lý ngày giờ cho lịch hẹn tư vấn.

export function getTodayISODate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isSameSlot(appointment, date, time) {
  return appointment.date === date && appointment.time === time;
}

export function hasConflictingSlot(appointments, date, time, excludeId) {
  return appointments.some(
    (appt) =>
      appt.id !== excludeId &&
      appt.status !== 'done' &&
      isSameSlot(appt, date, time)
  );
}

export function formatDateDisplay(date) {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
}

export function formatDateTimeDisplay(date, time) {
  const displayDate = formatDateDisplay(date);
  return time ? `${displayDate} lúc ${time}` : displayDate;
}

export function sortAppointmentsByDateTime(appointments) {
  return [...appointments].sort((a, b) => {
    const left = `${a.date}T${a.time}`;
    const right = `${b.date}T${b.time}`;
    return left.localeCompare(right);
  });
}
