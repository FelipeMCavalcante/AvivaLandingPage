'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { Order, Product, OrderItem } from '@/app/_types/shop';

type Row = Record<string, unknown>;

function asString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}
function asNumber(v: unknown, fallback = 0): number {
  return typeof v === 'number' ? v : Number(v ?? fallback) || fallback;
}
function asBool(v: unknown, fallback = false): boolean {
  return typeof v === 'boolean' ? v : fallback;
}
function asItems(v: unknown): OrderItem[] {
  if (!Array.isArray(v)) return [];
  return v.map((it) => {
    const r = (it ?? {}) as Row;
    return { id: asString(r.id), name: asString(r.name), price: asNumber(r.price), size: typeof r.size === 'string' ? r.size : null };
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

function normalizeProduct(row: Row): Product {
  return {
    id: asString(row.id),
    name: asString(row.name),
    description: asString(row.description),
    price: asNumber(row.price),
    type: (asString(row.type) as Product['type']) || 'outro',
    images: Array.isArray(row.images) ? (row.images as unknown[]).filter((x): x is string => typeof x === 'string') : [],
    sizes: Array.isArray(row.sizes) ? (row.sizes as unknown[]).filter((x): x is string => typeof x === 'string') : null,
    active: asBool(row.active, true),
    created_at: asString(row.created_at),
  };
}

export default function AdminHomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const awaiting = orders.filter((o) => o.status === 'aguardando comprovante').length;
    const preparing = orders.filter((o) => o.status === 'em separação').length;
    const delivered = orders.filter((o) => o.status === 'entregue').length;
    const activeProducts = products.filter((p) => p.active).length;

    return { totalOrders, awaiting, preparing, delivered, activeProducts };
  }, [orders, products]);

  const load = async () => {
    setLoading(true);
    setErr(null);

    try {
      const [ordersRes, prodRes] = await Promise.all([
        supabase
          .from('orders')
          .select('id,created_at,total,status,customer_name,customer_phone,items')
          .order('created_at', { ascending: false })
          .limit(8),
        supabase
          .from('products')
          .select('id,name,description,price,type,images,sizes,active,created_at')
          .order('created_at', { ascending: false })
          .limit(8),
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (prodRes.error) throw prodRes.error;

      setOrders(((ordersRes.data ?? []) as Row[]).map(normalizeOrder));
      setProducts(((prodRes.data ?? []) as Row[]).map(normalizeProduct));
    } catch (e: unknown) {
      const msg = (e as { message?: string })?.message ?? 'Erro ao carregar dados do admin.';
      setErr(msg);
      setOrders([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace('/store');
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8]">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-aviva-blue">Admin • Loja Aviva</h1>
          <p className="text-sm text-gray-800">Gerencie produtos e acompanhe pedidos.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push('/store')}
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold"
          >
            Voltar para Store
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="px-6 py-8 md:px-16 space-y-8">
        {err && <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">{err}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => router.push('/admin/products')} className="bg-white rounded-2xl shadow p-5 text-left hover:shadow-md transition">
            <p className="text-sm text-gray-800">Gerenciar</p>
            <p className="text-xl font-extrabold text-aviva-blue">Produtos</p>
            <p className="text-sm text-gray-800 mt-1">Criar, editar, ativar/desativar.</p>
          </button>

          <button onClick={() => router.push('/admin/orders')} className="bg-white rounded-2xl shadow p-5 text-left hover:shadow-md transition">
            <p className="text-sm text-gray-800">Acompanhar</p>
            <p className="text-xl font-extrabold text-aviva-blue">Pedidos</p>
            <p className="text-sm text-gray-800 mt-1">Status, itens e contato do cliente.</p>
          </button>

          <button onClick={() => void load()} className="bg-aviva-blue hover:bg-blue-600 text-white rounded-2xl shadow p-5 text-left transition">
            <p className="text-sm text-white/90">Atualizar</p>
            <p className="text-xl font-extrabold">Recarregar dados</p>
            <p className="text-sm text-white/90 mt-1">Puxa pedidos e produtos.</p>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Pedidos" value={stats.totalOrders} />
          <StatCard title="Aguardando comp." value={stats.awaiting} />
          <StatCard title="Em separação" value={stats.preparing} />
          <StatCard title="Entregues" value={stats.delivered} />
          <StatCard title="Produtos ativos" value={stats.activeProducts} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-aviva-blue">Últimos pedidos</h2>
              <button onClick={() => router.push('/admin/orders')} className="text-sm font-semibold text-aviva-blue hover:underline">
                Ver todos
              </button>
            </div>

            {loading ? (
              <p className="text-gray-800">Carregando...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-800">Nenhum pedido ainda.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <button key={o.id} onClick={() => router.push('/admin/orders')} className="w-full text-left border rounded-xl p-4 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-aviva-blue text-sm">{o.customer_name}</span>
                      <span className="font-extrabold text-aviva-blue text-sm">R$ {Number(o.total).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-800">{new Date(o.created_at).toLocaleString('pt-BR')}</span>
                      <span className="text-xs font-semibold text-gray-800">{o.status}</span>
                    </div>
                    <div className="text-xs text-gray-800 mt-2">
                      Itens: {(o.items ?? []).map((i) => i.name).filter(Boolean).join(', ') || '—'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-aviva-blue">Produtos recentes</h2>
              <button onClick={() => router.push('/admin/products')} className="text-sm font-semibold text-aviva-blue hover:underline">
                Ver todos
              </button>
            </div>

            {loading ? (
              <p className="text-gray-800">Carregando...</p>
            ) : products.length === 0 ? (
              <p className="text-gray-800">Nenhum produto ainda.</p>
            ) : (
              <div className="space-y-3">
                {products.map((p) => (
                  <div key={p.id} className="border rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-aviva-blue text-sm">{p.name}</p>
                      <p className="text-xs text-gray-800 mt-1">
                        {p.type} •{' '}
                        <span className={p.active ? 'text-green-700' : 'text-red-700'}>{p.active ? 'ativo' : 'inativo'}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-aviva-blue text-sm">R$ {Number(p.price).toFixed(2)}</p>
                      <p className="text-xs text-gray-700">{new Date(p.created_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <p className="text-xs text-gray-800">{title}</p>
      <p className="text-2xl font-extrabold text-aviva-blue mt-1">{value}</p>
    </div>
  );
}
