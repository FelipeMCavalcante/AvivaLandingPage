'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

interface Slide {
  bgSrc: string;
  title: string;
  description: string;
}

interface EmblaCarouselProps {
  slides: Slide[];
  options: Record<string, unknown>;
  onSlideClick: (index: number) => void;
}

export default function Santos() {
  const OPTIONS = {
    loop: true,
    slidesToScroll: 1,
    align: 'start',
    skipSnaps: false,
  };

  const SLIDES: Slide[] = [
    {
      bgSrc: '/pionovod.png',
      title: 'São Pio',
      description: 'ALGO SOBRE ELE',
    },
    {
      bgSrc: '/nsgnovo.png',
      title: 'Nossa Senhora da Glória',
      description: 'ALGO SOBRE ELA',
    },
    {
      bgSrc: '/teresinhanova.png',
      title: 'Santa Teresinha',
      description: 'ALGO SOBRE ELA',
    },
  ];

  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedSlide(null);
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
        <p className='text-[80px] font-ozikB mb-4 text-[#030303] text-center leading-[54px]'>
          SANTOS BALUARTES
        </p>
      </div>

      <div className='text-gray-800 justify-center flex text-lg px-5 text-center font-outfitregular font-bold'>
        <p>Esses são os nossos santos baluartes.</p>
      </div>

      <div className='relative mt-10'>
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          onSlideClick={(index) => setSelectedSlide(SLIDES[index])}
        />
      </div>

      {selectedSlide && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg p-6 max-w-3xl flex shadow-lg relative'>
            <button
              className='absolute top-2 right-2 text-gray-700 hover:text-black'
              onClick={() => setSelectedSlide(null)}
            >
              ✕
            </button>
            <img
              src={selectedSlide.bgSrc}
              alt={selectedSlide.title}
              className='w-1/2 h-auto rounded-lg'
            />
            <div className='w-1/2 pl-6 flex flex-col justify-center'>
              <h2 className='text-2xl font-bold'>{selectedSlide.title}</h2>
              <p className='text-gray-700 mt-2 text-sm'>
                {selectedSlide.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const EmblaCarousel = ({
  slides,
  options,
  onSlideClick,
}: EmblaCarouselProps) => {
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className='relative mb-0 sm:mb-20' id='Santos'>
      <div className='overflow-hidden w-full' ref={emblaRef}>
        <div className='flex w-full'>
          {slides.map((slide, index) => (
            <div
              className='w-1/3 sm:w-full relative min-w-0 items-center cursor-pointer'
              key={index}
            >
              <div className='relative' onClick={() => onSlideClick(index)}>
                <img
                  src={slide.bgSrc}
                  alt={`Slide ${index + 1}`}
                  className='w-full h-[150px] sm:h-[450px] items-center pointer-events-none object-cover'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
