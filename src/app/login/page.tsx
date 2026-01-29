'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = useMemo(() => searchParams.get('from') ?? 'store', [searchParams]);
  const redirectTo = useMemo(() => {
    if (from === 'admin') return '/admin';
    return '/store';
  }, [from]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // se já estiver logado, redireciona
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace(redirectTo);
        return;
      }
      setChecking(false);
    })();
  }, [router, redirectTo]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      router.replace(redirectTo);
    } catch (err: any) {
      setErrorMsg(err?.message ?? 'Erro ao entrar. Verifique e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <section className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <p className="text-[#1D5176] font-semibold">Carregando...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow p-6">
        <div className="flex flex-col items-center mb-6">
          <img src="/avivablue.png" alt="Aviva" className="h-14 w-auto mb-3" />
          <h1 className="text-2xl font-extrabold text-[#1D5176]">Entrar</h1>
          <p className="text-gray-600 text-sm mt-1">
            Acesse sua conta para continuar.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="grid gap-4">
          <label className="text-sm font-semibold text-[#1D5176]">
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2 text-black"
              placeholder="seuemail@dominio.com"
              required
            />
          </label>

          <label className="text-sm font-semibold text-[#1D5176]">
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2 text-black"
              placeholder="••••••••"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl transition font-semibold"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Ainda não tem conta?{' '}
          <a
            href={`/register?from=${from}`}
            className="text-[#1D5176] font-semibold hover:underline"
          >
            Criar conta
          </a>
        </div>

        <div className="mt-4 text-center">
          <a
            href={redirectTo}
            className="text-sm text-gray-500 hover:underline"
          >
            Voltar
          </a>
        </div>
      </div>
    </section>
  );
}
