'use client';

import { FaUserCircle } from 'react-icons/fa';
import { useCart } from '../_context/CartContext';
import Link from 'next/link';

export default function StoreHeader({
  onOpenAccount,
}: {
  onOpenAccount: () => void;
}) {
  const { cart, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/store" className="flex items-center gap-3 group">
          <img
            src="/avivablue.png"
            alt="Logo Aviva"
            className="h-10 object-contain group-hover:opacity-80 transition-opacity"
          />
          <span className="text-aviva-blue text-xl font-bold tracking-tight">
            Store
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Carrinho */}
          <button
            onClick={toggleCart}
            className="relative group p-2 rounded-full hover:bg-gray-50 transition"
          >
            <div className="relative">
              <img
                src="/imgLoja/carro.png"
                alt="Carrinho"
                className="w-7 h-7 object-contain opacity-90 group-hover:opacity-100 transition"
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cart.length}
                </span>
              )}
            </div>
          </button>

          {/* Perfil */}
          <button
            onClick={onOpenAccount}
            className="text-gray-400 hover:text-aviva-blue transition transform hover:scale-105"
            title="Minha conta"
          >
            <FaUserCircle size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
