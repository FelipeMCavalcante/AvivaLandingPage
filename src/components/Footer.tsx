// Updated Footer component with “Desenvolvido por” credit
'use client';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id='Footer' className='bg-[#01C2CB] text-white font-light'>
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
