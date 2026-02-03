'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginClient() {
  const router = useRouter();
  const search = useSearchParams();
  const from = search.get('from') ?? 'store';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      router.replace(from === 'admin' ? '/admin' : '/store');
    } catch (e: unknown) {
      const msg = (e as { message?: string })?.message ?? 'Erro ao fazer login.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-aviva-blue">Login</h1>
        <p className="text-sm text-gray-800 mt-1">Acesse sua conta.</p>

        {errorMsg && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
            {errorMsg}
          </div>
        )}

        <div className="mt-5 grid gap-3">
          <input
            className="border rounded-xl p-3 outline-none"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded-xl p-3 outline-none"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            disabled={loading}
            className="bg-aviva-blue hover:bg-blue-600 text-white py-3 rounded-xl font-extrabold disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <button
            onClick={() => router.push('/register')}
            className="border border-gray-200 hover:bg-gray-50 text-gray-900 font-extrabold py-3 rounded-xl"
          >
            Criar conta
          </button>
        </div>
      </div>
    </section>
  );
}
