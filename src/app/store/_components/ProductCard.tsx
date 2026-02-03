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
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 group-hover:text-aviva-blue transition-colors text-lg line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>

        <div className="mt-auto">
          <p className="text-2xl font-extrabold text-aviva-blue">
            R$ {Number(product.price).toFixed(2)}
          </p>

          <button className="w-full mt-4 bg-gray-50 text-aviva-blue font-semibold py-3 rounded-xl group-hover:bg-aviva-blue group-hover:text-white transition-all duration-300">
            Ver detalhes
          </button>
        </div>
      </div>
    </Link>
  );
}
