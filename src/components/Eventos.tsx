'use client';

import * as Dialog from '@radix-ui/react-dialog';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

/* ---------- Tipagens ---------- */
interface Slide {
  src: string;
  title: string;
  description: string;
  link: string; // ← novo: link individual
}

interface EmblaCarouselProps {
  slides: Slide[];
  options: Record<string, unknown>;
}

/* ---------- Componente principal ---------- */
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

  /* seus slides de evento */
  const SLIDES: Slide[] = [
    {
      src: '/imgEventos/forrozim.png',
      title: 'FORROZIM',
      description: '',
      link: 'https://www.e-inscricao.com/paroquia-nossa-senhora-da-gloria/forrozim2025?fbclid=PAQ0xDSwLDx8VleHRuA2FlbQIxMQABp5ewi0KrjQ2UHSfvXDh8qltPISBHnPU33O81cNWW2zSwY3nsnNC-hgIoPIEx_aem_aWQK2hi5Z1A1dE7U4mEa_Q', // link exclusivo
    },
  ];

  return (
    <div className='bg-[#fcfcfc] relative' id='Eventos'>
      {/* título */}
      <div className='flex justify-center'>
        <p className='text-[80px] font-ozikB mt-10 text-[#030303]'>Eventos</p>
      </div>

      {/* subtítulo / descrição (opcional) */}
      <div className='flex justify-center text-center p-5'>
        <p className='text-lg font-outfitregular font-bold text-gray-800'>
          Acompanhe aqui todos os nossos eventos.
        </p>
      </div>

      {/* carrossel */}
      <div className='relative'>
        <EmblaCarousel slides={SLIDES} options={options} />
      </div>
    </div>
  );
}

/* ---------- Carrossel ---------- */
const EmblaCarousel = ({ slides, options }: EmblaCarouselProps) => {
  const [emblaRef] = useEmblaCarousel(options);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);

  return (
    <section className='overflow-hidden relative'>
      {/* viewport */}
      <div className='overflow-hidden w-full' ref={emblaRef}>
        <div className='flex'>
          {slides.map((slide, index) => (
            <div
              className='flex-[0_0_60%] md:flex-[0_0_25%] px-1 mb-6'
              key={index}
            >
              <div
                className='bg-white rounded-lg shadow p-3 w-[240px] md:w-full cursor-pointer'
                onClick={() => setSelectedSlide(slide)}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className='w-full h-40 object-cover rounded mb-3'
                />

                <h3 className='text-lg font-semibold text-center text-gray-800'>
                  {slide.title}
                </h3>

                <p className='text-sm text-gray-600 mt-1 text-justify'>
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Modal (Radix Dialog) ---------- */}
      <Dialog.Root
        open={!!selectedSlide}
        onOpenChange={() => setSelectedSlide(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black/50' />
          <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
            {selectedSlide && (
              <>
                <img
                  src={selectedSlide.src}
                  alt={selectedSlide.title}
                  className='w-full h-60 object-cover rounded mb-4'
                />
                <Dialog.Title className='text-2xl font-bold text-center'>
                  {selectedSlide.title}
                </Dialog.Title>
                <p className='text-gray-700 mt-2'>
                  {selectedSlide.description}
                </p>

                {/* Botão com link individual */}
                <a
                  href={selectedSlide.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-4 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded w-full text-center block'
                >
                  Ver mais
                </a>

                <button
                  className='mt-4 bg-gray-800 hover:bg-gray-900 transition text-white px-4 py-2 rounded w-full'
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
