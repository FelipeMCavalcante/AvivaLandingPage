/* app/compras/page.tsx */
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useState } from 'react';

/* ---------- dado de teste ---------- */
const IMG = '/imgLoja/camisa-pio-marrom.jpg';

/* ---------- produtos ---------- */
const PRODUCTS = [
  { id: 1, name: 'Camiseta FAROL', price: 79.9, image: IMG, category: 'FAROL' },
  { id: 2, name: 'Camiseta MESA', price: 84.9, image: IMG, category: 'MESA' },
  {
    id: 3,
    name: 'Camiseta NÃO TENHA MEDO',
    price: 89.9,
    image: IMG,
    category: 'NÃO TENHA MEDO',
  },
  {
    id: 4,
    name: 'Camiseta Evento Louvor',
    price: 92.9,
    image: IMG,
    category: 'CAMISA EVENTOS',
  },
  {
    id: 5,
    name: 'Camiseta São Padre Pio',
    price: 94.9,
    image: IMG,
    category: 'CAMISA SANTOS',
  },
  {
    id: 6,
    name: 'Terço de Madeira',
    price: 24.9,
    image: IMG,
    category: 'ITENS RELIGIOSOS',
  },
] as const;

export default function ComprasPage() {
  const sections = [
    'FAROL',
    'MESA',
    'NÃO TENHA MEDO',
    'CAMISA EVENTOS',
    'CAMISA SANTOS',
    'ITENS RELIGIOSOS',
  ];

  return (
    <main className='mx-auto max-w-7xl px-4 py-10 bg-white'>
      <h1 className='text-3xl font-bold text-center text-[#01C2CB] mb-12'>
        Loja Aviva
      </h1>

      {sections.map((sec) => (
        <Section
          key={sec}
          title={sec}
          products={PRODUCTS.filter((p) => p.category === sec)}
        />
      ))}
    </main>
  );
}

/* ---------- seção ---------- */
function Section({
  title,
  products,
}: {
  title: string;
  products: (typeof PRODUCTS)[number][];
}) {
  if (!products.length) return null;
  return (
    <section className='mb-14'>
      <h2 className='text-2xl font-semibold text-[#01C2CB] mb-6'>{title}</h2>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

/* ---------- card + modais ---------- */
function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const [qty, setQty] = useState(1);
  const [customerName, setName] = useState('');
  const [customerPhone, setPhone] = useState('');
  const [openOrder, setOpenOrder] = useState(false);
  const [openSuccess, setOpenSucc] = useState(false);

  async function handleOrder() {
    if (!customerName.trim() || !customerPhone.trim()) return;

    await fetch('/api/encomendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
        qty,
        price: product.price,
        customerName,
        customerPhone,
      }),
    });

    setOpenOrder(false);
    setOpenSucc(true);
  }

  /* ---------- modal de pedido ---------- */
  return (
    <>
      <Dialog.Root open={openOrder} onOpenChange={setOpenOrder}>
        {/* CARD */}
        <div className='flex flex-col rounded-xl overflow-hidden shadow-md bg-blue-100 hover:shadow-lg transition'>
          <div className='relative h-48 w-full'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-cover'
              sizes='(min-width:1024px)33vw,(min-width:640px)50vw,100vw'
            />
          </div>
          <div className='flex-1 p-5 flex flex-col text-black'>
            <h3 className='text-lg font-medium mb-1'>{product.name}</h3>
            <p className='text-[#01C2CB] font-semibold mb-4'>
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <Dialog.Trigger asChild>
              <button className='mt-auto rounded-md bg-[#01C2CB] px-4 py-2 font-medium text-white hover:bg-teal-700 transition'>
                Comprar
              </button>
            </Dialog.Trigger>
          </div>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black/50' />
          <Dialog.Content className='fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none text-black'>
            <Dialog.Close asChild>
              <button
                aria-label='Fechar'
                className='absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600'
              >
                &times;
              </button>
            </Dialog.Close>

            <Dialog.Title className='text-xl font-semibold mb-4'>
              {product.name}
            </Dialog.Title>

            <div className='relative w-full h-56 mb-6'>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className='object-contain'
                sizes='100vw'
              />
            </div>

            {/* formulário */}
            <label className='block mb-3'>
              <span className='block font-medium'>Nome *</span>
              <input
                className='mt-1 w-full rounded border px-3 py-2'
                value={customerName}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className='block mb-6'>
              <span className='block font-medium'>Telefone *</span>
              <input
                className='mt-1 w-full rounded border px-3 py-2'
                value={customerPhone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            {/* quantidade */}
            <div className='flex items-center gap-4 mb-6'>
              <span className='font-medium'>Quantidade:</span>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className='h-8 w-8 rounded bg-gray-200'
              >
                –
              </button>
              <input
                type='number'
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className='w-12 text-center border rounded'
              />
              <button
                onClick={() => setQty((q) => q + 1)}
                className='h-8 w-8 rounded bg-gray-200'
              >
                +
              </button>
            </div>

            <button
              onClick={handleOrder}
              className='w-full rounded-md bg-[#01C2CB] py-2 font-medium text-white hover:bg-teal-700 transition'
            >
              Fazer encomenda
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ---------- modal de sucesso ---------- */}
      <Dialog.Root open={openSuccess} onOpenChange={setOpenSucc}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black/50' />
          <Dialog.Content className='fixed top-1/2 left-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg text-center text-black'>
            <Dialog.Title className='text-xl font-semibold mb-4'>
              Encomenda enviada!
            </Dialog.Title>
            <p className='mb-6'>
              Obrigado, <b>{customerName || 'amigo(a)'}</b>. Em breve entraremos
              em contato no número informado.
            </p>
            <Dialog.Close asChild>
              <button className='mx-auto rounded-md bg-[#01C2CB] px-4 py-2 font-medium text-white hover:bg-teal-700 transition'>
                Fechar
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
