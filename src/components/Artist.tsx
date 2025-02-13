'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';

interface Slide {
  bgSrc: string;
  overlaySrc: string;
}

interface EmblaCarouselProps {
  slides: Slide[];
  options: Record<string, unknown>;
  onSlideClick: (index: number) => void;
}

export default function Artist() {
  const OPTIONS = {
    loop: true,
    slidesToScroll: 1,
    align: 'start',
    skipSnaps: false,
  };

  const SLIDES: Slide[] = [
    { bgSrc: '/imgArtist/bgav.png', overlaySrc: '/imgArtist/AVINE.png' },
    { bgSrc: '/imgArtist/b2.png', overlaySrc: '/imgArtist/MARI.png' },
    { bgSrc: '/imgArtist/b3.png', overlaySrc: '/imgArtist/ZeV.png' },
    { bgSrc: '/imgArtist/b4.png', overlaySrc: '/imgArtist/nattan.png' },
    { bgSrc: '/imgArtist/BG5.png', overlaySrc: '/imgArtist/xand.png' },
    { bgSrc: '/imgArtist/BG6.png', overlaySrc: '/imgArtist/manim.png' },
    { bgSrc: '/imgArtist/BG7.png', overlaySrc: '/imgArtist/ZC.png' },
    { bgSrc: '/imgArtist/BG8.png', overlaySrc: '/imgArtist/jonas.png' },
    { bgSrc: '/imgArtist/BG9.png', overlaySrc: '/imgArtist/leo.png' },
    { bgSrc: '/imgArtist/BG10.png', overlaySrc: '/imgArtist/guilherme.png' },
    { bgSrc: '/imgArtist/BG11.png', overlaySrc: '/imgArtist/ralk.png' },
    { bgSrc: '/imgArtist/BG12.png', overlaySrc: '/imgArtist/KP.png' },
    { bgSrc: '/imgArtist/BGF.png', overlaySrc: '/imgArtist/felipeam.png' },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Escape key pressed');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='bg-white' id='Artist'>
      <div className='flex justify-center'>
        <p className='text-[80px] font-ozikB mb-4 text-[#030303]'>
          TESTE ARTISTA
        </p>
      </div>

      <div className='text-gray-800 justify-center flex text-lg px-5 text-center font-outfitregular font-bold'>
        <p>
          Os artistas da nossa Vybbe são a voz de uma cultura que não reconhece
          fronteiras: Conheça nosso cast!
        </p>
      </div>

      <div className='relative mt-10'>
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          onSlideClick={() => {}}
        />
      </div>
    </div>
  );
}

const EmblaCarousel = ({
  slides,
  options,
  onSlideClick,
}: EmblaCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className='relative mb-0 sm:mb-20'>
      <button
        onClick={scrollPrev}
        className='absolute left-0 top-1/2 transform -translate-y-1/2 text-black w-12 h-12 flex items-center justify-center rounded-full z-10 shadow-md transition-all bg-white'
      >
        ❮
      </button>

      <div className='overflow-hidden w-full' ref={emblaRef}>
        <div className='flex gap-0 min-w-0'>
          {slides.map((slide, index) => (
            <div
              className='flex-[0_0_auto] relative -mr-px min-w-0'
              key={index}
              onClick={() => onSlideClick(index)}
            >
              <img
                src={slide.bgSrc}
                alt={`Slide ${index + 1}`}
                className='h-[150px] sm:h-[200px] mb-20 mt-20'
              />
              <img
                src={slide.overlaySrc}
                alt={`Overlay ${index + 1}`}
                className={`absolute inset-0 h-[220px] sm:h-[300px] object-contain z-10 mt-[61px] sm:mt-[50px] transition-all duration-300 
  sm:hover:h-[350px] sm:hover:mt-[12px] ml-[94px] sm:ml-8
  ${
    slide.overlaySrc === '/imgArtist/felipeam.png'
      ? 'sm:hover:mt-[19px]'
      : 'sm:hover:mt-[12px]'
  }
  ${
    slide.overlaySrc === '/imgArtist/felipeam.png' ||
    slide.overlaySrc === '/imgArtist/KP.png'
      ? 'justify-center ml-[-10px]'
      : 'hover:ml-[0px]'
  }
  `}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollNext}
        className='absolute right-0 top-1/2 transform -translate-y-1/2 text-black w-12 h-12 flex items-center justify-center rounded-full z-10 shadow-md transition-all bg-white'
      >
        ❯
      </button>
    </section>
  );
};
