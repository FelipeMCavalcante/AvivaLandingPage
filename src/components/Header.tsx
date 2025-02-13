'use client';
import { Disclosure } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAVIGATION } from '../lib/constants';

const CustomMenuIcon = () => (
  <svg
    width='40'
    height='32'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4 6h16'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M8 12h12'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12 18h8'
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
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const handleLinkClick = (href: string) => {
    setCurrentPath(href);
  };

  return (
    <Disclosure
      as='nav'
      className='bg-white shadow fixed top-0 left-0 right-0 z-50 border-b #FCFCFC'
    >
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 font-ozikB'>
            <div className='relative flex h-28 items-center justify-between'>
              <div className='flex flex-1 items-center justify-center lg:items-stretch lg:justify-between'>
                <div className='flex flex-shrink-0 items-center xl:ml-8 sm:ml-0'>
                  <Link href='/'>
                    <Image
                      src={'/imgHeader/Vybbe-Logo.png'}
                      alt='VYBBE'
                      width={145}
                      height={50}
                      className='object-contain'
                    />
                  </Link>
                </div>

                <div className='hidden lg:ml-6 lg:block w-full mb-4'>
                  <div className='flex justify-end mr-6 space-x-4'>
                    <div>
                      <a
                        target='_blank'
                        href='https://www.instagram.com/vybbe/'
                      >
                        <svg
                          className='w-8 h-8 text-black hover:text-red-500 transition-all duration-300'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 32 32'
                          fill='currentColor'
                        >
                          <path d='M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM16 6.66667C13.4651 6.66667 13.1477 6.67724 12.1522 6.72267C11.1585 6.76809 10.4796 6.92613 9.88604 7.15698C9.26382 7.39093 8.69947 7.75804 8.2328 8.23342C7.75818 8.69955 7.39084 9.26351 7.15636 9.88604C6.92676 10.4796 6.76809 11.1591 6.72267 12.1528C6.67787 13.1477 6.66667 13.4644 6.66667 16C6.66667 18.5356 6.67724 18.8523 6.72267 19.8478C6.76809 20.8415 6.92613 21.5204 7.15698 22.114C7.39093 22.7362 7.75804 23.3005 8.23342 23.7672C8.69956 24.2418 9.26352 24.6091 9.88604 24.8436C10.4796 25.0739 11.1585 25.2319 12.1522 25.2773C13.1477 25.3228 13.4651 25.3333 16 25.3333C18.5349 25.3333 18.8523 25.3228 19.8478 25.2773C20.8415 25.2319 21.5204 25.0739 22.114 24.843C22.7362 24.6091 23.3005 24.242 23.7672 23.7666C24.2418 23.3005 24.6092 22.7365 24.8436 22.114C25.0739 21.5204 25.2319 20.8415 25.2773 19.8478C25.3228 18.8523 25.3333 18.5349 25.3333 16C25.3333 13.4651 25.3228 13.1477 25.2773 12.1522C25.2319 11.1585 25.0739 10.4796 24.843 9.88604C24.6087 9.26324 24.2414 8.69904 23.7666 8.2328C23.3005 7.75818 22.7365 7.39084 22.114 7.15636C21.5204 6.92676 20.8409 6.76809 19.8472 6.72267C18.8523 6.67787 18.5356 6.66667 16 6.66667ZM14.8327 18.773C15.1994 18.9273 15.5925 19.0068 15.9894 19.0068C16.791 19.0068 17.5598 18.6832 18.1266 18.1072C18.6935 17.5312 19.0119 16.75 19.0119 15.9355C19.0119 15.1209 18.6935 14.3397 18.1266 13.7637C17.5598 13.1878 16.791 12.8642 15.9894 12.8642C15.5925 12.8642 15.1994 12.9436 14.8327 13.098C14.466 13.2523 14.1328 13.4785 13.8522 13.7637C13.5715 14.0489 13.3489 14.3875 13.197 14.7601C13.0451 15.1328 12.9669 15.5321 12.9669 15.9355C12.9669 16.3388 13.0451 16.7382 13.197 17.1108C13.3489 17.4834 13.5715 17.822 13.8522 18.1072C14.1328 18.3924 14.466 18.6186 14.8327 18.773ZM12.6971 12.59C13.5702 11.7027 14.7545 11.2043 15.9894 11.2043C17.2243 11.2043 18.4085 11.7027 19.2817 12.59C20.1549 13.4773 20.6455 14.6807 20.6455 15.9355C20.6455 17.1903 20.1549 18.3937 19.2817 19.2809C18.4085 20.1682 17.2243 20.6667 15.9894 20.6667C14.7545 20.6667 13.5702 20.1682 12.6971 19.2809C11.8239 18.3937 11.3333 17.1903 11.3333 15.9355C11.3333 14.6807 11.8239 13.4773 12.6971 12.59ZM21.6776 11.9092C21.884 11.6994 22 11.415 22 11.1184C22 10.8218 21.884 10.5373 21.6776 10.3276C21.4712 10.1178 21.1913 10 20.8994 10C20.6075 10 20.3276 10.1178 20.1212 10.3276C19.9147 10.5373 19.7988 10.8218 19.7988 11.1184C19.7988 11.415 19.9147 11.6994 20.1212 11.9092C20.3276 12.1189 20.6075 12.2367 20.8994 12.2367C21.1913 12.2367 21.4712 12.1189 21.6776 11.9092Z'></path>
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a target='_blank' href='https://www.tiktok.com/@_vybbe'>
                        <svg
                          className='w-8 h-8 text-black hover:text-red-500 transition-all duration-300'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 32 32'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16.4692 5.33333H20.0645C20.0645 8.0541 22.1848 10.2802 24.8889 10.3729V14.0213C23.1373 13.9903 21.478 13.4029 20.1259 12.4135V19.8647C20.1259 23.6058 17.1145 26.6667 13.3963 26.6667C9.67809 26.6667 6.66667 23.6367 6.66667 19.8647C6.66667 16.1237 9.61664 13.1246 13.2734 13.0628V16.7111C11.614 16.7729 10.2619 18.1643 10.2619 19.8647C10.2619 21.5961 11.6447 23.0184 13.3656 23.0184C15.0864 23.0184 16.4692 21.5961 16.4692 19.8647V5.33333Z'
                          ></path>
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a target='_blank' href='https://www.youtube.com/@vybbe'>
                        <svg
                          className='w-8 h-8 text-black hover:text-red-500 transition-all duration-300'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 32 32'
                          fill='currentColor'
                        >
                          <g id='Youtube'>
                            <path
                              id='Subtract'
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM22.6672 10.4997C23.4016 10.7012 23.9799 11.2949 24.1762 12.0489C24.5328 13.4155 24.5328 16.2668 24.5328 16.2668C24.5328 16.2668 24.5328 19.118 24.1762 20.4847C23.9799 21.2387 23.4016 21.8324 22.6672 22.034C21.3364 22.4001 15.9995 22.4001 15.9995 22.4001C15.9995 22.4001 10.6626 22.4001 9.33165 22.034C8.5973 21.8324 8.01897 21.2387 7.8227 20.4847C7.46615 19.118 7.46615 16.2668 7.46615 16.2668C7.46615 16.2668 7.46615 13.4155 7.8227 12.0489C8.01897 11.2949 8.5973 10.7012 9.33165 10.4997C10.6626 10.1335 15.9995 10.1335 15.9995 10.1335C15.9995 10.1335 21.3364 10.1335 22.6672 10.4997Z'
                            />
                            <path
                              id='Path'
                              d='M14.3994 19.1998V13.8665L18.6661 16.5332L14.3994 19.1998Z'
                            />
                          </g>
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a
                        target='_blank'
                        href='https://www.linkedin.com/company/vybbe/'
                      >
                        <svg
                          className='w-8 h-8 text-black hover:text-red-500 transition-all duration-300'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 32 32'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM7.68108 13.2519H11.307V24.1464H7.68108V13.2519ZM11.5453 9.8818C11.5218 8.8136 10.7579 8 9.5175 8C8.27709 8 7.46615 8.8136 7.46615 9.8818C7.46615 10.9279 8.25312 11.7649 9.47043 11.7649H9.4936C10.7579 11.7649 11.5453 10.9279 11.5453 9.8818ZM20.2085 12.9961C22.5945 12.9961 24.3833 14.5535 24.3833 17.8998L24.3832 24.1464H20.7574V18.3178C20.7574 16.8538 20.2327 15.8548 18.9201 15.8548C17.9183 15.8548 17.3217 16.5283 17.0596 17.1788C16.9637 17.4119 16.9402 17.7367 16.9402 18.0623V24.1467H13.3138C13.3138 24.1467 13.3616 14.2745 13.3138 13.2522H16.9402V14.7953C17.4214 14.0535 18.2834 12.9961 20.2085 12.9961Z'
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div>
                      <a target='_blank' href='https://x.com/vybbe_'>
                        <svg
                          className='w-8 h-8 text-black hover:text-red-500 transition-all duration-300'
                          width='32'
                          height='32'
                          viewBox='0 0 32 32'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                        >
                          <g
                            id='Icon/redes sociais'
                            clipPath='url(#clip0_1985_1128)'
                          >
                            <path
                              id='Vector'
                              d='M14.2928 0.11741C8.67109 0.704077 3.64794 4.4052 1.36442 9.64274C-0.107152 13.0241 -0.352059 16.9174 0.692848 20.5016C1.98351 24.9707 5.32218 28.7465 9.64218 30.635C13.0235 32.1065 16.9168 32.3514 20.5013 31.3065C25.8662 29.7599 30.0904 25.355 31.4771 19.8825C33.642 11.3067 28.3302 2.5381 19.7328 0.490744C17.8444 0.0427438 16.1813 -0.0748029 14.2928 0.11741ZM14.5062 10.0267C15.8711 11.8401 17.0235 13.3334 17.0662 13.3334C17.1088 13.3334 18.5279 11.8401 20.2022 10.0267L23.2635 6.72008H25.0022L24.6288 7.11517C24.4155 7.33832 23.0288 8.84253 21.5462 10.4534C20.0635 12.0641 18.6129 13.6316 18.3244 13.9201L17.8128 14.4641L21.8128 19.7867C24.0102 22.7201 25.8128 25.1516 25.8128 25.1952C25.8128 25.2485 24.5013 25.2801 22.9111 25.2801L19.9995 25.2694L17.2902 21.6427C15.4235 19.1361 14.5488 18.0581 14.4635 18.1227C14.3995 18.1761 12.8844 19.8085 11.0928 21.7494L7.83952 25.2801H7.01776C6.55951 25.2801 6.18618 25.2583 6.18618 25.2267C6.18618 25.1952 7.88218 23.3383 9.95109 21.1094C12.0104 18.8801 13.7171 17.0134 13.7378 16.9818C13.7488 16.9383 12.0528 14.6241 9.97285 11.8401C7.89285 9.06674 6.18618 6.77341 6.18618 6.75165C6.18618 6.73096 7.49776 6.72008 9.10885 6.72008H12.0311L14.5062 10.0267Z'
                            />
                            <path
                              id='Vector_2'
                              d='M8.82175 8.14933C8.8642 8.224 11.5516 11.8293 14.7733 16.1382L20.64 23.9891L21.9516 24C22.7624 24 23.2533 23.9573 23.2316 23.8933C23.2217 23.84 20.5442 20.2351 17.3017 15.8933L11.3916 8H10.0693C8.97108 8 8.74665 8.02176 8.82175 8.14933Z'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_1985_1128'>
                              <rect width='32' height='32' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className='flex h-full items-center ml-20 justify-around mt-[-10px] font-ozikBold'>
                    {NAVIGATION.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`rounded-full px-4 py-2 text-sm  xl:text-xl lg:text-lg font-8 text-[#00121C] hover:text-[#FE6150] hover:border-primary-700 transition-colors duration-500 ease-in-out font-proximanova uppercase ${
                          currentPath === item.href ? '#00121C text-white' : ''
                        }`}
                        aria-current={
                          currentPath === item.href ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                    <div className='text-[#00121C] hover:text-[#FE6150] cursor-pointer text-sm xl:text-lg font-8 flex '>
                      <i>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='stroke-current'
                        >
                          <path
                            d='M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C10.2232 19.3691 9 15.9517 9 12C9 8.04831 10.2232 4.63094 12 3M12 21C13.7768 19.3691 15 15.9517 15 12C15 8.04831 13.7768 4.63094 12 3M3 12C3 7.02944 7.02944 3 12 3'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </i>
                      <select className='border-none outline-none bg-transparent appearance-none ml-1'>
                        <option value='pt'>PT - PORTUGUÊS</option>
                        <option value='en'>EN - INGLÊS</option>
                        <option value='es'>ES - ESPANHOL</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center lg:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <CustomMenuIcon />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='lg:hidden bg-white overflow-hidden border-t border-gray-200 mobile-menu'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {NAVIGATION.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`block rounded-md px-3 py-2 text-base font-medium font-proximanova uppercase ${
                    currentPath === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-800 hover:bg-gray-700 hover:text-white'
                  }`}
                  aria-current={currentPath === item.href ? 'page' : undefined}
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
