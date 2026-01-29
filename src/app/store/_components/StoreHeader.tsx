'use client';

import { FaUserCircle } from 'react-icons/fa';
import { useCart } from '../_context/CartContext';

export default function StoreHeader({
  onOpenAccount,
}: {
  onOpenAccount: () => void;
}) {
  const { cart, toggleCart } = useCart();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative">
      <h2 className="text-[#1D5176] text-lg font-semibold">Loja Aviva</h2>

      <img
        src="/avivablue.png"
        alt="Logo Aviva"
        className="h-12 object-contain absolute left-1/2 transform -translate-x-1/2"
      />

      <div className="flex items-center gap-4">
        {/* Carrinho */}
        <button
          onClick={toggleCart}
          className="relative bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full shadow-lg transition"
        >
          <img
            src="/imgLoja/carro.png"
            alt="Carrinho"
            className="w-6 h-6 object-contain"
          />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </button>

        {/* Perfil (abre menu lateral) */}
        <button
          onClick={onOpenAccount}
          className="text-[#1D5176] hover:text-blue-700 transition"
          title="Minha conta"
        >
          <FaUserCircle size={32} />
        </button>
      </div>
    </header>
  );
}
