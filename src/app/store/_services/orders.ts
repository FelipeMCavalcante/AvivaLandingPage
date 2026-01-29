import { supabase } from '@/lib/supabaseClient';
import type { CartItem } from '../_context/CartContext';

export type OrderStatus =
  | 'aguardando comprovante'
  | 'em separação'
  | 'pronto'
  | 'entregue'
  | 'cancelado';

export type Order = {
  id: string;
  created_at: string;
  total: number;
  status: OrderStatus;
  items: CartItem[];
  user_id: string;
  customer_name: string;
  customer_phone: string | null;
};

export async function createOrder(payload: {
  userId: string;
  customerName: string;
  customerPhone: string | null;
  items: CartItem[];
  total: number;
}) {
  const { error } = await supabase.from('orders').insert({
    user_id: payload.userId,
    customer_name: payload.customerName,
    customer_phone: payload.customerPhone,
    items: payload.items,
    total: payload.total,
    status: 'aguardando comprovante',
  });

  if (error) throw error;
}
