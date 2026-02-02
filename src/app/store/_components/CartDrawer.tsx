'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useCart } from '../_context/CartContext';
import { OrderItem } from '@/app/_types/shop';

interface CartDrawerProps {
  onClose: () => void;
  onFinish?: (items: OrderItem[], total: number) => void;
}

export default function CartDrawer({ onClose, onFinish }: CartDrawerProps) {
  const router = useRouter();
  const { cart, total, removeItem, clearCart } = useCart();

  const finish = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      onClose();
      router.push('/login?from=store');
      return;
    }

    const meta = data.user.user_metadata ?? {};
    const rawName = typeof meta.name === 'string' ? meta.name : '';
    const customer_name = rawName.trim() ? rawName : data.user.email ?? 'Cliente';

    const rawPhone = typeof meta.phone === 'string' ? meta.phone : '';
    const customer_phone = rawPhone.trim() ? rawPhone : null;

    const itemsCopy = [...cart] as OrderItem[];
    const totalCopy = total;

    await supabase.from('orders').insert({
      user_id: data.user.id,
      customer_name,
      customer_phone,
      items: itemsCopy,
      total: totalCopy,
      status: 'aguardando comprovante',
    });

    onClose();
    clearCart();

    if (onFinish) {
      onFinish(itemsCopy, totalCopy);
    } else {
      router.push('/store?paid=1');
    }
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl p-6 z-40 overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-[#1D5176] flex justify-between">
        Seu Carrinho
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </h3>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-12">
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="flex justify-between items-center border-b py-2 text-[#1D5176]"
            >
              <p className="pr-3">
                {item.name}{' '}
                {item.size && (
                  <span className="text-gray-500 text-xs ml-1">
                    ({item.size})
                  </span>
                )}
              </p>

              <button
                onClick={() => removeItem(i)}
                className="text-red-500 text-xs hover:underline font-bold"
              >
                remover
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-lg font-semibold text-blue-600">
              Total:{' '}
              <span className="text-yellow-600">R$ {total.toFixed(2)}</span>
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            <button
              onClick={finish}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-semibold"
            >
              Finalizar compra
            </button>

            <button
              onClick={clearCart}
              className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl transition font-semibold"
            >
              Limpar carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
}
