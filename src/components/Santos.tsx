'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

interface Slide {
  bgSrc: string;
  overlaySrc: string;
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
    { bgSrc: '/imgArtist/NSG.png', overlaySrc: '/imgArtist/NUVEM.png' },
    { bgSrc: '/imgArtist/NSG.png', overlaySrc: '/imgArtist/NUVEM.png' },
    { bgSrc: '/imgArtist/NSG.png', overlaySrc: '/imgArtist/NUVEM.png' },
    { bgSrc: '/imgArtist/NSG.png', overlaySrc: '/imgArtist/NUVEM.png' },
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
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className='relative mb-0 sm:mb-20'>
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
                className='h-[150px] sm:h-[300px] mb-20 mt-20'
              />
              <img
                src={slide.overlaySrc}
                alt={`Overlay ${index + 1}`}
                className={`absolute inset-0 h-[220px] sm:h-[300px] object-contain z-10 mt-[141px] sm:mt-[110px]  ml-[50px] sm:ml-4

  `}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
