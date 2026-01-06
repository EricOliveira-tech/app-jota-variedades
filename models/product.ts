type UUID = string; // client-generated (e.g. nanoid/uuid)

export type PaymentMethod = "cash" | "pix" | "card" | "mixed";

export interface Product {
  id: UUID;
  name: string;
  price: number; // cents
  stock_qty: number; // can go negative if out_of_stock flag used
  min_stock_qty?: number;
  is_dirty?: boolean;
  last_synced_at?: string; // ISO
  created_at: string;
  updated_at: string;
}

export interface SaleItem {
  id: UUID;
  sale_id: UUID;
  product_id: UUID;
  qty: number;
  unit_price: number; // cents snapshot
  total: number; // derived unit_price * qty
}

export interface Sale {
  id: UUID;
  total: number; // cents
  payment_method: PaymentMethod;
  out_of_stock?: boolean;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = "pending" | "delivered" | "cancelled";

export interface OrderItem {
  id: UUID;
  order_id: UUID;
  product_id: UUID;
  qty: number;
  unit_price: number;
}

export interface Order {
  id: UUID;
  customer_name: string;
  phone: string; // digits only, e.g., 55DDDNNUUUU
  status: OrderStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type StockMovementType = "in" | "out" | "adjust";

export interface StockMovement {
  id: UUID;
  product_id: UUID;
  type: StockMovementType;
  qty_change: number; // +in, -out, +/-adjust
  reason?: string; // e.g., 'sale:xxx', 'order:xxx'
  created_at: string;
}

export interface SyncQueueItem {
  id: UUID;
  op: string; // e.g., 'product.upsert'
  payload: any; // normalized DTO
  created_at: string;
  retry_count: number;
  last_error?: string;
}
