'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Sincroniza carrinho local com o Supabase após o cadastro
  async function syncCart(userId: string) {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      await supabase.from('carts').upsert({
        user_id: userId,
        items: JSON.parse(localCart),
      });
    }
  }

  async function handleRegister() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone },
        emailRedirectTo: undefined, // remove confirmação por e-mail
      },
    });

    if (error) {
      alert(error.message);
    } else if (data.user) {
      await syncCart(data.user.id);
      router.push('/store');
    }

    setLoading(false);
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
      {/* Logo */}
      <img src='/avivablue.png' alt='Logo Aviva' className='w-40 mb-8' />

      <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-[#1D5176] text-center mb-6'>
          Criar conta
        </h1>

        <input
          type='text'
          placeholder='Nome completo'
          className='border border-gray-300 rounded-lg p-3 w-full mb-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type='tel'
          placeholder='Telefone'
          className='border border-gray-300 rounded-lg p-3 w-full mb-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type='email'
          placeholder='E-mail'
          className='border border-gray-300 rounded-lg p-3 w-full mb-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Senha'
          className='border border-gray-300 rounded-lg p-3 w-full mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 w-full rounded-lg transition'
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className='text-center text-sm text-gray-600 mt-4'>
          Já tem uma conta?{' '}
          <span
            onClick={() => router.push('/login')}
            className='text-blue-600 font-semibold cursor-pointer hover:underline'
          >
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}
