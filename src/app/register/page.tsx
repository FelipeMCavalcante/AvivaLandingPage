'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const register = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, phone },
        },
      });
      if (error) throw error;

      router.replace('/store');
    } catch (e: unknown) {
      const msg =
        (e as { message?: string })?.message ?? 'Erro ao criar conta.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-aviva-blue">Criar conta</h1>
        <p className="text-sm text-gray-800 mt-1">Cadastre-se para comprar.</p>

        {errorMsg && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
            {errorMsg}
          </div>
        )}

        <div className="mt-5 grid gap-3">
          <input
            className="border rounded-xl p-3 outline-none"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border rounded-xl p-3 outline-none"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
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
            onClick={register}
            disabled={loading}
            className="bg-aviva-blue hover:bg-blue-600 text-white py-3 rounded-xl font-extrabold disabled:opacity-60"
          >
            {loading ? 'Criando...' : 'Criar conta'}
          </button>

          <button
            onClick={() => router.push('/login')}
            className="border border-gray-200 hover:bg-gray-50 text-gray-900 py-3 rounded-xl font-extrabold"
          >
            Já tenho conta
          </button>
        </div>
      </div>
    </section>
  );
}
