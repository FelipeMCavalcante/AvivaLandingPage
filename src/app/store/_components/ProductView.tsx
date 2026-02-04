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
    <div className={mode === 'modal' ? 'p-6' : 'max-w-7xl mx-auto py-12 px-6'}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Galeria */}
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg bg-gray-50 border border-gray-100">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img) => (
                <button
                  key={img}
                  onClick={() => setActiveImg(img)}
                  className={`shrink-0 w-24 h-24 rounded-xl border-2 transition-all overflow-hidden ${
                    activeImg === img
                      ? 'border-aviva-blue ring-2 ring-aviva-blue/20'
                      : 'border-gray-200 hover:border-aviva-blue'
                  }`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="flex flex-col h-full">
          <div className="mb-auto">
            {mode === 'page' && (
              <div className="mb-4">
                <span className="bg-blue-50 text-aviva-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.type || 'Produto'}
                </span>
              </div>
            )}

            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-3xl font-bold text-aviva-blue">
              R$ {Number(product.price).toFixed(2)}
            </p>

            <div className="mt-8 prose prose-blue text-gray-600 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Tamanho */}
            {isClothing && (
              <div className="mt-10 border-t border-gray-100 pt-8">
                <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                  Selecione o tamanho
                </p>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                        size === s
                          ? 'bg-aviva-blue text-white border-aviva-blue shadow-lg scale-110'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-aviva-blue hover:text-aviva-blue'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex gap-4 pt-8 border-t border-gray-100">
            <button
              onClick={handleAdd}
              className="flex-1 bg-aviva-blue hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              Adicionar ao carrinho
            </button>

            {mode === 'modal' && onClose && (
              <button
                onClick={onClose}
                className="px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
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
