'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function syncCart(userId: string) {
    const localCart = localStorage.getItem('cart');
    if (!localCart) return;

    const { data: existing } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', userId)
      .single();
    const merged = existing?.items
      ? [...existing.items, ...JSON.parse(localCart)]
      : JSON.parse(localCart);

    await supabase
      .from('carts')
      .upsert({ user_id: userId, items: merged }, { onConflict: 'user_id' });
  }

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else if (data.user) {
      await syncCart(data.user.id);
      router.push('/store');
    }

    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
      <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-[#1D5176] text-center mb-6'>
          Entrar
        </h1>
        <input
          type='email'
          placeholder='E-mail'
          className='border border-gray-300 rounded-lg p-3 w-full mb-3 text-black'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Senha'
          className='border border-gray-300 rounded-lg p-3 w-full mb-4 text-black'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 w-full rounded-lg transition'
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <p className='text-center text-sm text-gray-600 mt-4'>
          Não tem conta?{' '}
          <span
            onClick={() => router.push('/register')}
            className='text-blue-600 font-semibold cursor-pointer hover:underline'
          >
            Cadastrar
          </span>
        </p>
      </div>
    </div>
  );
}
