'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

/* ---------- Tipagens ---------- */
interface Slide {
  src: string;
  hoverSrc: string;
  title: string;
  pdfUrl?: string;
  photosUrl?: string;
  playlistUrl?: string;
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

  /* ---------- Slides ---------- */
  const SLIDES: Slide[] = [
    {
      src: '/imgSerie/serie1.png',
      hoverSrc: '/imgEvents/serie1.png',
      title: 'FAROL',
      pdfUrl: '/movimento-aviva-farol.pdf',
      photosUrl: '',
      playlistUrl: 'https://open.spotify.com/playlist/6bDHa87vbMKRUGQqemz9M6',
    },
    {
      src: '/imgSerie/serie2.png',
      hoverSrc: '/imgEvents/serie2.png',
      title: 'MESA',
      pdfUrl: '/movimento-aviva-mesa.pdf',
      photosUrl: '',
      playlistUrl: 'https://open.spotify.com/playlist/1UWM7VbUdYkGbfqG57SYjy',
    },
    {
      src: '/imgSerie/serie3.png',
      hoverSrc: '/imgEvents/serie3.png',
      title: 'NÃO TENHAM MEDO',
      pdfUrl: '/movimento-aviva-naotenhamedo.pdf',
      photosUrl:
        'https://drive.google.com/drive/folders/1sbzxLMg-v_tVD-uscAIBHKzvylnArPmO?usp=sharing',
      playlistUrl: 'https://open.spotify.com/playlist/1V3iwsRwdZAh6pYi710GMO',
    },
    {
      src: '/imgSerie/serie-familia.png',
      hoverSrc: '/imgEvents/serie-familia.png',
      title: 'FAMÍLIA',
      pdfUrl: '/movimento-aviva-familia.pdf',
      photosUrl:
        'https://drive.google.com/drive/folders/1vlNMnIdh8P7gF_FBWWMMQ6tQdAAX216H?usp=sharing',
      playlistUrl: '',
    },
    {
      src: '/imgSerie/totus.png',
      hoverSrc: '/imgSerie/totus.png',
      title: 'TOTUS TUUS MARIAE',
      pdfUrl: '/movimento-aviva-totus-tuus-mariae.pdf',
      photosUrl: '',
      playlistUrl: 'https://open.spotify.com/playlist/6rl0ImjIAySCvOuNQekMfN',
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
      {/* título e subtítulo ------------------------------------------------ */}
      <div className='flex justify-center'>
        <p className='mt-4 lg:text-7xl md:text-4xl text-4xl font-neueBold text-[#030303] leading-[55.02px] text-center'>
          Séries
        </p>
      </div>
      <div className='flex justify-center pb-5 text-center font-neueLight text-lg text-gray-800'>
        <p>Todas as séries do movimento Aviva e seu direcionamento.</p>
      </div>

      {/* carrossel --------------------------------------------------------- */}
      <EmblaCarousel
        slides={SLIDES}
        options={OPTIONS}
        onSlideClick={(index) => setSelectedSlide(SLIDES[index] ?? null)}
      />

      {/* modal ------------------------------------------------------------- */}
      {selectedSlide && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={() => setSelectedSlide(null)}
        >
          {/* cartão central com background = capa */}
          <div
            className='relative w-[90%] max-w-md overflow-hidden rounded-2xl'
            style={{
              backgroundImage: `url(${selectedSlide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* camada de escurecimento DENTRO do cartão */}
            <div className='absolute inset-0 bg-black/80' />

            {/* conteúdo principal */}
            <div className='relative z-10 flex flex-col items-center gap-8 px-8 py-10'>
              {/* botão fechar */}
              <button
                onClick={() => setSelectedSlide(null)}
                className='absolute right-4 top-4 text-3xl font-bold text-white'
              >
                ×
              </button>

              {/* título */}
              <h2 className='text-center font-ozikB text-5xl font-bold text-white'>
                {selectedSlide.title}
              </h2>

              {/* ícones */}
              <div className='flex gap-12'>
                {selectedSlide.playlistUrl && (
                  <Link
                    href={selectedSlide.playlistUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-transform hover:scale-110'
                  >
                    <img
                      src='/spotify.svg'
                      alt='Ouvir no Spotify'
                      className='h-24 w-24'
                    />
                  </Link>
                )}

                {selectedSlide.photosUrl && (
                  <Link
                    href={selectedSlide.photosUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-transform hover:scale-110'
                  >
                    <img
                      src='/foto.svg'
                      alt='Ver Fotos'
                      className='h-24 w-24'
                    />
                  </Link>
                )}
              </div>

              {/* botão direcionamento */}
              {selectedSlide.pdfUrl && (
                <a
                  href={selectedSlide.pdfUrl}
                  download
                  className='rounded-full bg-[#3772ff] px-10 py-4 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#2855c7]'
                >
                  DIRECIONAMENTO
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- EmblaCarousel --------------------------------------------- */
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
        <div className='flex items-stretch'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className='group flex-[0_0_80%] cursor-pointer px-2 md:flex-[0_0_50%] lg:flex-[0_0_25%]'
              onClick={() => onSlideClick(index)}
            >
              <div className='relative w-full h-72 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-gray-100 shadow-md'>
                <img
                  src={slide.src}
                  alt={slide.title}
                  className='h-full w-full object-cover transition-opacity duration-300'
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
