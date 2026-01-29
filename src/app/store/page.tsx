'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

import StoreHeader from './_components/StoreHeader';
import ProductGrid from './_components/ProductGrid';
import CartDrawer from './_components/CartDrawer';
import AccountDrawer from './_components/AccountDrawer';
import ProfileModal from './_components/ProfileModal';
import OrdersModal from './_components/OrdersModal';

import { useCart } from './_context/CartContext';
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
    <section className="bg-[#F8F8F8] min-h-screen relative">
      <StoreHeader onOpenAccount={openAccount} />

      <div className="px-6 py-10 md:px-24">
        <h1 className="text-3xl font-extrabold text-[#1D5176] mb-8 text-center">
          Loja Aviva
        </h1>

        <ProductGrid products={products} loading={loadingProducts} />
      </div>

      {/* Carrinho */}
      {isCartOpen && <CartDrawer onClose={closeCart} />}

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
