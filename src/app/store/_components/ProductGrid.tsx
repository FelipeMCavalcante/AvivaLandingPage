'use client';

import ProductCard from './ProductCard';
import type { Product } from '../_services/products';

export default function ProductGrid({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="text-aviva-blue font-semibold text-center py-12">
        Carregando produtos...
      </div>
    );
  }

  const safeProducts = (products ?? []).filter(Boolean);

  if (safeProducts.length === 0) {
    return (
      <div className="text-gray-800 text-center py-12">
        Nenhum produto disponível no momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {safeProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
