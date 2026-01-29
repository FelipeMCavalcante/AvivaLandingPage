'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = useMemo(() => searchParams.get('from') ?? 'store', [searchParams]);
  const redirectTo = useMemo(() => {
    if (from === 'admin') return '/admin';
    return '/store';
  }, [from]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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

  const validate = () => {
    if (name.trim().length < 2) return 'Informe seu nome.';
    if (!email.includes('@')) return 'Informe um e-mail válido.';
    if (password.length < 6) return 'A senha deve ter no mínimo 6 caracteres.';
    return null;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            phone: phone.trim(),
          },
        },
      });

      if (error) throw error;

      // Algumas configs do Supabase exigem confirmação por e-mail.
      // Se user vier null, avisamos e mantemos na tela.
      if (!data.user) {
        setSuccessMsg(
          'Conta criada! Verifique seu e-mail para confirmar o cadastro antes de entrar.'
        );
        return;
      }

      // Se já logou automaticamente, redireciona
      router.replace(redirectTo);
    } catch (err: any) {
      setErrorMsg(err?.message ?? 'Erro ao criar conta. Tente novamente.');
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
          <h1 className="text-2xl font-extrabold text-[#1D5176]">Criar conta</h1>
          <p className="text-gray-600 text-sm mt-1">
            Preencha seus dados para continuar.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid gap-4">
          <label className="text-sm font-semibold text-[#1D5176]">
            Nome
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2 text-black"
              placeholder="Seu nome"
              required
            />
          </label>

          <label className="text-sm font-semibold text-[#1D5176]">
            Telefone (opcional)
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2 text-black"
              placeholder="(85) 9xxxx-xxxx"
            />
          </label>

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
              placeholder="mínimo 6 caracteres"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-6 py-3 rounded-xl transition font-semibold"
          >
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Já tem conta?{' '}
          <a
            href={`/login?from=${from}`}
            className="text-[#1D5176] font-semibold hover:underline"
          >
            Entrar
          </a>
        </div>

        <div className="mt-4 text-center">
          <a href={redirectTo} className="text-sm text-gray-500 hover:underline">
            Voltar
          </a>
        </div>
      </div>
    </section>
  );
}
