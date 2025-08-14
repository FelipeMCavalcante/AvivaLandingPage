'use client';

import { Disclosure } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { NAVIGATION } from '../lib/constants';

/* ---------- Ícone do menu hamburguer ---------- */
const MenuIcon = () => (
  <svg
    width='40'
    height='32'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4 6h16M8 12h12M12 18h8'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default function Header() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') setCurrentPath(window.location.pathname);
  }, []);

  const handleLinkClick = (href: string) => setCurrentPath(href);

  return (
    <Disclosure
      as='nav'
      className='fixed top-0 left-0 right-0 z-50 bg-white shadow border-b'
    >
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 font-ozikB'>
            <div className='relative flex h-28 items-center justify-center'>
              {/* ---------- Logo ---------- */}
              <div className='flex flex-1 items-end justify-center lg:items-stretch lg:justify-center'>
                <a href='' className='relative w-[145px] h-[50px]'>
                  <Image
                    src='/AVIVABLACK.png'
                    alt='AVIVA'
                    fill
                    className='object-contain transition-opacity duration-300 hover:opacity-0'
                  />
                  <Image
                    src='/avivablue.png'
                    alt='AVIVA'
                    fill
                    className='absolute top-0 left-0 object-contain opacity-0 transition-opacity duration-300 hover:opacity-100'
                  />
                </a>
              </div>

              <div className='hidden lg:ml-6 lg:block w-full'>
                <div className='flex h-full items-center ml-20 justify-around  font-neueBold'>
                  {NAVIGATION.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={`uppercase font-neueLight text-[#00121C] hover:text-[#3871FE] hover:font-neueBold transition-colors ${
                        currentPath === item.href ? '' : ''
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                  <div>
                    <a
                      href='https://www.instagram.com/aviva.gloria/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-opacity hover:opacity-70'
                    >
                      <Image
                        src='/icons/instagram.svg'
                        alt='Instagram'
                        width={32}
                        height={32}
                      />
                    </a>
                  </div>

                  <div>
                    <a
                      href='https://www.youtube.com/@paroquiagloriafor'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-opacity hover:opacity-70'
                    >
                      <Image
                        src='/icons/youtube.svg'
                        alt='YouTube'
                        width={32}
                        height={32}
                      />
                    </a>
                  </div>

                  <div>
                    <a
                      href='https://chat.whatsapp.com/Kqm0VFCLG0B9e0ZZuISikF'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-opacity hover:opacity-70'
                    >
                      <Image
                        src='/icons/whatsapp.svg'
                        alt='WhatsApp'
                        width={32}
                        height={32}
                      />
                    </a>
                  </div>

                  <div>
                    <a
                      href='https://open.spotify.com/user/31yihj4m6b5qe3onb5o742ovnyey?si=e4f00603f8fa4a07'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-opacity hover:opacity-70'
                    >
                      <Image
                        src='/icons/spotify.svg'
                        alt='Spotify'
                        width={32}
                        height={32}
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* ---------- Botão hamburguer (mobile) ---------- */}
              <div className='absolute inset-y-0 right-0 flex items-center lg:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* ---------- Menu mobile ---------- */}
          <Disclosure.Panel className='lg:hidden bg-white border-t'>
            <div className='space-y-1 px-2 pt-2 pb-3'>
              {NAVIGATION.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`block rounded-md px-3 py-2 text-base font-neueBold font-bold uppercase ${
                    currentPath === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-800 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
