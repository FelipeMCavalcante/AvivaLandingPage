'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type ProductType = 'roupa' | 'acessorio' | 'outro';

type ProductRow = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  images: string[];
  sizes: string[] | null;
  active: boolean;
  created_at: string;
};

export default function AdminProductsPage() {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((p) => p.name.toLowerCase().includes(s));
  }, [rows, q]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, type, images, sizes, active, created_at')
      .order('created_at', { ascending: false });

    if (!error) setRows((data as ProductRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from('products').update({ active: !current }).eq('id', id);
    await load();
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-extrabold text-[#1D5176]">Produtos</h2>

        <div className="flex gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar produto..."
            className="border rounded-lg px-3 py-2 text-black w-full md:w-64"
          />
          <a
            href="/admin/products/new"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition whitespace-nowrap"
          >
            + Novo Produto
          </a>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Carregando...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600">Nenhum produto encontrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#1D5176]">
                <th className="py-2">Nome</th>
                <th className="py-2">Tipo</th>
                <th className="py-2">Preço</th>
                <th className="py-2">Ativo</th>
                <th className="py-2">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-3">{p.name}</td>
                  <td className="py-3">{p.type}</td>
                  <td className="py-3">R$ {Number(p.price).toFixed(2)}</td>
                  <td className="py-3">
                    <button
                      onClick={() => toggleActive(p.id, p.active)}
                      className={`px-3 py-1 rounded-lg text-white text-xs font-semibold ${
                        p.active ? 'bg-green-600' : 'bg-gray-400'
                      }`}
                    >
                      {p.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="py-3">
                    <a
                      href={`/admin/products/${p.id}`}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Editar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
