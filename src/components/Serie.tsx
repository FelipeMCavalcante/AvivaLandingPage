'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

/* ---------- Tipagens ---------- */
interface Slide {
  src: string;
  hoverSrc: string;
  title: string;
  description: string;
  photosUrl?: string; // agora opcionais
  playlistUrl?: string; // agora opcionais
}

interface EmblaCarouselProps {
  slides: Slide[];
  options: Record<string, unknown>;
  onSlideClick: (index: number) => void;
}

/* ---------- Componente principal ---------- */
export default function Serie() {
  const OPTIONS = {
    loop: true,
    dragFree: true,
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 768px) and (max-width: 1023px)': { slidesToScroll: 2 },
      '(max-width: 767px)': { slidesToScroll: 1 },
    },
  };

  const SLIDES: Slide[] = [
    {
      src: '/imgSerie/serie1.png',
      hoverSrc: '/imgEvents/serie1.png',
      title: 'FAROL',
      description: 'FAROL.',
      photosUrl: '',
      playlistUrl: '',
    },
    {
      src: '/imgSerie/serie2.png',
      hoverSrc: '/imgEvents/serie2.png',
      title: 'MESA',
      description: 'MESA.',
      photosUrl: '',
      playlistUrl: '',
    },
    {
      src: '/imgSerie/serie3.png',
      hoverSrc: '/imgEvents/serie3.png',
      title: 'NÃO TENHAM MEDO',
      description: 'NÃO TENHAM MEDO.',
      photosUrl: '',
      playlistUrl: '',
    },
  ];

  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);

  /* ---------- ESC para fechar o modal ---------- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSlide(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className='bg-gray-100' id='Serie'>
      {/* título e subtítulo */}
      <div className='flex justify-center'>
        <p className='mt-10 text-[80px] font-ozikB text-[#030303]'>Séries</p>
      </div>
      <div className='flex justify-center p-5 text-center font-outfitregular text-lg font-bold text-gray-800'>
        <p>Todas as séries do movimento Aviva e um pouco do que sobre elas.</p>
      </div>

      {/* carrossel */}
      <div className='relative'>
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          onSlideClick={(index) => setSelectedSlide(SLIDES[index] ?? null)}
        />
      </div>

      {/* modal */}
      {selectedSlide && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={() => setSelectedSlide(null)}
        >
          <div
            className='relative flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-gray-100 p-6 shadow-lg md:flex-row'
            onClick={(e) => e.stopPropagation()}
          >
            {/* botão fechar */}
            <button
              onClick={() => setSelectedSlide(null)}
              className='absolute right-2 top-2 text-2xl text-gray-600'
            >
              ×
            </button>

            {/* imagem */}
            <div className='w-full flex-shrink-0 md:w-1/3'>
              <img
                src={selectedSlide.src}
                alt={selectedSlide.title}
                className='h-auto w-full rounded-md'
              />
            </div>

            {/* texto + botões */}
            <div className='flex flex-col justify-center'>
              <h2 className='font-ozikB text-[48px] text-gray-800'>
                {selectedSlide.title}
              </h2>
              <p className='mt-2 font-outfitregular text-[16px] leading-[23.68px] text-gray-600'>
                {selectedSlide.description}
              </p>

              {/* --- botões condicionais --- */}
              {(selectedSlide.photosUrl || selectedSlide.playlistUrl) && (
                <div className='mt-6 flex gap-4'>
                  {selectedSlide.photosUrl && (
                    <Link
                      href={selectedSlide.photosUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rounded-md bg-[#01C2CB] px-5 py-2 text-white transition-colors hover:bg-[#0199a1]'
                    >
                      Ver fotos
                    </Link>
                  )}
                  {selectedSlide.playlistUrl && (
                    <Link
                      href={selectedSlide.playlistUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rounded-md border border-[#01C2CB] px-5 py-2 text-[#01C2CB] transition-colors hover:bg-[#01C2CB] hover:text-white'
                    >
                      Ver playlist
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- EmblaCarousel ---------- */
const EmblaCarousel = ({
  slides,
  options,
  onSlideClick,
}: EmblaCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className='relative overflow-hidden pb-6'>
      {/* botão anterior */}
      <button
        onClick={scrollPrev}
        className='absolute left-0 top-1/2 z-10 ml-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md'
      >
        ❮
      </button>

      {/* track */}
      <div className='w-auto overflow-hidden px-4' ref={emblaRef}>
        <div className='flex'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className='group flex-[0_0_80%] cursor-pointer px-2 md:flex-[0_0_50%] lg:flex-[0_0_25%]'
              onClick={() => onSlideClick(index)}
            >
              <div className='relative w-auto overflow-hidden rounded-lg bg-gray-100 shadow-md'>
                <img
                  src={slide.src}
                  alt={slide.title}
                  className='w-full object-cover transition-opacity duration-300'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* botão próximo */}
      <button
        onClick={scrollNext}
        className='absolute right-0 top-1/2 z-10 mr-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md'
      >
        ❯
      </button>
    </section>
  );
};
