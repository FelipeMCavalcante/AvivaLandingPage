'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

interface Slide {
  src: string;
  hoverSrc: string;
  title: string;
  description: string;
}

interface EmblaCarouselProps {
  slides: Slide[];
  options: Record<string, unknown>;
  onSlideClick: (index: number) => void;
}

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
      src: '/imgEvents/serie1.PNG',
      hoverSrc: '/imgEvents/serie1.PNG',
      title: 'SERIE 1',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgEvents/serie2.PNG',
      hoverSrc: '/imgEvents/serie2.PNG',
      title: 'SERIE 2',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgEvents/serie3.PNG',
      hoverSrc: '/imgEvents/serie3.PNG',
      title: 'SERIE 3',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgEvents/serie4.PNG',
      hoverSrc: '/imgEvents/serie4.PNG',
      title: 'SERIE 4',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgEvents/serie5.PNG',
      hoverSrc: '/imgEvents/serie5.PNG',
      title: 'SERIE 5',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgEvents/serie6.PNG',
      hoverSrc: '/imgEvents/serie6.PNG',
      title: 'SERIE 6',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgEvents/serie7.PNG',
      hoverSrc: '/imgEvents/serie7.PNG',
      title: 'SERIE 7',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
    <div className='bg-gray-100' id='Serie'>
      <div className='flex justify-center'>
        <p className='text-[80px] font-ozikB mt-10 text-[#030303]'>Séries</p>
      </div>

      <div className='text-gray-800 justify-center text-center flex font-outfitregular text-lg p-5 font-bold'>
        <p>Todas as séries do movimento Aviva e um pouco do que sobre elas.</p>
      </div>

      <div className='relative'>
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          onSlideClick={(index: number) => {
            const selectedSlide = SLIDES[index] || null;
            setSelectedSlide(selectedSlide);
          }}
        />
      </div>

      {selectedSlide && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
          onClick={() => setSelectedSlide(null)}
        >
          <div
            className='bg-gray-100 p-6 rounded-lg shadow-lg max-w-2xl w-full flex relative'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSlide(null)}
              className='absolute top-2 right-2 text-gray-600 text-2xl'
            >
              ×
            </button>
            <div className='flex-shrink-0 w-1/3'>
              <img
                src={selectedSlide.src}
                alt={selectedSlide.title}
                className='w-auto h-auto rounded-md'
              />
            </div>
            <div className='ml-6 flex flex-col justify-center'>
              <h2 className='text-[48px] font-ozikB text-gray-800'>
                {selectedSlide.title}
              </h2>
              <p className='text-gray-600 mt-2 font-outfitregular text-[16px] leading-[23.68px]'>
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
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className='overflow-hidden relative pb-6'>
      <button
        onClick={scrollPrev}
        className='absolute left-0 top-1/2 transform -translate-y-1/2 text-black w-12 h-12 flex items-center justify-center rounded-full z-10 shadow-md transition-all bg-white'
      >
        ❮
      </button>
      <div className='overflow-hidden w-auto' ref={emblaRef}>
        <div className='flex'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className='flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_25%] px-2 cursor-pointer group'
              onClick={() => onSlideClick(index)}
            >
              <div className='bg-gray-100 w-auto h-auto rounded-lg shadow-md overflow-hidden relative'>
                <img
                  src={slide.src}
                  alt={slide.title}
                  className='object-cover w-full transition-opacity duration-300'
                />
              </div>
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
