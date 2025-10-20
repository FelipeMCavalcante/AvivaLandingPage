'use client';

import { useState } from 'react';

/* ───────── Tipos ───────── */
type ProductType = 'roupa' | 'acessorio' | 'outro';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: ProductType;
}

interface CartItem extends Product {
  size?: string | null;
}

/* ───────── Dados ───────── */
const products: Product[] = [
  {
    id: 1,
    name: 'Camisa Aviva Branca',
    description: 'Modelo clássico branco com logo Aviva estampado.',
    price: 49.9,
    image: '/camisa-branca.jpg',
    type: 'roupa',
  },
  {
    id: 2,
    name: 'Camisa Aviva Azul',
    description: 'Edição especial azul com detalhes modernos.',
    price: 49.9,
    image: '/camisa-azul.jpg',
    type: 'roupa',
  },
  {
    id: 3,
    name: 'Caneca Aviva',
    description: 'Caneca oficial do Aviva feita em cerâmica.',
    price: 29.9,
    image: '/caneca.jpg',
    type: 'acessorio',
  },
];

/* ───────── Componente principal ───────── */
export default function StorePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const addToCart = (product: Product) => {
    if (product.type === 'roupa') {
      setSelectedProduct(product);
      setShowSizeModal(true);
    } else {
      setCart((prev) => [...prev, { ...product, size: null }]);
    }
  };

  const confirmSize = (size: string) => {
    if (!selectedProduct) return;
    setCart((prev) => [...prev, { ...selectedProduct, size }]);
    setShowSizeModal(false);
    setSelectedProduct(null);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  return (
    <section id='store' className='bg-[#F8F8F8] min-h-screen'>
      <img
        src='/onda-amarela.svg'
        alt='Divisor decorativo'
        className='w-full h-auto'
      />

      <div className='px-6 py-12 md:px-24'>
        <h2 className='text-3xl font-extrabold text-[#1D5176] mb-8 text-center'>
          Loja Aviva
        </h2>

        {/* Produtos */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {products.map((p) => (
            <div
              key={p.id}
              className='bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center'
            >
              <img
                src={p.image}
                alt={p.name}
                className='rounded-lg w-full h-64 object-cover mb-4'
              />
              <h3 className='font-bold text-lg text-[#1D5176]'>{p.name}</h3>
              <p className='text-gray-600 text-sm mb-3'>{p.description}</p>
              <p className='text-yellow-600 font-semibold text-lg mb-3'>
                R$ {p.price.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart(p)}
                className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition'
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>

        {/* Carrinho */}
        {cart.length > 0 && (
          <div className='bg-white shadow-lg rounded-2xl p-6 mt-12 max-w-2xl mx-auto'>
            <h3 className='text-xl font-bold mb-4 text-[#1D5176]'>
              Seu Carrinho
            </h3>

            {cart.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className='flex justify-between items-center border-b py-2'
              >
                <p>
                  {item.name}
                  {item.size && (
                    <span className='text-gray-500 text-sm ml-2'>
                      ({item.size})
                    </span>
                  )}{' '}
                  —{' '}
                  <span className='text-yellow-600 font-medium'>
                    R$ {item.price.toFixed(2)}
                  </span>
                </p>
                <button
                  onClick={() => removeFromCart(i)}
                  className='text-red-500 text-sm hover:underline'
                >
                  remover
                </button>
              </div>
            ))}

            <div className='text-right mt-4'>
              <p className='text-lg font-semibold'>
                Total:{' '}
                <span className='text-yellow-600'>R$ {total.toFixed(2)}</span>
              </p>
            </div>

            <div className='text-center mt-6'>
              <button
                onClick={() => setShowPayment(true)}
                className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition'
              >
                Finalizar compra
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de tamanho */}
      {showSizeModal && selectedProduct && (
        <SizeModal
          product={selectedProduct}
          onSelect={confirmSize}
          onClose={() => setShowSizeModal(false)}
        />
      )}

      {/* Modal de pagamento */}
      {showPayment && (
        <PaymentModal
          cart={cart}
          total={total}
          onClose={() => setShowPayment(false)}
        />
      )}
    </section>
  );
}

/* ───────── Modal de Tamanho ───────── */
function SizeModal({
  product,
  onSelect,
  onClose,
}: {
  product: Product;
  onSelect: (size: string) => void;
  onClose: () => void;
}) {
  const sizes = ['PP', 'P', 'M', 'G', 'GG'];
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
      <div className='bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-4 text-gray-400 hover:text-gray-600'
        >
          ✕
        </button>
        <h2 className='text-xl font-bold mb-4 text-[#1D5176]'>
          Selecione o tamanho
        </h2>
        <p className='mb-6 text-gray-600'>{product.name}</p>
        <div className='flex justify-center gap-3 flex-wrap'>
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => onSelect(s)}
              className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition'
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── Modal de Pagamento ───────── */
function PaymentModal({
  cart,
  total,
  onClose,
}: {
  cart: CartItem[];
  total: number;
  onClose: () => void;
}) {
  const chavePix = 'chavepix@aviva.com';
  const whatsapp = '5585986075881';

  const itensTexto = cart
    .map(
      (item) =>
        `• ${item.name}${
          item.size ? ` (${item.size})` : ''
        } - R$ ${item.price.toFixed(2)}`
    )
    .join('%0A');

  const mensagem = `Olá!%0ASegue meu comprovante de pagamento da loja Aviva.%0A%0A🛍️ *Itens comprados:*%0A${itensTexto}%0A%0A💰 *Total:* R$ ${total.toFixed(
    2
  )}%0A%0A🕊️ Aguardando confirmação do pagamento.`;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
      <div className='bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-4 text-gray-400 hover:text-gray-600'
        >
          ✕
        </button>

        <h2 className='text-2xl font-bold text-[#1D5176] mb-4'>
          Pagamento via Pix
        </h2>

        <img
          src='/pix.png'
          alt='QR Code Pix'
          className='mx-auto mb-4 w-48 h-48 object-contain'
        />

        <p className='text-gray-700 mb-2'>Chave Pix:</p>
        <p className='font-mono text-lg font-semibold mb-4'>{chavePix}</p>

        <p className='text-gray-700 mb-4'>
          Valor total: <strong>R$ {total.toFixed(2)}</strong>
        </p>

        <p className='text-gray-600 mb-6 text-sm'>
          *Seu pedido será produzido e enviado após a confirmação do pagamento.*
        </p>

        <a
          href={`https://wa.me/${whatsapp}?text=${mensagem}`}
          target='_blank'
          className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block mb-3 transition'
        >
          Enviar comprovante para o vendedor
        </a>

        <button
          onClick={onClose}
          className='text-gray-500 underline text-sm mt-2'
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
