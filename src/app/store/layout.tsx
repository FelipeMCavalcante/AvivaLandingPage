'use client';

import { CartProvider } from './_context/CartContext';

export default function StoreLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      {modal}
    </CartProvider>
  );
}
