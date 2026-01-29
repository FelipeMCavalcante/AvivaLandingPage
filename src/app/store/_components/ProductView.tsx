'use client';

import { useMemo, useState } from 'react';
import { useCart } from '../_context/CartContext';
import type { Product } from '../_services/products';

type Props = {
  product: Product;
  mode?: 'modal' | 'page';
  onClose?: () => void;
};

export default function ProductView({ product, mode = 'page', onClose }: Props) {
  const { addItem } = useCart();

  const images = useMemo(() => product.images ?? [], [product.images]);
  const [activeImg, setActiveImg] = useState(images[0] ?? '/imgLoja/placeholder.jpg');

  const isClothing = product.type === 'roupa';
  const sizes = (product.sizes ?? []) as string[];
  const [size, setSize] = useState<string>('');

  const handleAdd = () => {
    if (isClothing && !size) {
      alert('Selecione um tamanho.');
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      images: product.images ?? [],
      type: product.type,
      size: isClothing ? size : null,
    });

    if (mode === 'modal' && onClose) onClose();
  };

  return (
    <div className={mode === 'modal' ? 'p-6' : ''}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Galeria */}
        <div>
          <img
            src={activeImg}
            alt={product.name}
            className="w-full h-80 md:h-[420px] object-cover rounded-2xl"
          />

          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((img) => (
                <button
                  key={img}
                  onClick={() => setActiveImg(img)}
                  className={`shrink-0 rounded-xl border ${
                    activeImg === img ? 'border-[#1D5176]' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Infos */}
        <div>
          <h1 className="text-2xl font-extrabold text-[#1D5176]">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-2">{product.description}</p>

          <p className="mt-4 text-2xl font-bold text-yellow-600">
            R$ {Number(product.price).toFixed(2)}
          </p>

          {/* Tamanho */}
          {isClothing && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-[#1D5176] mb-2">
                Selecione o tamanho
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      size === s
                        ? 'bg-[#1D5176] text-white border-[#1D5176]'
                        : 'bg-white text-[#1D5176] border-gray-200 hover:border-[#1D5176]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Adicionar ao carrinho
            </button>

            {mode === 'modal' && onClose && (
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Fechar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
