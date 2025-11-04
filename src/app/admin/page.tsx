'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/* ───────── Lista de e-mails de ADMIN ───────── */
const ADMIN_EMAILS = [
  'felipe.de.moraes.cavalcante@gmail.com',
  // 'outro.admin@exemplo.com',
];

/* ───────── Status possíveis ───────── */
const STATUS_OPTIONS = [
  'aguardando comprovante',
  'Pedido aceito',
  'Pedido pronto',
] as const;

type StatusType = (typeof STATUS_OPTIONS)[number];

/* ───────── Tipos ───────── */
type ProductType = 'roupa' | 'acessorio' | 'outro';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: ProductType;
  size?: string | null;
}

interface Order {
  id: string;
  created_at: string;
  total: number;
  status?: string;
  items: CartItem[];
  user_id: string;
  customer_name?: string | null;
  customer_phone?: string | null;
}

/* ───────── Helper de cor do status ───────── */
function getStatusClasses(status: StatusType) {
  switch (status) {
    case 'aguardando comprovante':
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    case 'Pedido aceito':
      return 'bg-blue-100 border-blue-300 text-blue-800';
    case 'Pedido pronto':
      return 'bg-green-100 border-green-300 text-green-800';
    default:
      return 'bg-gray-100 border-gray-300 text-black';
  }
}

/* ───────── Página Admin ───────── */
export default function AdminPage() {
  const router = useRouter();
  const [checkingUser, setCheckingUser] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [localStatuses, setLocalStatuses] = useState<
    Record<string, StatusType>
  >({});
  const [savingStatusId, setSavingStatusId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadOrders = async () => {
    setLoadingOrders(true);
    setError(null);

    const { data, error } = await supabase
      .from('orders')
      .select(
        'id, created_at, total, status, items, user_id, customer_name, customer_phone'
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      setError('Erro ao carregar pedidos.');
      setLoadingOrders(false);
      return;
    }

    const loaded = (data as Order[]) || [];
    setOrders(loaded);

    const initialStatuses: Record<string, StatusType> = {};
    for (const order of loaded) {
      const normalized =
        (order.status as StatusType) ||
        ('aguardando comprovante' as StatusType);
      initialStatuses[order.id] = normalized;
    }
    setLocalStatuses(initialStatuses);

    setLoadingOrders(false);
  };

  const handleStatusSelectChange = (orderId: string, newStatus: StatusType) => {
    setLocalStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleSaveStatus = async (orderId: string) => {
    const newStatus =
      localStatuses[orderId] || ('aguardando comprovante' as StatusType);

    setSavingStatusId(orderId);
    setError(null);

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      console.error(error);
      setError('Erro ao atualizar status, tente novamente.');
      setSavingStatusId(null);
      return;
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    setSavingStatusId(null);
  };

  const handleDeleteOrder = async (orderId: string) => {
    const ok = window.confirm('Tem certeza que deseja excluir este pedido?');
    if (!ok) return;

    setDeletingId(orderId);
    setError(null);

    const { error } = await supabase.from('orders').delete().eq('id', orderId);

    if (error) {
      console.error(error);
      setError('Erro ao excluir pedido, tente novamente.');
      setDeletingId(null);
      return;
    }

    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    setDeletingId(null);
  };

  // Verifica login e se é admin
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push('/login?from=admin');
        return;
      }

      const userEmail = data.user.email ?? '';

      const adminFlag =
        data.user.user_metadata?.is_admin === true ||
        ADMIN_EMAILS.includes(userEmail);

      if (!adminFlag) {
        setIsAdmin(false);
        setCheckingUser(false);
        return;
      }

      setIsAdmin(true);
      setCheckingUser(false);
      await loadOrders();
    };

    checkUser();
  }, [router]);

  if (checkingUser) {
    return (
      <section className='min-h-screen flex items-center justify-center bg-[#F8F8F8]'>
        <p className='text-black font-semibold'>Verificando acesso...</p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className='min-h-screen flex items-center justify-center bg-[#F8F8F8]'>
        <div className='bg-white shadow-md rounded-2xl p-6 max-w-md text-center'>
          <h1 className='text-2xl font-bold text-black mb-3'>
            Acesso restrito
          </h1>
          <p className='text-black mb-4'>
            Você não tem permissão para acessar o painel administrativo.
          </p>
        </div>
      </section>
    );
  }

  const filteredOrders = orders.filter((order) => {
    const normalizedStatus = order.status || 'aguardando comprovante';

    const matchesStatus =
      statusFilter === 'todos' || normalizedStatus === statusFilter;

    if (!matchesStatus) return false;

    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const inItems = order.items?.some((item) =>
      item.name.toLowerCase().includes(term)
    );

    const inUserName = (order.customer_name || '').toLowerCase().includes(term);

    const inPhone = (order.customer_phone || '').toLowerCase().includes(term);

    const inUserId = order.user_id.toLowerCase().includes(term);

    return inItems || inUserName || inPhone || inUserId;
  });

  return (
    <section className='min-h-screen bg-[#F8F8F8]'>
      <header className='bg-white shadow-md px-6 py-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-black'>Painel Administrativo</h1>
        <button
          onClick={loadOrders}
          className='bg-[#1D5176] hover:bg-[#163c57] text-white px-4 py-2 rounded-lg text-sm'
        >
          Atualizar lista
        </button>
      </header>

      <main className='px-6 py-6 md:px-12'>
        <h2 className='text-xl font-semibold text-black mb-4'>Pedidos</h2>

        {/* Filtros */}
        <div className='flex flex-col md:flex-row gap-4 md:items-end md:justify-between mb-6'>
          <div className='flex flex-col gap-1 w-full md:w-1/2'>
            <label className='text-sm font-semibold text-black'>
              Buscar por nome, telefone ou item
            </label>
            <input
              type='text'
              placeholder='Digite para filtrar...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='border rounded-lg px-3 py-2 text-black w-full'
            />
          </div>

          <div className='flex flex-col gap-1 w-full md:w-1/3'>
            <label className='text-sm font-semibold text-black'>
              Filtrar por status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='border rounded-lg px-3 py-2 text-black w-full'
            >
              <option value='todos'>Todos</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className='text-red-600 mb-4 text-sm'>{error}</p>}

        {loadingOrders ? (
          <p className='text-black'>Carregando pedidos...</p>
        ) : filteredOrders.length === 0 ? (
          <p className='text-black'>Nenhum pedido encontrado.</p>
        ) : (
          <div className='bg-white rounded-2xl shadow-md p-4 overflow-x-auto'>
            <table className='min-w-full text-sm text-left'>
              <thead>
                <tr className='border-b'>
                  <th className='py-2 px-2 text-black'>Data</th>
                  <th className='py-2 px-2 text-black'>Cliente</th>
                  <th className='py-2 px-2 text-black'>Telefone</th>
                  <th className='py-2 px-2 text-black'>Itens</th>
                  <th className='py-2 px-2 text-black'>Total</th>
                  <th className='py-2 px-2 text-black'>Status</th>
                  <th className='py-2 px-2 text-black text-center'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const dbStatus =
                    (order.status as StatusType) ||
                    ('aguardando comprovante' as StatusType);
                  const localStatus = localStatuses[order.id] ?? dbStatus;
                  const changed = localStatus !== dbStatus;

                  return (
                    <tr key={order.id} className='border-b align-top'>
                      <td className='py-2 px-2 text-black'>
                        {new Date(order.created_at).toLocaleString('pt-BR')}
                      </td>
                      <td className='py-2 px-2 text-sm text-black'>
                        {order.customer_name || '—'}
                      </td>
                      <td className='py-2 px-2 text-sm text-black'>
                        {order.customer_phone || '—'}
                      </td>
                      <td className='py-2 px-2 text-xs text-black'>
                        {order.items && order.items.length > 0 ? (
                          <ul className='list-disc list-inside space-y-1'>
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name}
                                {item.size ? ` (${item.size})` : ''} – R${' '}
                                {item.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className='py-2 px-2 font-semibold text-black'>
                        R$ {order.total.toFixed(2)}
                      </td>
                      <td className='py-2 px-2'>
                        <select
                          value={localStatus}
                          onChange={(e) =>
                            handleStatusSelectChange(
                              order.id,
                              e.target.value as StatusType
                            )
                          }
                          className={
                            'border rounded-full px-3 py-1 text-xs font-semibold ' +
                            getStatusClasses(localStatus)
                          }
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className='py-2 px-2 text-center'>
                        <div className='flex gap-2 justify-center'>
                          <button
                            onClick={() => handleSaveStatus(order.id)}
                            disabled={!changed || savingStatusId === order.id}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                              !changed || savingStatusId === order.id
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-[#1D5176] text-white hover:bg-[#163c57]'
                            }`}
                          >
                            {savingStatusId === order.id
                              ? 'Salvando...'
                              : 'Salvar'}
                          </button>

                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            disabled={deletingId === order.id}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                              deletingId === order.id
                                ? 'bg-red-300 text-red-800 cursor-not-allowed'
                                : 'bg-red-600 text-white hover:bg-red-700'
                            }`}
                          >
                            {deletingId === order.id
                              ? 'Excluindo...'
                              : 'Excluir'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </section>
  );
}
