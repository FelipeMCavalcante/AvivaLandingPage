'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById, Product } from '../../_services/products';
import ProductView from '../../_components/ProductView';

export default function ProductModalRoute() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProductById(params.id);
        setProduct(p);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative overflow-hidden">
        <button
          onClick={() => router.back()}
          className="absolute top-3 right-4 text-gray-700 hover:text-gray-900 z-10"
        >
          ✕
        </button>

        {loading ? (
          <div className="p-6 text-aviva-blue font-semibold">Carregando...</div>
        ) : !product ? (
          <div className="p-6 text-red-600 font-semibold">Produto não encontrado.</div>
        ) : (
          <ProductView product={product} mode="modal" onClose={() => router.back()} />
        )}
      </div>
    </div>
  );
}
