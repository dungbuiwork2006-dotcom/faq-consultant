import { formatDateTimeDisplay } from '../utils/dateTime.js';

export default function AppointmentCard({ appointment, onMarkDone, onDelete }) {
  const isDone = appointment.status === 'done';

  return (
    <div className={'appointment-card' + (isDone ? ' appointment-card--done' : '')}>
      <div className="appointment-card__info">
        <p className="appointment-card__name">{appointment.name}</p>
        <p className="appointment-card__meta">{appointment.phone}</p>
        <p className="appointment-card__meta">
          {formatDateTimeDisplay(appointment.date, appointment.time)}
        </p>
      </div>

      <div className="appointment-card__actions">
        <span className={'appointment-card__badge' + (isDone ? ' appointment-card__badge--done' : '')}>
          {isDone ? 'Đã xử lý' : 'Chờ xử lý'}
        </span>

        {!isDone && (
          <button type="button" className="appointment-card__btn" onClick={() => onMarkDone(appointment.id)}>
            Đánh dấu đã xử lý
          </button>
        )}

        {isDone && (
          <button
            type="button"
            className="appointment-card__btn appointment-card__btn--danger"
            onClick={() => onDelete(appointment.id)}
          >
            Xóa
          </button>
        )}
      </div>
    </div>
  );
}
