import { describe, it, expect } from 'vitest';
import { calcFee, cheapestOption } from '../calc-fee.js';
import { formatCurrency } from '../format.js';
import { apply_discount } from '../discount.js';

describe('calcFee', () => {
  it('phí cơ bản cho đơn nội thành nhỏ', () => {
    expect(calcFee({ subtotal: 100_000, zone: 'inner', weightKg: 1 })).toBe(30_000);
  });

  it('cộng phụ phí vùng ven', () => {
    expect(calcFee({ subtotal: 100_000, zone: 'suburb', weightKg: 1 })).toBe(45_000);
  });

  it('cộng phụ phí vùng xa', () => {
    expect(calcFee({ subtotal: 100_000, zone: 'remote', weightKg: 1 })).toBe(70_000);
  });

  // ⚠️ TÌNH HUỐNG 2 — xem docs/scenarios.md
  // Tên test nói một đằng, assertion làm một nẻo. Test đang XANH vì code
  // cũng sai y hệt. Chỉ docs/spec.md §2.3 nói đúng.
  it('miễn phí ship cho đơn từ 500k nội thành', () => {
    expect(calcFee({ subtotal: 500_000, zone: 'inner', weightKg: 1 })).toBe(30_000);
  });
});

describe('cheapestOption', () => {
  it('trả về phương án rẻ nhất', () => {
    const best = cheapestOption([
      { subtotal: 100_000, zone: 'remote', weightKg: 1 },
      { subtotal: 100_000, zone: 'inner', weightKg: 1 },
      { subtotal: 100_000, zone: 'suburb', weightKg: 1 },
    ]);
    expect(best?.zone).toBe('inner');
  });

  it('trả null khi danh sách rỗng', () => {
    expect(cheapestOption([])).toBeNull();
  });
});

describe('formatCurrency', () => {
  it('chèn dấu phân cách hàng nghìn', () => {
    expect(formatCurrency(1_234_567)).toBe('1.234.567đ');
  });

  it('rút gọn khi bật cờ short', () => {
    expect(formatCurrency(45_000, true)).toBe('45k'); // nhánh short quên mất đơn vị 'đ'
  });
});

describe('apply_discount', () => {
  it('giảm theo phần trăm', () => {
    expect(apply_discount(200_000, 'SALE10')).toBe(180_000);
  });

  it('ném lỗi khi mã không tồn tại', () => {
    expect(() => apply_discount(100_000, 'KHONGCO')).toThrow();
  });
});
