'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { OrderItem } from '@/app/_types/shop';

interface CheckoutModalProps {
  items: OrderItem[];
  total: number;
  onClose: () => void;
}

export default function CheckoutModal({ items, total, onClose }: CheckoutModalProps) {
  const WHATSAPP_NUMBER = '5585986075881';

  const formatMessage = () => {
    let message = `*Novo Pedido - Loja Aviva*\n\n`;
    message += `Gostaria de finalizar meu pedido com os seguintes itens:\n\n`;

    const grouped = items.reduce((acc: Record<string, OrderItem & { quantity: number }>, item) => {
      const key = `${item.name}-${item.size || ''}`;
      if (!acc[key]) acc[key] = { ...item, quantity: 0 };
      acc[key].quantity++;
      return acc;
    }, {});

    Object.values(grouped).forEach((item) => {
      message += `• *${item.quantity}x ${item.name}*${item.size ? ` (${item.size})` : ''} - R$ ${(Number(item.price) * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total: R$ ${total.toFixed(2)}*\n\n`;
    message += `Aguardo instruções para o pagamento.`;

    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${formatMessage()}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-800 transition"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-aviva-blue">Pedido Recebido!</h2>
          <p className="text-gray-800 mt-2">
            Seu pedido foi registrado em nosso sistema.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
          <h3 className="font-bold text-aviva-blue mb-3 text-sm uppercase tracking-wider">Resumo do Pedido</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {Object.values(items.reduce((acc: Record<string, OrderItem & { quantity: number }>, item) => {
              const key = `${item.name}-${item.size || ''}`;
              if (!acc[key]) acc[key] = { ...item, quantity: 0 };
              acc[key].quantity++;
              return acc;
            }, {})).map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-900">
                  {item.quantity}x {item.name} {item.size && <span className="text-gray-600 text-xs">({item.size})</span>}
                </span>
                <span className="font-semibold text-aviva-blue">R$ {(Number(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-extrabold text-aviva-blue">
              R$ {total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-3 shadow-lg hover:shadow-green-200/50"
          >
            <FaWhatsapp size={24} />
            Enviar via WhatsApp
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 text-sm transition"
          >
            Voltar para a loja
          </button>
        </div>

        <p className="text-[10px] text-gray-500 text-center mt-4">
          Ao clicar em enviar, você será redirecionado para o WhatsApp.
        </p>
      </div>
    </div>
  );
}
