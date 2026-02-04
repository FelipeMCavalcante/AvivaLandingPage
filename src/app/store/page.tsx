'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

import StoreHeader from './_components/StoreHeader';
import StoreFooter from './_components/StoreFooter';
import ProductGrid from './_components/ProductGrid';
import CartDrawer from './_components/CartDrawer';
import AccountDrawer from './_components/AccountDrawer';
import ProfileModal from './_components/ProfileModal';
import OrdersModal from './_components/OrdersModal';
import CheckoutModal from './_components/CheckoutModal';

import { useCart } from './_context/CartContext';
import { OrderItem } from '@/app/_types/shop';
import { listProducts, type Product } from './_services/products';

const ADMIN_EMAIL = 'felipe.de.moraes.cavalcante@gmail.com';

export default function StorePage() {
  const router = useRouter();
  const { isCartOpen, closeCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [accountOpen, setAccountOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{ items: OrderItem[], total: number } | null>(null);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');

  const isAdmin = useMemo(
    () => (userEmail ? userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase() : false),
    [userEmail]
  );

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await listProducts();
      setProducts(Array.isArray(data) ? data.filter(Boolean) : []);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadUser = async () => {
    const { data } = await supabase.auth.getUser();
    const u = data.user;

    if (!u) {
      setUserEmail(null);
      setUserName('');
      setUserPhone('');
      return;
    }

    const meta = u.user_metadata ?? {};
    setUserEmail(u.email ?? null);
    setUserName(typeof meta.name === 'string' ? meta.name : '');
    setUserPhone(typeof meta.phone === 'string' ? meta.phone : '');
  };

  useEffect(() => {
    loadProducts();
    loadUser();
  }, []);

  const openAccount = async () => {
    await loadUser();

    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push('/login?from=store');
      return;
    }

    setAccountOpen(true);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAccountOpen(false);
    setProfileOpen(false);
    setOrdersOpen(false);
    await loadUser();
    router.push('/store');
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <StoreHeader onOpenAccount={openAccount} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-aviva-blue to-blue-600 text-white pt-24 pb-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Bem-vindo à Loja Aviva
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Descubra nossa coleção exclusiva. Moda, estilo e qualidade que você merece, tudo em um só lugar.
          </p>
        </div>
      </div>

      <main className="flex-grow -mt-20 z-10 relative px-6">
        <div className="max-w-7xl mx-auto">
          {/* Featured Products / Grid */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-aviva-blue pl-4">
              Produtos em Destaque
            </h2>
            <ProductGrid products={products} loading={loadingProducts} />
          </div>
        </div>
      </main>

      <StoreFooter />

      {/* Carrinho */}
      {isCartOpen && (
        <CartDrawer
          onClose={closeCart}
          onFinish={(items, total) => setCheckoutData({ items, total })}
        />
      )}

      {/* Modal Checkout (WhatsApp) */}
      {checkoutData && (
        <CheckoutModal
          items={checkoutData.items}
          total={checkoutData.total}
          onClose={() => setCheckoutData(null)}
        />
      )}

      {/* Drawer da conta */}
      {accountOpen && (
        <AccountDrawer
          userEmail={userEmail}
          userName={userName || null}
          isAdmin={isAdmin}
          onClose={() => setAccountOpen(false)}
          onOpenProfile={() => {
            setAccountOpen(false);
            setProfileOpen(true);
          }}
          onOpenOrders={() => {
            setAccountOpen(false);
            setOrdersOpen(true);
          }}
          onGoAdmin={() => router.push('/admin')}
          onLogout={logout}
        />
      )}

      {/* Modal Perfil */}
      {profileOpen && (
        <ProfileModal
          initialName={userName}
          initialPhone={userPhone}
          email={userEmail}
          onClose={() => setProfileOpen(false)}
          onSaved={(name, phone) => {
            setUserName(name);
            setUserPhone(phone);
          }}
        />
      )}

      {/* Modal Pedidos */}
      {ordersOpen && <OrdersModal onClose={() => setOrdersOpen(false)} />}
    </section>
  );
}
