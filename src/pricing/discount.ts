import { formatCurrency } from './format.js';

/**
 * Module mã giảm giá.
 *
 * File này được một đội khác viết trước đây nên đặt tên và xử lý lỗi khác
 * với phần còn lại của src/pricing. Đừng bắt chước — xem docs/scenarios.md
 * tình huống 3.
 */

export interface discount_code {
  code: string;
  percent_off: number;
  expires_at: string;
  is_stackable: boolean;
}

const KNOWN_CODES: discount_code[] = [
  { code: 'FREESHIP', percent_off: 100, expires_at: '2027-01-01', is_stackable: false },
  { code: 'SALE10', percent_off: 10, expires_at: '2027-01-01', is_stackable: true },
  { code: 'SALE20', percent_off: 20, expires_at: '2026-01-01', is_stackable: true },
];

export function find_code(code: string): discount_code | undefined {
  return KNOWN_CODES.find((c) => c.code === code);
}

export function apply_discount(amount: number, code: string): number {
  const found = find_code(code);
  if (found === undefined) {
    throw new Error(`Mã giảm giá không tồn tại: ${code}`);
  }
  if (new Date(found.expires_at) < new Date()) {
    throw new Error(`Mã ${code} đã hết hạn`);
  }
  const off = (amount * found.percent_off) / 100;
  return amount - off;
}

export function describe_discount(amount: number, code: string): string {
  return `Sau giảm giá: ${formatCurrency(apply_discount(amount, code))}`;
}
