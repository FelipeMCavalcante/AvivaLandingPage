// Updated Footer component with “Desenvolvido por” credit
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
            </div>
            <div className='flex flex-col items-center gap-2'>
              <Link
                href='/#Eventos'
                className='text-xl lg:text-2xl hover:text-[#3871FE]'
              >
                Eventos
              </Link>
              <Link
                href='/#Santos'
                className='text-xl lg:text-2xl hover:text-[#3871FE]'
              >
                Santos
              </Link>
            </div>
          </div>

          {/* CARD – lado direito */}
          <div className='w-full lg:w-1/3 flex justify-center lg:justify-end mb-6 lg:mb-0'>
            <a
              href='https://chat.whatsapp.com/Kqm0VFCLG0B9e0ZZuISikF'
              target='_blank'
              rel='noopener noreferrer'
              className='block w-full max-w-xs text-center bg-[#3871FE] hover:bg-[#2855c7] text-white font-outfitregular font-bold text-xl py-5 px-8 rounded-2xl shadow-xl transition-transform hover:scale-105'
            >
              Entrar na comunidade
            </a>
          </div>
        </div>
      </div>
      {/* Desenvolvido por */}
      <div className='bg-white text-sm flex justify-center items-center text-[#030303] py-2 font-poppins'>
        Desenvolvido por:
        <span className='ml-2'>
          <a
            href='https://felipecavalcante.dev.br'
            target='_blank'
            rel='noopener noreferrer'
            className='relative inline-block'
          >
            <Image
              src='/fc-cinza.png'
              width={80}
              height={50}
              alt='Felipe Desenvolvedor'
              className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0'
            />
            <Image
              src='/fc-preta.png'
              width={80}
              height={50}
              alt='Felipe Desenvolvedor'
              className='absolute top-0 left-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100'
            />
          </a>
        </span>
      </div>
    </footer>
  );
}
