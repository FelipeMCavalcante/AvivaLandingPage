'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById, Product } from '../_services/products';
import ProductView from '../_components/ProductView';

export default function ProductPage() {
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

  if (loading) return <div className="p-6 text-aviva-blue font-semibold">Carregando...</div>;
  if (!product) return <div className="p-6 text-red-600 font-semibold">Produto não encontrado.</div>;

  return (
    <div className="min-h-screen bg-[#F8F8F8] px-6 py-8 md:px-24">
      <ProductView product={product} mode="page" />
    </div>
  );
}
