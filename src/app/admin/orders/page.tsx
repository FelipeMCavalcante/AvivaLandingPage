'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { Order, OrderItem } from '@/app/_types/shop';

type Row = Record<string, unknown>;

function asString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}
function asNumber(v: unknown, fallback = 0): number {
  return typeof v === 'number' ? v : Number(v ?? fallback) || fallback;
}
function asNullableString(v: unknown): string | null {
  return v === null ? null : typeof v === 'string' ? v : null;
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
    customer_phone: asNullableString(row.customer_phone),
    items: asItems(row.items),
  };
}

const STATUS_OPTIONS = [
  'aguardando comprovante',
  'em separação',
  'pronto para retirada',
  'entregue',
  'cancelado',
] as const;

export default function AdminOrdersPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const load = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await supabase
        .from('orders')
        .select('id,created_at,total,status,customer_name,customer_phone,items')
        .order('created_at', { ascending: false });

      if (res.error) throw res.error;

      const rows = ((res.data ?? []) as Row[]).map(normalizeOrder);
      setOrders(rows);
    } catch (e: unknown) {
      const msg =
        (e as { message?: string })?.message ?? 'Erro ao carregar pedidos.';
      setErrorMsg(msg);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (statusFilter === 'todos') return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const updateStatus = async (orderId: string, status: string) => {
    const prev = orders;

    // otimista
    setOrders((curr) =>
      curr.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      setOrders(prev);
      alert('Erro ao atualizar status: ' + error.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8]">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1D5176]">
            Pedidos (Admin)
          </h1>
          <p className="text-sm text-gray-600">
            Acompanhe e atualize o status dos pedidos.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold"
          >
            Voltar
          </Link>
          <button
            onClick={() => router.push('/store')}
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold"
          >
            Ir para Store
          </button>
          <button
            onClick={load}
            className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-extrabold"
          >
            Recarregar
          </button>
        </div>
      </header>

      <div className="px-6 py-8 md:px-16 space-y-6">
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
            {errorMsg}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Total: <b>{orders.length}</b>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-[#1D5176]">
              Filtrar:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-xl p-2 text-sm"
            >
              <option value="todos">Todos</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {loading ? (
            <div className="p-6 text-gray-600">Carregando...</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-gray-600">Nenhum pedido encontrado.</div>
          ) : (
            <div className="divide-y">
              {filtered.map((o) => (
                <div
                  key={o.id}
                  className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-extrabold text-[#1D5176]">
                      {o.customer_name}{' '}
                      <span className="text-xs text-gray-500 font-medium">
                        • {new Date(o.created_at).toLocaleString('pt-BR')}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      Total: <b className="text-yellow-600">R$ {o.total.toFixed(2)}</b>
                    </p>

                    <p className="text-xs text-gray-600 mt-1 truncate">
                      Itens:{' '}
                      {(o.items ?? [])
                        .map((i) => i.name)
                        .filter(Boolean)
                        .join(', ') || '—'}
                    </p>

                    {o.customer_phone && (
                      <p className="text-xs text-gray-600 mt-1">
                        WhatsApp: <b>{o.customer_phone}</b>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="border rounded-xl p-2 text-sm"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="px-4 py-2 rounded-xl bg-[#1D5176] hover:bg-[#163e59] text-white font-extrabold text-center"
                    >
                      Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
