'use client';
import Link from 'next/link'; // opcional; use <a> se preferir

interface ContactProps {
  /** URL do grupo no WhatsApp */
  whatsAppLink?: string;
}

export default function Contact({
  whatsAppLink = 'https://chat.whatsapp.com/SEU_LINK_AQUI',
}: ContactProps) {
  return (
    <div
      className='relative bg-teal-200 flex items-center justify-center'
      id='Contact'
    >
      {/* faixa diagonal decorativa */}
      <div
        className='absolute top-0 right-0 w-10/12 h-full bg-teal-300'
        style={{
          clipPath: 'polygon(100% 0, 50% 0, 30% 100%, 100% 100%)',
        }}
      />

      <div className='relative z-10 p-8 flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto rounded-lg'>
        {/* título e descrição */}
        <div className='text-center sm:text-left sm:mr-8'>
          <h1 className='text-[#030303] text-[70px] font-bold font-ozikB leading-[55.02px] tracking-[4.20px]'>
            Grupo do WhatsApp
          </h1>
          <p className='mt-2 text-[#030303] font-outfitregular font-bold text-2xl'>
            Fique por dentro de todos os avisos
            <br /> dos nossos eventos e encontros.
          </p>
        </div>

        {/* botão único */}
        <div className='mt-6 sm:mt-0 sm:ml-6 flex w-full sm:w-1/2'>
          <Link
            href={whatsAppLink}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-black text-white w-full text-center py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors'
          >
            ENTRAR NO GRUPO
          </Link>
        </div>
      </div>
    </div>
  );
}
