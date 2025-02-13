'use client';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Exibir mensagem instantânea
    setMessage('Enviando...');

    // Resetar o formulário imediatamente
    const formDataCopy = { ...formData }; // Salvar uma cópia para envio
    setFormData({ name: '', email: '' });

    const scriptURL =
      'https://script.google.com/macros/s/AKfycbztPWJaTy0GTIsBDcxgFVUZ5pb_7S2CkEpv09bym4xrCGSt4jl0RFqeUOWskn4BJQs/exec';

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataCopy).toString(),
      });

      if (response.ok) {
        setMessage('Formulário enviado com sucesso!');
      } else {
        setMessage('Erro ao enviar o formulário.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div
      className='relative bg-teal-200 flex items-center justify-center'
      id='Contact'
    >
      <div
        className='absolute top-0 right-0 w-10/12 h-full bg-teal-300'
        style={{
          clipPath: 'polygon(100% 0, 50% 0, 30% 100%, 100% 100%)',
        }}
      ></div>

      <div className='relative z-10 p-8 flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto rounded-lg'>
        <div className='text-center sm:text-left sm:mr-8'>
          <h1 className='text-[#030303] text-[70px] font-bold font-ozikB leading-[55.02px] tracking-[4.20px]'>
            QUERO SENTIR ESSA VYBBE
          </h1>
          <p className='mt-2 text-[#030303] font-outfitregular font-bold text-2xl'>
            Fique por dentro do universo do palco <br /> dos maiores hits do
            Brasil.
          </p>
        </div>

        <form
          className='mt-6 sm:mt-0 sm:ml-6 flex flex-col space-y-4 w-full sm:w-1/2'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            name='name'
            placeholder='Seu nome completo'
            value={formData.name}
            onChange={handleChange}
            className='p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='seunome@email.com'
            value={formData.email}
            onChange={handleChange}
            className='p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
            required
          />
          <button
            type='submit'
            className='bg-black text-white p-3 rounded-md text-sm font-semibold hover:bg-gray-800'
          >
            ENVIAR
          </button>
          {message && (
            <p className='mt-4 text-[#030303] font-outfitregular text-center text-[20px]'>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
