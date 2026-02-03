'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const ADMIN_EMAIL = 'felipe.de.moraes.cavalcante@gmail.com';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      // não logado → manda pro login
      if (!user) {
        router.replace('/login?from=admin');
        return;
      }

      const email = (user.email ?? '').toLowerCase();

      // logado mas não é admin → volta pra store
      if (email !== ADMIN_EMAIL.toLowerCase()) {
        router.replace('/store');
        return;
      }

      // ok
      setChecking(false);
    })();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow p-6 text-aviva-blue font-semibold">
          Verificando permissões...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
