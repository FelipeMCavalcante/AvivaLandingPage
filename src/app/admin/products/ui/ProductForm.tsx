'use client';

import { useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { ProductRow } from '../[id]/page';

type ProductType = 'roupa' | 'acessorio' | 'outro';

const DEFAULT_SIZES = ['PP', 'P', 'M', 'G', 'GG'];

export default function ProductForm({
  mode,
  product,
}: {
  mode: 'create' | 'edit';
  product?: ProductRow;
}) {
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(String(product?.price ?? ''));
  const [type, setType] = useState<ProductType>((product?.type as ProductType) ?? 'roupa');
  const [active, setActive] = useState(product?.active ?? true);

  // (simples) imagens via URLs (uma por linha)
  const [imagesText, setImagesText] = useState((product?.images ?? []).join('\n'));

  // tamanhos só se roupa (um por linha)
  const [sizesText, setSizesText] = useState(
    (product?.sizes ?? DEFAULT_SIZES).join('\n')
  );

  const [loading, setLoading] = useState(false);

  const images = useMemo(
    () => imagesText.split('\n').map((s) => s.trim()).filter(Boolean),
    [imagesText]
  );

  const sizes = useMemo(() => {
    if (type !== 'roupa') return null;
    return sizesText.split('\n').map((s) => s.trim()).filter(Boolean);
  }, [sizesText, type]);

  const save = async () => {
    setLoading(true);
    try {
      if (!name.trim()) throw new Error('Nome obrigatório');
      const priceNumber = Number(price);
      if (Number.isNaN(priceNumber) || priceNumber <= 0) throw new Error('Preço inválido');
      if (images.length === 0) throw new Error('Informe ao menos 1 imagem (URL)');

      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: priceNumber,
        type,
        images,
        sizes,
        active,
      };

      if (mode === 'create') {
        const { error } = await supabase.from('products').insert(payload);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').update(payload).eq('id', product!.id);
        if (error) throw error;
      }

      window.location.href = '/admin/products';
    } catch (e: any) {
      alert(e?.message ?? 'Erro ao salvar produto');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-[#1D5176]">
          {mode === 'create' ? 'Novo Produto' : 'Editar Produto'}
        </h2>

        <a href="/admin/products" className="text-[#1D5176] hover:underline font-semibold">
          Voltar
        </a>
      </div>

      <div className="grid gap-4">
        <label className="text-sm font-semibold text-[#1D5176]">
          Nome
          <input
            className="mt-1 w-full border rounded-lg p-2 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="text-sm font-semibold text-[#1D5176]">
          Descrição
          <textarea
            className="mt-1 w-full border rounded-lg p-2 text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="text-sm font-semibold text-[#1D5176]">
            Preço
            <input
              className="mt-1 w-full border rounded-lg p-2 text-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="decimal"
            />
          </label>

          <label className="text-sm font-semibold text-[#1D5176]">
            Tipo
            <select
              className="mt-1 w-full border rounded-lg p-2 text-black"
              value={type}
              onChange={(e) => setType(e.target.value as ProductType)}
            >
              <option value="roupa">roupa</option>
              <option value="acessorio">acessorio</option>
              <option value="outro">outro</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-[#1D5176]">
            Ativo
            <select
              className="mt-1 w-full border rounded-lg p-2 text-black"
              value={active ? 'true' : 'false'}
              onChange={(e) => setActive(e.target.value === 'true')}
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </label>
        </div>

        <label className="text-sm font-semibold text-[#1D5176]">
          Imagens (URLs) - 1 por linha
          <textarea
            className="mt-1 w-full border rounded-lg p-2 text-black"
            value={imagesText}
            onChange={(e) => setImagesText(e.target.value)}
            rows={5}
            placeholder="https://.../img1.jpg&#10;https://.../img2.jpg"
          />
        </label>

        {type === 'roupa' && (
          <label className="text-sm font-semibold text-[#1D5176]">
            Tamanhos (1 por linha)
            <textarea
              className="mt-1 w-full border rounded-lg p-2 text-black"
              value={sizesText}
              onChange={(e) => setSizesText(e.target.value)}
              rows={4}
              placeholder="PP&#10;P&#10;M&#10;G&#10;GG"
            />
          </label>
        )}

        <button
          onClick={save}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl transition"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}
