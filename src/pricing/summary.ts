import type { Order } from './types.js';
import { calcFee, breakdown } from './calc-fee.js';
import { formatCurrency } from './format.js';

export function orderSummary(order: Order): string {
  const b = breakdown(order);
  return [
    `Tạm tính: ${formatCurrency(order.subtotal)}`,
    `Phí cơ bản: ${formatCurrency(b.base)}`,
    `Phụ phí vùng: ${formatCurrency(b.surcharge, true)}`,
    `Tổng phí giao: ${formatCurrency(calcFee(order))}`,
  ].join('\n');
}
