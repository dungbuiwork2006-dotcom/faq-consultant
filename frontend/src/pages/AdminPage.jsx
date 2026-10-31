import { useEffect, useState } from 'react';
import AppointmentCard from '../components/AppointmentCard.jsx';
import {
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../services/bookingService.js';
import { sortAppointmentsByDateTime } from '../utils/dateTime.js';

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ xử lý' },
  { key: 'done', label: 'Đã xử lý' },
];

export default function AdminPage() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  function handleMarkDone(id) {
    const next = updateAppointmentStatus(id, 'done');
    setAppointments(next);
  }

  function handleDelete(id) {
    const next = deleteAppointment(id);
    setAppointments(next);
  }

  const filtered = sortAppointmentsByDateTime(appointments).filter((appt) => {
    if (filter === 'all') return true;
    return appt.status === filter;
  });

  return (
    <section className="admin-page">
      <h1 className="admin-page__title">Trang quản trị lịch hẹn</h1>

      <div className="admin-page__filters">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={
              'admin-page__filter-btn' +
              (filter === item.key ? ' admin-page__filter-btn--active' : '')
            }
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="admin-page__empty">Không có lịch hẹn nào.</p>
      ) : (
        <div className="admin-page__list">
          {filtered.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              onMarkDone={handleMarkDone}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
