'use client';
import * as Dialog from '@radix-ui/react-dialog';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

// Tipo para cada slide
interface Slide {
  src: string;
  title: string;
  description: string;
}

// Props do EmblaCarousel
interface EmblaCarouselProps {
  slides: Slide[];
  options: Record<string, unknown>;
}

export default function Highlights() {
  const [options, setOptions] = useState({
    loop: true,
    dragFree: true,
    slidesToScroll: 1,
    align: 'start',
  });

  useEffect(() => {
    const updateOptions = () => {
      if (window.innerWidth < 768) {
        setOptions({
          loop: true,
          dragFree: true,
          slidesToScroll: 1,
          align: 'start',
        });
      } else {
        setOptions({
          loop: true,
          dragFree: true,
          slidesToScroll: 1,
          align: 'start',
        });
      }
    };

    updateOptions();
    window.addEventListener('resize', updateOptions);
    return () => window.removeEventListener('resize', updateOptions);
  }, []);

  const SLIDES: Slide[] = [
    {
      src: '/imgProjects/j1.png',
      title: 'FEIJOADA',
      description: 'Descrição do evento Feijoada',
    },
    {
      src: '/imgProjects/j1.png',
      title: 'AVIVAMENTO',
      description: 'Descrição do evento Avivamento',
    },
    {
      src: '/imgProjects/j1.png',
      title: 'RETIRO AVIVA',
      description: 'Descrição do evento Retiro Aviva',
    },
  ];

  return (
    <div className='bg-[#fcfcfc] relative' id='Projects'>
      <div className='flex justify-center mt-10'>
        <p className='text-[80px] font-bold mt-10 text-[#030303]'>EVENTOS</p>
      </div>

      <div className='text-gray-800 text-center font-bold text-lg p-5'>
        <p>
          Desafiando Limites e Criando Oportunidades para Transformar Vidas pelo
          Evangelho.
        </p>
      </div>

      <div className='relative'>
        <EmblaCarousel slides={SLIDES} options={options} />
      </div>
    </div>
  );
}

const EmblaCarousel = ({ slides, options }: EmblaCarouselProps) => {
  const [emblaRef] = useEmblaCarousel(options);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);

  return (
    <section className='overflow-hidden relative max-h-full'>
      <div className='overflow-hidden w-full' ref={emblaRef}>
        <div className='flex'>
          {slides.map((slide, index) => (
            <div
              className='flex-[0_0_75%] md:flex-[0_0_33.33%] px-2 mb-8'
              key={index}
            >
              <div
                className='bg-white rounded-lg shadow-md p-4 flex flex-col w-auto h-full cursor-pointer'
                onClick={() => setSelectedSlide(slide)}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className='w-full h-auto object-cover rounded-md mb-4'
                />
                <h3 className='text-xl font-bold text-gray-800 text-center'>
                  {slide.title}
                </h3>
                <p className='text-gray-600 mt-2 text-justify'>
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal usando Radix UI */}
      <Dialog.Root
        open={!!selectedSlide}
        onOpenChange={() => setSelectedSlide(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
          <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
            {selectedSlide && (
              <>
                <img
                  src={selectedSlide.src}
                  alt={selectedSlide.title}
                  className='w-full h-60 object-cover rounded-md mb-4'
                />
                <Dialog.Title className='text-2xl font-bold'>
                  {selectedSlide.title}
                </Dialog.Title>
                <p className='text-gray-700 mt-2'>
                  {selectedSlide.description}
                </p>
                <a
                  href='https://www.instagram.com/aviva.gloria/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full text-center block'
                >
                  Comprar
                </a>
                <button
                  className='mt-4 bg-gray-800 text-white px-4 py-2 rounded w-full'
                  onClick={() => setSelectedSlide(null)}
                >
                  Fechar
                </button>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};
