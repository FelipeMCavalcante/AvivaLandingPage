'use client';

type Props = {
  userEmail: string | null;
  userName: string | null;
  isAdmin: boolean;
  onClose: () => void;

  onOpenProfile: () => void;
  onOpenOrders: () => void;
  onGoAdmin: () => void;
  onLogout: () => void;
};

export default function AccountDrawer({
  userEmail,
  userName,
  isAdmin,
  onClose,
  onOpenProfile,
  onOpenOrders,
  onGoAdmin,
  onLogout,
}: Props) {
  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Fechar"
      />

      {/* drawer */}
      <aside className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-[#1D5176]">
              Minha conta
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {userName ? userName : 'Visitante'}
            </p>
            <p className="text-xs text-gray-500">{userEmail ?? '—'}</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <button
            onClick={onOpenProfile}
            className="w-full text-left py-3 px-3 rounded-xl bg-[#1D5176]/5 hover:bg-[#1D5176]/10 text-[#1D5176] font-semibold"
          >
            Dados do perfil
          </button>

          <button
            onClick={onOpenOrders}
            className="w-full text-left py-3 px-3 rounded-xl bg-[#1D5176]/5 hover:bg-[#1D5176]/10 text-[#1D5176] font-semibold"
          >
            Histórico de pedidos
          </button>

          {isAdmin && (
            <button
              onClick={onGoAdmin}
              className="w-full text-left py-3 px-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-extrabold"
            >
              Ir para Admin
            </button>
          )}
        </div>

        <div className="mt-6 border-t pt-4">
          <button
            onClick={onLogout}
            className="w-full text-left py-3 px-3 rounded-xl text-red-600 hover:bg-red-50 font-extrabold"
          >
            Sair da conta
          </button>
        </div>
      </aside>
    </div>
  );
}
