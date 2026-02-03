'use client';

import Link from 'next/link';
import type { Product } from '../_services/products';

export default function ProductCard({ product }: { product: Product }) {
  // segurança extra (em dev evita crash)
  if (!product?.id) return null;

  const image = product.images?.[0] ?? '/imgLoja/placeholder.jpg';

  return (
    <Link
      href={`/store/${product.id}`}
      scroll={false}
      className="bg-white rounded-2xl shadow p-4 flex flex-col"
    >
      <img
        src={image}
        alt={product.name}
        className="rounded-xl w-full h-56 object-cover"
      />

      <h3 className="mt-3 font-bold text-aviva-blue">{product.name}</h3>
      <p className="text-gray-800 text-sm line-clamp-2">{product.description}</p>

      <p className="mt-2 text-aviva-blue font-semibold">
        R$ {Number(product.price).toFixed(2)}
      </p>

      <span className="mt-3 inline-flex justify-center bg-aviva-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
        Ver detalhes
      </span>
    </Link>
  );
}
