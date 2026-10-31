import { describe, expect, it } from 'vitest';
import {
  validateBookingForm,
  validateDate,
  validateName,
  validateNotPast,
  validatePhone,
  validateTime,
} from './validators.js';

describe('validateName', () => {
  it('báo lỗi khi để trống', () => {
    expect(validateName('')).not.toBe('');
    expect(validateName('   ')).not.toBe('');
  });

  it('báo lỗi khi quá ngắn', () => {
    expect(validateName('A')).not.toBe('');
  });

  it('không báo lỗi với tên hợp lệ', () => {
    expect(validateName('Nguyễn Văn A')).toBe('');
  });
});

describe('validatePhone', () => {
  it('báo lỗi khi để trống', () => {
    expect(validatePhone('')).not.toBe('');
  });

  it('báo lỗi với số không đúng định dạng VN', () => {
    expect(validatePhone('12345')).not.toBe('');
    expect(validatePhone('0123456789')).not.toBe('');
    expect(validatePhone('0912345')).not.toBe('');
  });

  it('chấp nhận số di động VN hợp lệ dạng 0xxxxxxxxx', () => {
    expect(validatePhone('0912345678')).toBe('');
    expect(validatePhone('0356789012')).toBe('');
  });

  it('chấp nhận số di động VN hợp lệ dạng +84xxxxxxxxx', () => {
    expect(validatePhone('+84912345678')).toBe('');
  });
});

describe('validateDate / validateTime', () => {
  it('báo lỗi khi để trống', () => {
    expect(validateDate('')).not.toBe('');
    expect(validateTime('')).not.toBe('');
  });

  it('không báo lỗi khi có giá trị', () => {
    expect(validateDate('2099-01-01')).toBe('');
    expect(validateTime('09:00')).toBe('');
  });
});

describe('validateNotPast', () => {
  it('không báo lỗi khi thiếu ngày hoặc giờ', () => {
    expect(validateNotPast('', '')).toBe('');
    expect(validateNotPast('2099-01-01', '')).toBe('');
  });

  it('báo lỗi khi chọn thời điểm trong quá khứ', () => {
    expect(validateNotPast('2000-01-01', '10:00')).not.toBe('');
  });

  it('không báo lỗi khi chọn thời điểm trong tương lai', () => {
    expect(validateNotPast('2099-01-01', '10:00')).toBe('');
  });
});

describe('validateBookingForm', () => {
  it('isValid = false khi form trống', () => {
    const { isValid, errors } = validateBookingForm({
      name: '',
      phone: '',
      date: '',
      time: '',
    });
    expect(isValid).toBe(false);
    expect(errors.name).not.toBe('');
    expect(errors.phone).not.toBe('');
    expect(errors.date).not.toBe('');
    expect(errors.time).not.toBe('');
  });

  it('isValid = true khi form hợp lệ và trong tương lai', () => {
    const { isValid, errors } = validateBookingForm({
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      date: '2099-01-01',
      time: '10:00',
    });
    expect(isValid).toBe(true);
    expect(errors).toEqual({ name: '', phone: '', date: '', time: '' });
  });

  it('isValid = false khi ngày giờ hợp lệ định dạng nhưng đã ở quá khứ', () => {
    const { isValid, errors } = validateBookingForm({
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      date: '2000-01-01',
      time: '10:00',
    });
    expect(isValid).toBe(false);
    expect(errors.time).not.toBe('');
  });
});
