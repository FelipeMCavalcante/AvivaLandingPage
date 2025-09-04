'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

/* ---------- Tipagens ---------- */
interface Slide {
  src: string;
  title: string;
  description: string;
  link: string;
}

interface EmblaCarouselProps {
  slides: Slide[];
  options: Record<string, unknown>;
}

/* ---------- Componente principal ---------- */
export default function Eventos() {
  const [options, setOptions] = useState({
    loop: true,
    dragFree: true,
    align: 'start',
  });

  useEffect(() => {
    const updateOptions = () => {
      setOptions({
        loop: true,
        dragFree: true,
        align: 'start',
      });
    };
    updateOptions();
    window.addEventListener('resize', updateOptions);
    return () => window.removeEventListener('resize', updateOptions);
  }, []);

  const SLIDES: Slide[] = [
    {
      src: '/imgEventos/avivamento.png',
      title: 'Avivamento',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis est elit, sed facilisis enim lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis est elit, sed facilisis enim lobortis.',
      link: 'https://www.e-inscricao.com/paroquia-nossa-senhora-da-gloria/avivamento-2025',
    },
    {
      src: '/imgEventos/aviva-camp.png',
      title: 'Aviva Camp 2025',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis est elit, sed facilisis enim lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis est elit, sed facilisis enim lobortis.',
      link: 'https://drive.google.com/drive/folders/1DZVcE5SnhNEj8kfyFg0WVoIwb6QMiI23?usp=sharing',
    },
  ];

  return (
    <div className='bg-[#fcfcfc] relative py-12' id='Eventos'>
      {/* título */}
      <div className='flex flex-col items-center'>
        <p className='lg:text-6xl md:text-5xl text-4xl font-neueBold text-[#030303] text-center'>
          Eventos
        </p>
        <p className='flex justify-center  text-center font-neueLight text-lg text-gray-800'>
          Fique por dentro dos nossos eventos
        </p>
      </div>

      {/* carrossel */}
      <div className='relative mt-10'>
        <EmblaCarousel slides={SLIDES} options={options} />
      </div>
    </div>
  );
}

/* ---------- Carrossel ---------- */
const EmblaCarousel = ({ slides, options }: EmblaCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className='relative'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {slides.map((slide, index) => (
            <div className='flex-[0_0_100%]' key={index}>
              {/* padding aplicado no container do slide → texto e imagem respeitam o mesmo padding */}
              <div className='px-4 sm:px-6 md:px-12 lg:px-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8 md:gap-10'>
                  <div className='w-full md:ml-auto'>
                    <div className='relative w-full aspect-[16/9] rounded-lg shadow-lg overflow-hidden'>
                      <img
                        src={slide.src}
                        alt={slide.title}
                        className='absolute inset-0 h-full w-full object-cover'
                      />
                    </div>
                  </div>
                  {/* Texto */}
                  <div className='py-6'>
                    <h3 className='text-2xl sm:text-3xl md:text-4xl font-neueBold text-black mb-4 text-center sm:text-left'>
                      {slide.title}
                    </h3>
                    <p className='text-gray-700 mb-5 sm:mb-6 leading-relaxed font-neueLight text-sm sm:text-base text-center sm:text-left'>
                      {slide.description}
                    </p>
                    <div className='text-center md:text-left'>
                      <a
                        href={slide.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-[#3871FD] hover:bg-blue-700 transition text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-neueBold inline-block'
                      >
                        Ver mais
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* setas com imagens (mantidas) */}
      <button
        onClick={scrollPrev}
        className='absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white shadow border border-black/5'
        aria-label='Anterior'
      >
        <img src='/seta-esquerda.svg' alt='' className='w-6 h-6' />
      </button>
      <button
        onClick={scrollNext}
        className='absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white shadow border border-black/5'
        aria-label='Próximo'
      >
        <img src='/seta-direita.svg' alt='' className='w-6 h-6' />
      </button>

      {/* indicadores (dots) */}
      <div className='flex justify-center mt-5 sm:mt-6 gap-2 sm:gap-3'>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              idx === selectedIndex
                ? 'bg-gray-800'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
            aria-current={idx === selectedIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
};
