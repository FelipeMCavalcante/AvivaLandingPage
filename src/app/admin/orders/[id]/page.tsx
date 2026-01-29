'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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

export default function AdminOrderDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await supabase
        .from('orders')
        .select('id,created_at,total,status,customer_name,customer_phone,items')
        .eq('id', id)
        .single();

      if (res.error) throw res.error;

      const row = res.data as unknown as Row;
      setOrder(normalizeOrder(row));
    } catch (e: unknown) {
      const msg =
        (e as { message?: string })?.message ?? 'Erro ao carregar o pedido.';
      setErrorMsg(msg);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const itemsTotal = useMemo(() => {
    if (!order) return 0;
    return (order.items ?? []).reduce((acc, it) => acc + (it.price || 0), 0);
  }, [order]);

  const updateStatus = async (status: string) => {
    if (!order) return;

    const prev = order;
    setOrder({ ...order, status });

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', order.id);

    if (error) {
      setOrder(prev);
      alert('Erro ao atualizar status: ' + error.message);
    }
  };

  const openWhatsapp = () => {
    if (!order?.customer_phone) return;
    const phone = order.customer_phone.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Olá, ${order.customer_name}! Seu pedido está com status: ${order.status}.`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8]">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1D5176]">
            Pedido (Admin)
          </h1>
          <p className="text-sm text-gray-600">Detalhes do pedido.</p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold"
          >
            Voltar
          </Link>

          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold"
          >
            Admin Home
          </button>
        </div>
      </header>

      <div className="px-6 py-8 md:px-16 space-y-6">
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
            {errorMsg}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl shadow p-6 text-gray-600">
            Carregando...
          </div>
        ) : !order ? (
          <div className="bg-white rounded-2xl shadow p-6 text-gray-600">
            Pedido não encontrado.
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p className="text-xl font-extrabold text-[#1D5176]">
                    {order.customer_name}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(order.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-extrabold text-yellow-600">
                    R$ {order.total.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Soma itens: R$ {itemsTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#1D5176]">
                    Status:
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(e.target.value)}
                    className="border rounded-xl p-2 text-sm"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  {order.customer_phone && (
                    <button
                      onClick={openWhatsapp}
                      className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold"
                    >
                      WhatsApp
                    </button>
                  )}
                  <button
                    onClick={load}
                    className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-extrabold"
                  >
                    Recarregar
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-extrabold text-[#1D5176] mb-4">
                Itens
              </h2>

              {order.items.length === 0 ? (
                <p className="text-gray-600">Sem itens.</p>
              ) : (
                <div className="space-y-3">
                  {order.items.map((it, idx) => (
                    <div
                      key={`${it.id}-${idx}`}
                      className="border rounded-xl p-4 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-extrabold text-[#1D5176]">
                          {it.name}
                          {it.size ? (
                            <span className="text-xs text-gray-500 font-semibold">
                              {' '}
                              ({it.size})
                            </span>
                          ) : null}
                        </p>
                        <p className="text-xs text-gray-600">
                          ID: {it.id || '—'}
                        </p>
                      </div>

                      <div className="font-extrabold text-yellow-600">
                        R$ {Number(it.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
