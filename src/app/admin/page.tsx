'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Order = {
  id: string;
  created_at: string;
  total: number;
  status: string;
  customer_name: string;
  customer_phone: string | null;
  items: any[];
};

type Product = {
  id: string;
  name: string;
  price: number;
  type: string;
  active: boolean;
  created_at: string;
};

export default function AdminHomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const awaiting = orders.filter((o) => o.status === 'aguardando comprovante')
      .length;
    const preparing = orders.filter((o) => o.status === 'em separação').length;
    const delivered = orders.filter((o) => o.status === 'entregue').length;

    const activeProducts = products.filter((p) => p.active).length;

    return {
      totalOrders,
      awaiting,
      preparing,
      delivered,
      activeProducts,
    };
  }, [orders, products]);

  const load = async () => {
    setLoading(true);
    setErr(null);

    try {
      const [{ data: ordersData, error: ordersError }, { data: prodData, error: prodError }] =
        await Promise.all([
          supabase
            .from('orders')
            .select(
              'id,created_at,total,status,customer_name,customer_phone,items'
            )
            .order('created_at', { ascending: false })
            .limit(8),
          supabase
            .from('products')
            .select('id,name,price,type,active,created_at')
            .order('created_at', { ascending: false })
            .limit(8),
        ]);

      if (ordersError) throw ordersError;
      if (prodError) throw prodError;

      setOrders((ordersData as Order[]) ?? []);
      setProducts((prodData as Product[]) ?? []);
    } catch (e: any) {
      setErr(e?.message ?? 'Erro ao carregar dados do admin.');
      setOrders([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace('/store');
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1D5176]">
            Admin • Loja Aviva
          </h1>
          <p className="text-sm text-gray-600">
            Gerencie produtos e acompanhe pedidos em tempo real.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push('/store')}
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold"
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
        {/* Erro */}
        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
            {err}
          </div>
        )}

        {/* Ações rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/admin/products')}
            className="bg-white rounded-2xl shadow p-5 text-left hover:shadow-md transition"
          >
            <p className="text-sm text-gray-600">Gerenciar</p>
            <p className="text-xl font-extrabold text-[#1D5176]">Produtos</p>
            <p className="text-sm text-gray-600 mt-1">
              Criar, editar, ativar/desativar.
            </p>
          </button>

          <button
            onClick={() => router.push('/admin/orders')}
            className="bg-white rounded-2xl shadow p-5 text-left hover:shadow-md transition"
          >
            <p className="text-sm text-gray-600">Acompanhar</p>
            <p className="text-xl font-extrabold text-[#1D5176]">Pedidos</p>
            <p className="text-sm text-gray-600 mt-1">
              Status, itens e contato do cliente.
            </p>
          </button>

          <button
            onClick={load}
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl shadow p-5 text-left transition"
          >
            <p className="text-sm text-white/90">Atualizar</p>
            <p className="text-xl font-extrabold">Recarregar dados</p>
            <p className="text-sm text-white/90 mt-1">
              Puxa os últimos pedidos e produtos.
            </p>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Pedidos" value={stats.totalOrders} />
          <StatCard title="Aguardando comp." value={stats.awaiting} />
          <StatCard title="Em separação" value={stats.preparing} />
          <StatCard title="Entregues" value={stats.delivered} />
          <StatCard title="Produtos ativos" value={stats.activeProducts} />
        </div>

        {/* Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Últimos pedidos */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-[#1D5176]">
                Últimos pedidos
              </h2>
              <button
                onClick={() => router.push('/admin/orders')}
                className="text-sm font-semibold text-[#1D5176] hover:underline"
              >
                Ver todos
              </button>
            </div>

            {loading ? (
              <p className="text-gray-600">Carregando...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-600">Nenhum pedido ainda.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => router.push('/admin/orders')}
                    className="w-full text-left border rounded-xl p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-[#1D5176] text-sm">
                        {o.customer_name}
                      </span>
                      <span className="font-extrabold text-yellow-600 text-sm">
                        R$ {Number(o.total).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-600">
                        {new Date(o.created_at).toLocaleString('pt-BR')}
                      </span>
                      <span className="text-xs font-semibold text-gray-700">
                        {o.status}
                      </span>
                    </div>

                    <div className="text-xs text-gray-600 mt-2">
                      Itens:{' '}
                      {(o.items ?? [])
                        .map((i: any) => i?.name)
                        .filter(Boolean)
                        .join(', ') || '—'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Últimos produtos */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-[#1D5176]">
                Produtos recentes
              </h2>
              <button
                onClick={() => router.push('/admin/products')}
                className="text-sm font-semibold text-[#1D5176] hover:underline"
              >
                Ver todos
              </button>
            </div>

            {loading ? (
              <p className="text-gray-600">Carregando...</p>
            ) : products.length === 0 ? (
              <p className="text-gray-600">Nenhum produto ainda.</p>
            ) : (
              <div className="space-y-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="border rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-extrabold text-[#1D5176] text-sm">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {p.type} •{' '}
                        <span className={p.active ? 'text-green-700' : 'text-red-700'}>
                          {p.active ? 'ativo' : 'inativo'}
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-extrabold text-yellow-600 text-sm">
                        R$ {Number(p.price).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(p.created_at).toLocaleDateString('pt-BR')}
                      </p>
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
      <p className="text-xs text-gray-600">{title}</p>
      <p className="text-2xl font-extrabold text-[#1D5176] mt-1">{value}</p>
    </div>
  );
}
