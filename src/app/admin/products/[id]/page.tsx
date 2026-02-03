'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ProductForm from '@/app/admin/products/ui/ProductForm';
import type { Product, ProductType } from '@/app/_types/shop';

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
    type: (asString(row.type) as ProductType) || 'outro',
    images: asStringArray(row.images),
    sizes: Array.isArray(row.sizes) ? asStringArray(row.sizes) : null,
    active: asBool(row.active, true),
    created_at: asString(row.created_at),
  };
}

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const load = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setErr(null);

    const res = await supabase
      .from('products')
      .select('id,name,description,price,type,images,sizes,active,created_at')
      .eq('id', id)
      .single();

    if (res.error) {
      setErr(res.error.message);
      setProduct(null);
      setLoading(false);
      return;
    }

    const row = res.data as unknown as Row;
    setProduct(normalizeProduct(row));
    setLoading(false);
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const onSubmit = async (payload: {
    name: string;
    description: string;
    price: number;
    type: ProductType;
    images: string[];
    sizes: string[] | null;
    active: boolean;
  }) => {
    if (!id) return;

    setSaving(true);
    setErr(null);

    const { error } = await supabase
      .from('products')
      .update({
        name: payload.name,
        description: payload.description,
        price: payload.price,
        type: payload.type,
        images: payload.images,
        sizes: payload.sizes,
        active: payload.active,
      })
      .eq('id', id);

    if (error) {
      setErr(error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    router.replace('/admin/products');
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8]">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-aviva-blue">Editar produto</h1>
          <p className="text-sm text-gray-800">Atualize os dados do produto.</p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold"
          >
            Voltar
          </Link>
          <button
            onClick={load}
            className="px-4 py-2 rounded-xl bg-aviva-blue hover:bg-blue-600 text-white font-extrabold"
          >
            Recarregar
          </button>
        </div>
      </header>

      <div className="px-6 py-8 md:px-16">
        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-6">
            {err}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl shadow p-6 text-gray-800">Carregando...</div>
        ) : !product ? (
          <div className="bg-white rounded-2xl shadow p-6 text-gray-800">
            Produto não encontrado.
          </div>
        ) : (
          <ProductForm initial={product} onSubmit={onSubmit} saving={saving} />
        )}
      </div>
    </section>
  );
}
