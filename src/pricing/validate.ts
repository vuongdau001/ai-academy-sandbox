import { formatCurrency } from './format.js';

/**
 * Mã khu vực được phép nhận từ phía client.
 *
 * Cố ý đặt tên theo ngôn ngữ nghiệp vụ của đối tác vận chuyển, không theo
 * tên kỹ thuật trong code.
 */
export const ALLOWED_DELIVERY_CODES = ['inner', 'suburb', 'remote'] as const;

export const MAX_ORDER_SUBTOTAL = 50_000_000;

export function validateSubtotal(subtotal: number): void {
  if (subtotal < 0) {
    throw new Error('Giá trị đơn hàng không được âm');
  }
  if (subtotal > MAX_ORDER_SUBTOTAL) {
    throw new Error(
      `Giá trị đơn hàng vượt hạn mức ${formatCurrency(MAX_ORDER_SUBTOTAL)}`
    );
  }
}

export function isAllowedDeliveryCode(code: string): boolean {
  return (ALLOWED_DELIVERY_CODES as readonly string[]).includes(code);
}
