// Updated Footer component with larger font sizes for routes and card-style WhatsApp link
'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id='Footer' className='bg-[#01C2CB] text-white font-light'>
      {/* Wrapper centralizado com padding lateral suave */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between'>
          {/* IMAGENS – lado esquerdo */}
          <div className='w-full lg:w-1/3 flex flex-col items-center gap-4 mt-6 mb-6'>
            <Image
              src='/paroquiabranca.png'
              width={120}
              height={50}
              alt='PNS logo'
              priority
            />
            <Image
              src='/avivabranca2.png'
              width={281}
              height={118}
              alt='Aviva logo'
              priority
            />
          </div>

          {/* ROTAS – centro */}
          <div className='w-full lg:w-1/3 flex flex-col lg:flex-row justify-center items-center text-center gap-8 md:gap-12 text-[#030303] font-outfitregular font-bold my-6 lg:my-0'>
            <div className='flex flex-col items-center gap-2'>
              <Link
                href='/#Us'
                className='text-xl lg:text-2xl hover:text-[#3871FE]'
              >
                Movimento
              </Link>
              <Link
                href='/#Serie'
                className='text-xl lg:text-2xl hover:text-[#3871FE]'
              >
                Séries
              </Link>
              <Link
                href='/#Projects'
                className='text-xl lg:text-2xl hover:text-[#3871FE]'
              >
                Projetos
              </Link>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <Link
                href='/#Us'
                className='text-xl lg:text-2xl hover:text-[#3871FE]'
              >
                Santos
              </Link>
              <Link
                href='/#Insta'
                className='text-xl lg:text-2xl hover:text-[#3871FE]'
              >
                Insta Aviva
              </Link>
              <Link
                href='/#Contact'
                className='text-xl lg:text-2xl hover:text-[#3871FE]'
              >
                Contato
              </Link>
            </div>
          </div>

          {/* CARD – lado direito */}
          <div className='w-full lg:w-1/3 flex justify-center lg:justify-end mb-6 lg:mb-0'>
            <a
              href='https://chat.whatsapp.com/SEU_LINK_AQUI'
              target='_blank'
              rel='noopener noreferrer'
              className='block w-full max-w-xs text-center bg-[#3871FE] hover:bg-[#2855c7] text-white font-outfitregular font-bold text-xl py-5 px-8 rounded-2xl shadow-xl transition-transform hover:scale-105'
            >
              Entrar no grupo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
