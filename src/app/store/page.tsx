'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

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

interface UserData {
  name?: string;
  phone?: string;
  email?: string;
}

interface Order {
  id: string;
  created_at: string;
  total: number;
  status?: string;
  items: CartItem[];
}

/* ───────── Produtos ───────── */
const products: Product[] = [
  {
    id: 1,
    name: 'Camisa Aviva Branca',
    description: 'Modelo clássico branco com logo Aviva estampado.',
    price: 49.9,
    image: '/imgLoja/camisa-pio-marrom.jpg',
    type: 'roupa',
  },
  {
    id: 2,
    name: 'Camisa Aviva Azul',
    description: 'Edição especial azul com detalhes modernos.',
    price: 49.9,
    image: '/imgLoja/camisa-pio-marrom.jpg',
    type: 'roupa',
  },
  {
    id: 3,
    name: 'Caneca Aviva',
    description: 'Caneca oficial do Aviva feita em cerâmica.',
    price: 29.9,
    image: '/imgLoja/camisa-pio-marrom.jpg',
    type: 'acessorio',
  },
];

/* ───────── Página ───────── */
export default function StorePage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [showPayment, setShowPayment] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  /* ───────── Carregar usuário + carrinho (localStorage + Supabase) ───────── */
  useEffect(() => {
    const init = async () => {
      // 1) Carrega do localStorage
      let localCart: CartItem[] = [];
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('cart');
        if (saved) {
          try {
            localCart = JSON.parse(saved) as CartItem[];
          } catch {
            localCart = [];
          }
        }
      }

      let finalCart = localCart;

      // 2) Verifica usuário logado e carrega carrinho do Supabase
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { name, phone } = data.user.user_metadata || {};
        setUserData({ name, phone, email: data.user.email });
        setUserId(data.user.id);

        const { data: cartRow } = await supabase
          .from('carts')
          .select('items')
          .eq('user_id', data.user.id)
          .single();

        if (cartRow?.items && Array.isArray(cartRow.items)) {
          const dbCart = cartRow.items as CartItem[];
          if (finalCart.length === 0) {
            finalCart = dbCart;
          } else {
            finalCart = [...finalCart, ...dbCart];
          }
        }
      }

      setCart(finalCart);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(finalCart));
      }
    };

    init();
  }, []);

  /* ───────── Sincronizar carrinho (localStorage + Supabase) ───────── */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    if (!userId) return;

    (async () => {
      await supabase.from('carts').upsert({ user_id: userId, items: cart });
    })();
  }, [cart, userId]);

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

  const handleCartClick = async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push('/login?from=store');
    } else {
      setIsCartOpen(!isCartOpen);
    }
  };

  const handleProfileClick = () => setShowAccountPanel(true);

  const handleLogout = () => {
    (async () => {
      await supabase.auth.signOut();
      setUserData(null);
      setUserId(null);
      setCart([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
      setShowAccountPanel(false);
      router.push('/store');
    })();
  };

  const handleOpenOrders = () => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/login?from=store');
        return;
      }
      setShowAccountPanel(false);
      setOrdersLoading(true);
      const { data: ordersData } = await supabase
        .from('orders')
        .select('id, created_at, total, status, items')
        .eq('user_id', data.user.id)
        .order('created_at', { ascending: false });

      setOrders((ordersData as Order[]) || []);
      setOrdersLoading(false);
      setShowOrdersModal(true);
    })();
  };

  const handleFinishPurchase = () => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const meta = data.user.user_metadata || {};

        const rawName = typeof meta.name === 'string' ? meta.name : '';
        const customerName =
          rawName.trim() !== '' ? rawName : data.user.email ?? 'Cliente';

        const rawPhone = typeof meta.phone === 'string' ? meta.phone : '';
        const customerPhone = rawPhone.trim() !== '' ? rawPhone : null;

        await supabase.from('orders').insert({
          user_id: data.user.id,
          customer_name: customerName,
          customer_phone: customerPhone,
          items: cart,
          total,
          status: 'aguardando comprovante',
        });
      }
      setIsCartOpen(false);
      setShowPayment(true);
    })();
  };

  const greeting = userData?.name
    ? `Olá, ${userData.name.split(' ')[0]}!`
    : 'Olá, Aviver!';

  const handlePaymentClose = () => {
    setShowPayment(false);
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  };

  return (
    <section className='bg-[#F8F8F8] min-h-screen relative'>
      {/* ───────── HEADER ───────── */}
      <header className='flex justify-between items-center px-6 py-4 bg-white shadow-md relative'>
        <h2 className='text-[#1D5176] text-lg font-semibold'>{greeting}</h2>

        <img
          src='/avivablue.png'
          alt='Logo Aviva'
          className='h-12 object-contain absolute left-1/2 transform -translate-x-1/2'
        />

        <div className='flex items-center gap-4'>
          <button
            onClick={handleCartClick}
            className='relative bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full shadow-lg transition'
          >
            <img
              src='/imgLoja/carro.png'
              alt='Carrinho'
              className='w-6 h-6 object-contain'
            />
            {cart.length > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5'>
                {cart.length}
              </span>
            )}
          </button>

          <button
            onClick={handleProfileClick}
            className='text-[#1D5176] hover:text-blue-700 transition'
          >
            <FaUserCircle size={32} />
          </button>
        </div>
      </header>

      {/* ───────── CONTEÚDO ───────── */}
      <div className='px-6 py-12 md:px-24'>
        <h2 className='text-3xl font-extrabold text-[#1D5176] mb-8 text-center'>
          Loja Aviva
        </h2>

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
      </div>

      {/* ───────── CARRINHO ───────── */}
      {isCartOpen && (
        <CartPanel
          cart={cart}
          total={total}
          removeFromCart={removeFromCart}
          onClose={() => setIsCartOpen(false)}
          onFinish={handleFinishPurchase}
        />
      )}

      {/* ───────── MODAIS ───────── */}
      {showSizeModal && selectedProduct && (
        <SizeModal
          product={selectedProduct}
          onSelect={confirmSize}
          onClose={() => setShowSizeModal(false)}
        />
      )}

      {showPayment && (
        <PaymentModal cart={cart} total={total} onClose={handlePaymentClose} />
      )}

      {showProfileModal && (
        <ProfileModal
          userData={userData}
          onClose={() => setShowProfileModal(false)}
          onLogin={() => router.push('/login?from=store')}
        />
      )}

      {showAccountPanel && (
        <AccountPanel
          onClose={() => setShowAccountPanel(false)}
          onProfile={() => {
            setShowAccountPanel(false);
            setShowProfileModal(true);
          }}
          onOrders={handleOpenOrders}
          onDonate={() => {
            setShowAccountPanel(false);
            setShowDonationModal(true);
          }}
          onLogout={handleLogout}
        />
      )}

      {showOrdersModal && (
        <OrdersModal
          orders={orders}
          loading={ordersLoading}
          onClose={() => setShowOrdersModal(false)}
        />
      )}

      {showDonationModal && (
        <DonationModal onClose={() => setShowDonationModal(false)} />
      )}
    </section>
  );
}

/* ───────── COMPONENTES ───────── */

function CartPanel({
  cart,
  total,
  removeFromCart,
  onClose,
  onFinish,
}: {
  cart: CartItem[];
  total: number;
  removeFromCart: (index: number) => void;
  onClose: () => void;
  onFinish: () => void;
}) {
  return (
    <div className='fixed top-0 right-0 w-80 h-full bg-white shadow-2xl p-6 z-40 overflow-y-auto'>
      <h3 className='text-xl font-bold mb-4 text-[#1D5176] flex justify-between'>
        Seu Carrinho
        <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
          ✕
        </button>
      </h3>
      {cart.length === 0 ? (
        <p className='text-gray-500 text-sm text-center mt-12'>
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div
              key={i}
              className='flex justify-between items-center border-b py-2 text-[#1D5176]'
            >
              <p>
                {item.name}{' '}
                {item.size && (
                  <span className='text-gray-500 text-xs ml-1'>
                    ({item.size})
                  </span>
                )}
              </p>
              <button
                onClick={() => removeFromCart(i)}
                className='text-red-500 text-xs hover:underline font-bold'
              >
                remover
              </button>
            </div>
          ))}
          <div className='text-right mt-4'>
            <p className='text-lg font-semibold text-blue-600'>
              Total:{' '}
              <span className='text-yellow-600'>R$ {total.toFixed(2)}</span>
            </p>
          </div>
          <div className='text-center mt-6'>
            <button
              onClick={onFinish}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition'
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
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
  const [sent, setSent] = useState(false);

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
  const mensagem = `Olá!%0ASegue meu comprovante.%0A🛍️ Itens:%0A${itensTexto}%0A💰 Total: R$ ${total.toFixed(
    2
  )}`;

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
          src='/qr-pix.png'
          alt='QR Code Pix'
          className='mx-auto mb-4 w-48 h-48 object-contain'
        />
        <p className='text-gray-700 mb-2'>Chave Pix:</p>
        <p className='font-mono text-lg font-semibold mb-4'>{chavePix}</p>
        <p className='text-gray-700 mb-4'>
          Valor total: <strong>R$ {total.toFixed(2)}</strong>
        </p>
        <p className='text-red-600 font-semibold mb-6'>
          ⚠️ O pedido só será confirmado após o envio do comprovante.
        </p>

        <div className='flex flex-col sm:flex-row justify-center items-center gap-3'>
          <a
            href={`https://wa.me/${whatsapp}?text=${mensagem}`}
            target='_blank'
            onClick={() => setSent(true)}
            className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block transition'
          >
            Enviar comprovante
          </a>

          {sent && (
            <button
              onClick={onClose}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition'
            >
              Finalizar, enviei o comprovante
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────── Modal de Perfil ───────── */
function ProfileModal({
  userData,
  onClose,
  onLogin,
}: {
  userData: UserData | null;
  onClose: () => void;
  onLogin: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name: userData?.name || '',
    phone: userData?.phone || '',
  });

  const handleSave = () => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        await supabase.auth.updateUser({
          data: {
            name: formData.name,
            phone: formData.phone,
          },
        });
        setIsEditing(false);
      }
    })();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
      <div className='bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-4 text-gray-400 hover:text-gray-600'
        >
          ✕
        </button>

        {userData ? (
          <>
            <h2 className='text-2xl font-bold text-[#1D5176] mb-4'>
              Seu Perfil
            </h2>

            {isEditing ? (
              <>
                <input
                  type='text'
                  placeholder='Nome'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='border rounded-lg w-full mb-3 p-2 text-black'
                />
                <input
                  type='text'
                  placeholder='Telefone'
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className='border rounded-lg w-full mb-4 p-2 text-black'
                />
                <button
                  onClick={handleSave}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg'
                >
                  Salvar
                </button>
              </>
            ) : (
              <>
                <p className='text-gray-700 mb-2'>
                  <strong>Nome:</strong> {userData.name || '—'}
                </p>
                <p className='text-gray-700 mb-2'>
                  <strong>Telefone:</strong> {userData.phone || '—'}
                </p>
                <p className='text-gray-700 mb-6'>
                  <strong>E-mail:</strong> {userData.email || '—'}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg'
                >
                  Atualizar dados
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className='text-2xl font-bold text-[#1D5176] mb-4'>
              Bem-vindo!
            </h2>
            <p className='text-gray-600 mb-6'>
              Para acessar seu perfil e acompanhar pedidos, faça login.
            </p>
            <button
              onClick={onLogin}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg'
            >
              Fazer login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ───────── Menu lateral da conta ───────── */
function AccountPanel({
  onClose,
  onProfile,
  onOrders,
  onDonate,
  onLogout,
}: {
  onClose: () => void;
  onProfile: () => void;
  onOrders: () => void;
  onDonate: () => void;
  onLogout: () => void;
}) {
  return (
    <div className='fixed top-0 right-0 w-72 h-full bg-white shadow-2xl p-6 z-50 flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-xl font-bold text-[#1D5176]'>Minha conta</h3>
        <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
          ✕
        </button>
      </div>

      <button
        onClick={onProfile}
        className='w-full text-left mb-3 py-2 px-3 rounded-lg bg-[#1D5176]/5 hover:bg-[#1D5176]/10 text-[#1D5176] font-medium'
      >
        Meu Perfil
      </button>

      <button
        onClick={onOrders}
        className='w-full text-left mb-6 py-2 px-3 rounded-lg bg-[#1D5176]/5 hover:bg-[#1D5176]/10 text-[#1D5176] font-medium'
      >
        Histórico de pedidos
      </button>

      <button
        onClick={onDonate}
        className='mt-2 mb-6 py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold self-center'
      >
        Doar
      </button>

      <div className='mt-auto pt-4 border-t border-gray-200'>
        <button
          onClick={onLogout}
          className='w-full text-left text-red-600 hover:text-red-700 font-semibold'
        >
          Sair
        </button>
      </div>
    </div>
  );
}

/* ───────── Modal Histórico de pedidos ───────── */
function OrdersModal({
  orders,
  loading,
  onClose,
}: {
  orders: Order[];
  loading: boolean;
  onClose: () => void;
}) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
      <div className='bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-4 text-gray-400 hover:text-gray-600'
        >
          ✕
        </button>
        <h2 className='text-2xl font-bold text-[#1D5176] mb-4'>
          Histórico de pedidos
        </h2>

        {loading ? (
          <p className='text-gray-600 text-center'>Carregando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className='text-gray-600 text-center'>
            Você ainda não possui pedidos.
          </p>
        ) : (
          <div className='space-y-3 max-h-80 overflow-y-auto'>
            {orders.map((order) => (
              <div
                key={order.id}
                className='border rounded-lg p-3 text-sm text-[#1D5176]'
              >
                <div className='flex justify-between mb-1'>
                  <span className='font-semibold'>
                    {new Date(order.created_at).toLocaleString('pt-BR')}
                  </span>
                  <span className='text-yellow-600 font-semibold'>
                    R$ {order.total.toFixed(2)}
                  </span>
                </div>
                <p className='text-xs text-gray-500 mb-1'>
                  Status:{' '}
                  <span className='font-medium'>
                    {order.status || 'Aguardando confirmação'}
                  </span>
                </p>
                <p className='text-xs text-gray-600'>
                  Itens:{' '}
                  {order.items && order.items.length > 0
                    ? order.items.map((i) => i.name).join(', ')
                    : '—'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────── Modal de Doação ───────── */
function DonationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
      <div className='bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-4 text-gray-400 hover:text-gray-600'
        >
          ✕
        </button>
        <h2 className='text-2xl font-bold text-[#1D5176] mb-4'>
          Doe para o Aviva
        </h2>
        <img
          src='/pix.png'
          alt='QR Code de doação'
          className='mx-auto mb-4 w-48 h-48 object-contain'
        />
        <p className='text-gray-700 text-sm'>
          Aponte a câmera do aplicativo do seu banco para o QR Code para fazer
          sua doação.
        </p>
      </div>
    </div>
  );
}
