'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Order, OrderItem } from '@/app/_types/shop';

type Row = Record<string, unknown>;

function asString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}
function asNumber(v: unknown, fallback = 0): number {
  return typeof v === 'number' ? v : Number(v ?? fallback) || fallback;
}
function asItems(v: unknown): OrderItem[] {
  if (!Array.isArray(v)) return [];
  return v.map((it) => {
    const r = (it ?? {}) as Row;
    return {
      id: asString(r.id),
      name: asString(r.name),
      price: asNumber(r.price),
      size: typeof r.size === 'string' ? r.size : null,
    };
  });
}
function normalizeOrder(row: Row): Order {
  return {
    id: asString(row.id),
    created_at: asString(row.created_at),
    total: asNumber(row.total),
    status: asString(row.status, 'aguardando comprovante'),
    customer_name: asString(row.customer_name, 'Cliente'),
    customer_phone: row.customer_phone === null || typeof row.customer_phone === 'string' ? row.customer_phone : null,
    items: asItems(row.items),
  };
}

export default function OrdersModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('id,created_at,total,status,customer_name,customer_phone,items')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const rows = ((data ?? []) as Row[]).map(normalizeOrder);
      setOrders(rows);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-600 hover:text-gray-800">
          ✕
        </button>

        <h2 className="text-2xl font-extrabold text-aviva-blue mb-4">Histórico de pedidos</h2>

        {loading ? (
          <p className="text-gray-800 text-center">Carregando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-800 text-center">Você ainda não possui pedidos.</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {orders.map((o) => (
              <div key={o.id} className="border rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-aviva-blue">
                    {new Date(o.created_at).toLocaleString('pt-BR')}
                  </span>
                  <span className="text-aviva-blue font-extrabold text-sm">
                    R$ {Number(o.total).toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-gray-800 mt-1">
                  Status: <span className="font-semibold">{o.status}</span>
                </p>

                <p className="text-xs text-gray-800 mt-2">
                  Itens:{' '}
                  <span className="font-medium">
                    {(o.items ?? []).map((i) => i.name).filter(Boolean).join(', ') || '—'}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
