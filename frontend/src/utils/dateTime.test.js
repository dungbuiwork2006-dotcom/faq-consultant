import { describe, expect, it } from 'vitest';
import {
  formatDateDisplay,
  formatDateTimeDisplay,
  getTodayISODate,
  hasConflictingSlot,
  isSameSlot,
  sortAppointmentsByDateTime,
} from './dateTime.js';

describe('getTodayISODate', () => {
  it('trả về đúng định dạng YYYY-MM-DD', () => {
    expect(getTodayISODate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('isSameSlot', () => {
  it('true khi cùng ngày và giờ', () => {
    expect(isSameSlot({ date: '2099-01-01', time: '10:00' }, '2099-01-01', '10:00')).toBe(
      true
    );
  });

  it('false khi khác ngày hoặc giờ', () => {
    expect(isSameSlot({ date: '2099-01-01', time: '10:00' }, '2099-01-02', '10:00')).toBe(
      false
    );
    expect(isSameSlot({ date: '2099-01-01', time: '10:00' }, '2099-01-01', '11:00')).toBe(
      false
    );
  });
});

describe('hasConflictingSlot', () => {
  const appointments = [
    { id: '1', date: '2099-01-01', time: '10:00', status: 'pending' },
    { id: '2', date: '2099-01-02', time: '14:00', status: 'done' },
  ];

  it('true khi trùng khung giờ với lịch hẹn đang chờ xử lý', () => {
    expect(hasConflictingSlot(appointments, '2099-01-01', '10:00')).toBe(true);
  });

  it('false khi trùng khung giờ nhưng lịch hẹn đó đã xử lý xong (done)', () => {
    expect(hasConflictingSlot(appointments, '2099-01-02', '14:00')).toBe(false);
  });

  it('false khi không trùng khung giờ nào', () => {
    expect(hasConflictingSlot(appointments, '2099-03-03', '09:00')).toBe(false);
  });

  it('loại trừ đúng lịch hẹn đang sửa qua excludeId', () => {
    expect(hasConflictingSlot(appointments, '2099-01-01', '10:00', '1')).toBe(false);
  });
});

describe('formatDateDisplay / formatDateTimeDisplay', () => {
  it('định dạng ngày từ YYYY-MM-DD sang DD/MM/YYYY', () => {
    expect(formatDateDisplay('2099-01-05')).toBe('05/01/2099');
  });

  it('trả về chuỗi rỗng khi không có ngày', () => {
    expect(formatDateDisplay('')).toBe('');
  });

  it('ghép ngày và giờ hiển thị', () => {
    expect(formatDateTimeDisplay('2099-01-05', '10:00')).toBe('05/01/2099 lúc 10:00');
  });

  it('chỉ hiện ngày khi không có giờ', () => {
    expect(formatDateTimeDisplay('2099-01-05', '')).toBe('05/01/2099');
  });
});

describe('sortAppointmentsByDateTime', () => {
  it('sắp xếp tăng dần theo ngày giờ', () => {
    const input = [
      { id: 'b', date: '2099-01-02', time: '09:00' },
      { id: 'a', date: '2099-01-01', time: '10:00' },
      { id: 'c', date: '2099-01-01', time: '08:00' },
    ];
    const sorted = sortAppointmentsByDateTime(input);
    expect(sorted.map((item) => item.id)).toEqual(['c', 'a', 'b']);
  });

  it('không làm thay đổi mảng gốc', () => {
    const input = [
      { id: 'b', date: '2099-01-02', time: '09:00' },
      { id: 'a', date: '2099-01-01', time: '10:00' },
    ];
    const original = [...input];
    sortAppointmentsByDateTime(input);
    expect(input).toEqual(original);
  });
});
