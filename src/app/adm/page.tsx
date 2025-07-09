/* app/adm/page.tsx */
'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: string;
  productName: string;
  qty: number;
  price: number;
  customerName: string;
  customerPhone: string;
  createdAt: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = () =>
    fetch('/api/encomendas')
      .then((r) => r.json())
      .then(setOrders);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function clearOrders() {
    if (!confirm('Tem certeza que deseja limpar todas as encomendas?')) return;
    setLoading(true);
    await fetch('/api/encomendas', { method: 'DELETE' });
    setOrders([]);
    setLoading(false);
  }

  const grouped = orders.reduce<Record<string, Order[]>>((acc, o) => {
    (acc[o.productName] ||= []).push(o);
    return acc;
  }, {});

  return (
    <main className='mx-auto max-w-5xl px-4 py-10 bg-white text-black'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-[#01C2CB]'>
          Admin • Encomendas
        </h1>
        <button
          onClick={clearOrders}
          disabled={loading}
          className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50'
        >
          Limpar encomendas
        </button>
      </div>

      {orders.length === 0 ? (
        <p className='text-center text-gray-500'>
          Nenhuma encomenda registrada.
        </p>
      ) : (
        Object.entries(grouped).map(([product, list]) => (
          <section key={product} className='mb-10'>
            <h2 className='text-2xl font-semibold text-[#01C2CB] mb-4'>
              {product}
            </h2>

            <div className='border rounded-lg overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='bg-blue-100'>
                  <tr>
                    <th className='py-2 px-3 text-left'>Data</th>
                    <th className='py-2 px-3 text-left'>Nome</th>
                    <th className='py-2 px-3 text-left'>Telefone</th>
                    <th className='py-2 px-3 text-left'>Qtd</th>
                    <th className='py-2 px-3 text-left'>Preço un.</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((o) => (
                    <tr key={o.id} className='odd:bg-blue-50'>
                      <td className='py-2 px-3'>
                        {new Date(o.createdAt).toLocaleString('pt-BR')}
                      </td>
                      <td className='py-2 px-3'>{o.customerName}</td>
                      <td className='py-2 px-3'>{o.customerPhone}</td>
                      <td className='py-2 px-3'>{o.qty}</td>
                      <td className='py-2 px-3'>
                        {o.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}
    </main>
  );
}
