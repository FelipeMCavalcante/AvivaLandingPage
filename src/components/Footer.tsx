'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div
      className='flex flex-col lg:flex-row items-center justify-between bg-[#01C2CB] text-white relative font-light'
      id='Footer'
    >
      {/* Imagem Esquerda */}
      <div className='w-full lg:w-1/3 flex justify-center'>
        <Image src={'/avivabranca.png'} width={341} height={118} alt='Vybbe' />
      </div>

      {/* Links no Centro */}
      <div className='w-full lg:w-1/3 flex flex-col lg:flex-row justify-center items-center text-center gap-10 text-[#030303] font-outfitregular font-bold'>
        {/* Primeiro grupo */}
        <div className='flex flex-col items-center'>
          <Link href='/#Us' className='text-lg mt-4 hover:text-[#fe6150]'>
            Movimento
          </Link>
          <Link href='/#Serie' className='text-lg mt-4 hover:text-[#fe6150]'>
            Séries
          </Link>
          <Link href='/#Projects' className='text-lg mt-4 hover:text-[#fe6150]'>
            Projetos
          </Link>
        </div>
        {/* Segundo grupo */}
        <div className='flex flex-col items-center'>
          <Link href='/#Artist' className='text-lg mt-4 hover:text-[#fe6150]'>
            Artistas
          </Link>
          <Link href='/#Insta' className='text-lg mt-4 hover:text-[#fe6150]'>
            Insta Aviva
          </Link>
          <Link href='/#Contact' className='text-lg mt-4 hover:text-[#fe6150]'>
            Contato
          </Link>
        </div>
      </div>

      {/* Imagem Direita */}
      <div className='w-full lg:w-1/3 flex justify-center lg:justify-center '>
        <Image
          src='/pnsbranca.png'
          width={250}
          height={150}
          alt='Imagem'
          className=''
        />
      </div>
    </div>
  );
}
