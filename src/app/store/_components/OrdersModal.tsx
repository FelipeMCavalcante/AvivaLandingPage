'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Order = {
  id: string;
  created_at: string;
  total: number;
  status: string;
  items: any[];
};

export default function OrdersModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('id,created_at,total,status,items')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (!error) setOrders((data as Order[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold text-[#1D5176] mb-4">
          Histórico de pedidos
        </h2>

        {loading ? (
          <p className="text-gray-600 text-center">Carregando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 text-center">
            Você ainda não possui pedidos.
          </p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {orders.map((o) => (
              <div key={o.id} className="border rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#1D5176]">
                    {new Date(o.created_at).toLocaleString('pt-BR')}
                  </span>
                  <span className="text-yellow-600 font-extrabold">
                    R$ {Number(o.total).toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-1">
                  Status: <span className="font-semibold">{o.status}</span>
                </p>

                <p className="text-xs text-gray-600 mt-2">
                  Itens:{' '}
                  <span className="font-medium">
                    {(o.items ?? [])
                      .map((i: any) => i?.name)
                      .filter(Boolean)
                      .join(', ') || '—'}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
