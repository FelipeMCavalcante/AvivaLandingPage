'use client';

import { useEffect, useMemo, useState } from 'react';
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

export default function AdminOrdersPage() {
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('id, created_at, total, status, items, user_id, customer_name, customer_phone')
      .order('created_at', { ascending: false });

    if (!error) setRows((data as OrderRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return rows.filter((o) => {
      const okStatus = statusFilter === 'all' ? true : o.status === statusFilter;
      const okText = !text
        ? true
        : o.customer_name.toLowerCase().includes(text) || o.id.toLowerCase().includes(text);
      return okStatus && okText;
    });
  }, [rows, statusFilter, q]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    await load();
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-extrabold text-[#1D5176]">Pedidos</h2>

        <div className="flex gap-3 flex-col md:flex-row md:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome ou ID..."
            className="border rounded-lg px-3 py-2 text-black w-full md:w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-black"
          >
            <option value="all">Todos</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={load}
            className="bg-[#1D5176] hover:bg-[#163e5a] text-white px-4 py-2 rounded-lg transition"
          >
            Atualizar
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Carregando...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600">Nenhum pedido encontrado.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((o) => (
            <div key={o.id} className="border rounded-xl p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(o.created_at).toLocaleString('pt-BR')}
                  </p>
                  <p className="text-[#1D5176] font-bold">
                    {o.customer_name}{' '}
                    {o.customer_phone ? (
                      <span className="text-gray-500 font-normal">
                        • {o.customer_phone}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-gray-500">ID: {o.id}</p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-yellow-700 font-extrabold">
                    R$ {Number(o.total).toFixed(2)}
                  </p>

                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                    className="border rounded-lg px-3 py-2 text-black"
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <a
                    href={`/admin/orders/${o.id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Ver
                  </a>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                Itens:{' '}
                {o.items?.length
                  ? o.items.map((i: any) => `${i.name}${i.size ? ` (${i.size})` : ''}`).join(', ')
                  : '—'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
