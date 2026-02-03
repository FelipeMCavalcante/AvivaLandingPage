'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product, ProductType } from '@/app/_types/shop';

export default function ProductForm({
  initial,
  onSubmit,
  saving,
}: {
  initial?: Partial<Product>;
  onSubmit: (payload: {
    name: string;
    description: string;
    price: number;
    type: ProductType;
    images: string[];
    sizes: string[] | null;
    active: boolean;
  }) => Promise<void>;
  saving: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [type, setType] = useState<ProductType>((initial?.type as ProductType) ?? 'outro');
  const [imagesText, setImagesText] = useState((initial?.images ?? []).join('\n'));
  const [sizesText, setSizesText] = useState((initial?.sizes ?? []).join('\n'));
  const [active, setActive] = useState<boolean>(initial?.active ?? true);

  const submit = async () => {
    const images = imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const sizesRaw = sizesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const sizes = type === 'roupa' ? sizesRaw : null;

    await onSubmit({
      name,
      description,
      price: Number(price),
      type,
      images,
      sizes,
      active,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-extrabold text-aviva-blue">Produto</h2>
        <Link href="/admin/products" className="text-sm font-semibold text-aviva-blue hover:underline">
          Voltar
        </Link>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="text-sm font-semibold text-aviva-blue">Nome</label>
          <input
            className="mt-1 w-full border rounded-xl p-3 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-aviva-blue">Descrição</label>
          <textarea
            className="mt-1 w-full border rounded-xl p-3 outline-none min-h-[110px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-aviva-blue">Preço</label>
            <input
              type="number"
              className="mt-1 w-full border rounded-xl p-3 outline-none"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-aviva-blue">Tipo</label>
            <select
              className="mt-1 w-full border rounded-xl p-3 outline-none"
              value={type}
              onChange={(e) => setType(e.target.value as ProductType)}
            >
              <option value="roupa">roupa</option>
              <option value="acessorio">acessorio</option>
              <option value="outro">outro</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-aviva-blue">Imagens (1 URL por linha)</label>
          <textarea
            className="mt-1 w-full border rounded-xl p-3 outline-none min-h-[110px]"
            value={imagesText}
            onChange={(e) => setImagesText(e.target.value)}
          />
        </div>

        {type === 'roupa' && (
          <div>
            <label className="text-sm font-semibold text-aviva-blue">Tamanhos (1 por linha)</label>
            <textarea
              className="mt-1 w-full border rounded-xl p-3 outline-none min-h-[90px]"
              value={sizesText}
              onChange={(e) => setSizesText(e.target.value)}
            />
          </div>
        )}

        <label className="inline-flex items-center gap-2 text-sm text-gray-900">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          Produto ativo
        </label>

        <button
          onClick={submit}
          disabled={saving}
          className="mt-2 bg-aviva-blue hover:bg-blue-600 text-white py-3 rounded-xl font-extrabold disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}
