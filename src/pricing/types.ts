/** Vùng giao hàng. Xem docs/spec.md §2 để biết định nghĩa nghiệp vụ. */
export type Zone = 'inner' | 'suburb' | 'remote';

export interface Order {
  subtotal: number;
  zone: Zone;
  weightKg: number;
  discountCodes?: string[];
}

export interface FeeBreakdown {
  base: number;
  surcharge: number;
  discount: number;
  total: number;
}
