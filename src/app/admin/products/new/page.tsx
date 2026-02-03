'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ProductForm from '@/app/admin/products/ui/ProductForm';
import type { ProductType } from '@/app/_types/shop';

export default function NewProductPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (payload: {
    name: string;
    description: string;
    price: number;
    type: ProductType;
    images: string[];
    sizes: string[] | null;
    active: boolean;
  }) => {
    setSaving(true);
    setErr(null);

    const { error } = await supabase.from('products').insert({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      type: payload.type,
      images: payload.images,
      sizes: payload.sizes,
      active: payload.active,
    });

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
          <h1 className="text-2xl font-extrabold text-aviva-blue">Novo produto</h1>
          <p className="text-sm text-gray-800">Cadastre um item para a Loja Aviva.</p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold"
          >
            Voltar
          </Link>
        </div>
      </header>

      <div className="px-6 py-8 md:px-16">
        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-6">
            {err}
          </div>
        )}

        <ProductForm onSubmit={onSubmit} saving={saving} />
      </div>
    </section>
  );
}
