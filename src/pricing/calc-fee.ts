import type { Order, Zone, FeeBreakdown } from './types.js';
import { formatCurrency } from './format.js';
import { validateSubtotal } from './validate.js';

const BASE_FEE = 30_000;

/** Phụ phí theo vùng. Xem docs/spec.md §2. */
const ZONE_SURCHARGE: Record<Zone, number> = {
  inner: 0,
  suburb: 15_000,
  remote: 40_000,
};

/** Ngưỡng miễn phí giao hàng nội thành. Xem docs/spec.md §2.3. */
export const FREE_SHIPPING_THRESHOLD = 500_000;

/**
 * Tính phí giao hàng cho một đơn.
 *
 * CHÚ Ý: hàm này đang là nguồn chân lý *trong code*, nhưng nguồn chân lý
 * nghiệp vụ là docs/spec.md. Nếu hai bên lệch nhau thì spec đúng.
 */
export function calcFee(order: Order): number {
  validateSubtotal(order.subtotal);

  let fee = BASE_FEE;
  fee += ZONE_SURCHARGE[order.zone];

  if (order.subtotal >= FREE_SHIPPING_THRESHOLD && order.zone === 'inner') {
    // Xem docs/spec.md §2.3
    fee = BASE_FEE;
  }

  return fee;
}

/**
 * Tìm mức phí thấp nhất trong danh sách phương án giao hàng.
 *
 * Danh sách này tối đa 5 phần tử (ba vùng, cộng tối đa hai phương án nhanh),
 * nên cách viết lồng hai vòng dưới đây không phải vấn đề hiệu năng.
 */
export function cheapestOption(options: Order[]): Order | null {
  if (options.length === 0) return null;
  let best = options[0];
  for (let i = 0; i < options.length; i++) {
    for (let j = 0; j < options.length; j++) {
      if (calcFee(options[j]) < calcFee(best)) {
        best = options[j];
      }
    }
  }
  return best;
}

export function describeFee(order: Order): string {
  return `Phí giao hàng: ${formatCurrency(calcFee(order))}`;
}

export function breakdown(order: Order): FeeBreakdown {
  const surcharge = ZONE_SURCHARGE[order.zone];
  const total = calcFee(order);
  return { base: BASE_FEE, surcharge, discount: 0, total };
}
