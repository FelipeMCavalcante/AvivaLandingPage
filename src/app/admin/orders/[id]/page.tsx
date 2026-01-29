'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type OrderStatus =
  | 'aguardando comprovante'
  | 'em separação'
  | 'pronto'
  | 'entregue'
  | 'cancelado';

type OrderRow = {
  id: string;
  created_at: string;
  total: number;
  status: OrderStatus;
  items: any[];
  user_id: string;
  customer_name: string;
  customer_phone: string | null;
};

const STATUS: OrderStatus[] = [
  'aguardando comprovante',
  'em separação',
  'pronto',
  'entregue',
  'cancelado',
];

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [order, setOrder] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('id, created_at, total, status, items, user_id, customer_name, customer_phone')
      .eq('id', id)
      .single();

    if (!error) setOrder(data as OrderRow);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const updateStatus = async (status: OrderStatus) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    await load();
  };

  if (loading) return <p className="text-gray-600">Carregando...</p>;
  if (!order) return <p className="text-gray-600">Pedido não encontrado.</p>;

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-[#1D5176]">Pedido</h2>
          <p className="text-xs text-gray-500">ID: {order.id}</p>
        </div>

        <a href="/admin/orders" className="text-[#1D5176] hover:underline font-semibold">
          Voltar
        </a>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="border rounded-xl p-4">
          <p className="text-gray-500 text-sm">Cliente</p>
          <p className="text-[#1D5176] font-bold">{order.customer_name}</p>
          <p className="text-gray-600 text-sm">{order.customer_phone ?? '—'}</p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500 text-sm">Data</p>
          <p className="text-[#1D5176] font-bold">
            {new Date(order.created_at).toLocaleString('pt-BR')}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-yellow-700 font-extrabold text-lg">
            R$ {Number(order.total).toFixed(2)}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500 text-sm">Status</p>
          <select
            value={order.status}
            onChange={(e) => updateStatus(e.target.value as OrderStatus)}
            className="mt-1 border rounded-lg px-3 py-2 text-black w-full"
          >
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 border rounded-xl p-4">
        <p className="text-[#1D5176] font-bold mb-3">Itens</p>
        {order.items?.length ? (
          <div className="space-y-2">
            {order.items.map((i: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between border-b py-2">
                <div>
                  <p className="text-[#1D5176] font-semibold">
                    {i.name} {i.size ? <span className="text-gray-500 text-sm">({i.size})</span> : null}
                  </p>
                  <p className="text-gray-500 text-xs">{i.type ?? ''}</p>
                </div>
                <p className="text-yellow-700 font-semibold">
                  R$ {Number(i.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">—</p>
        )}
      </div>
    </div>
  );
}
