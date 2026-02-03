'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import type { Product } from '@/app/_types/shop';

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
function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function normalizeProduct(row: Row): Product {
  return {
    id: asString(row.id),
    name: asString(row.name),
    description: asString(row.description),
    price: asNumber(row.price),
    type: (asString(row.type) as Product['type']) || 'outro',
    images: asStringArray(row.images),
    sizes: Array.isArray(row.sizes) ? asStringArray(row.sizes) : null,
    active: asBool(row.active, true),
    created_at: asString(row.created_at),
  };
}

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);

    const res = await supabase
      .from('products')
      .select('id,name,description,price,type,images,sizes,active,created_at')
      .order('created_at', { ascending: false });

    if (res.error) {
      setErr(res.error.message);
      setProducts([]);
      setLoading(false);
      return;
    }

    setProducts(((res.data ?? []) as Row[]).map(normalizeProduct));
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const toggleActive = async (id: string, active: boolean) => {
    const { error } = await supabase.from('products').update({ active }).eq('id', id);
    if (error) alert(error.message);
    await load();
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8]">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-aviva-blue">Produtos (Admin)</h1>
          <p className="text-sm text-gray-800">Criar e gerenciar produtos.</p>
        </div>

        <div className="flex gap-2">
          <Link href="/admin" className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold">
            Voltar
          </Link>

          <Link href="/admin/products/new" className="px-4 py-2 rounded-xl bg-aviva-blue hover:bg-blue-600 text-white font-extrabold">
            Novo produto
          </Link>
        </div>
      </header>

      <div className="px-6 py-8 md:px-16">
        {err && <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-6">{err}</div>}

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {loading ? (
            <div className="p-6 text-gray-800">Carregando...</div>
          ) : products.length === 0 ? (
            <div className="p-6 text-gray-800">Nenhum produto.</div>
          ) : (
            <div className="divide-y">
              {products.map((p) => (
                <div key={p.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-extrabold text-aviva-blue">{p.name}</p>
                    <p className="text-sm text-gray-800">{p.type} • R$ {p.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-700">{p.active ? 'ativo' : 'inativo'}</p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="px-4 py-2 rounded-xl bg-aviva-blue hover:bg-blue-600 text-white font-extrabold"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => toggleActive(p.id, !p.active)}
                      className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold"
                    >
                      {p.active ? 'Desativar' : 'Ativar'}
                    </button>
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
