'use client';

import { useState } from 'react';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy =
      '00020126810014br.gov.bcb.pix0132secretaria@paroquiagloria.org.br0223OFERTA EM PROL DO AVIVA5204000053039865802BR5910----------6009FORTALEZA62090505AVIVA630451D9';

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
    } catch (err) {
      // Agora a variável 'err' é utilizada
      console.error(
        'Erro ao copiar usando Clipboard API → tentando fallback:',
        err
      );

      const input = document.createElement('input');
      input.value = textToCopy;
      document.body.appendChild(input);
      input.select();

      try {
        document.execCommand('copy');
        setCopied(true);
      } catch (fallbackErr) {
        // Também usamos 'fallbackErr'
        console.error('Erro ao copiar usando execCommand:', fallbackErr);
        alert('Não foi possível copiar automaticamente. Copie manualmente.');
      }

      document.body.removeChild(input);
    }

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='bg-gray-100' id='Santos'>
      <div>
        <img src='pix.png' alt='Imagem Pix' className='w-full' />
      </div>

      <div className='flex flex-col items-center px-4 py-6'>
        <button
          onClick={handleCopy}
          className='block w-full max-w-xs text-center bg-[#3772ff] hover:bg-[#2855c7] text-white font-neueBold text-xl py-5 px-8 rounded-2xl shadow-xl transition-transform hover:scale-105'
        >
          Copiar chave Pix
        </button>

        {copied && (
          <p className='text-green-600 mt-3 font-medium'>Chave Pix copiada!</p>
        )}
      </div>
    </div>
  );
}
