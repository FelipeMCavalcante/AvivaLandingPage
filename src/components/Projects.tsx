'use client';
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

  // Ajusta a configuração do carrossel conforme a largura da tela
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
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgProjects/j1.png',
      title: 'AVIVAMENTO',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgProjects/j1.png',
      title: 'RETIRO AVIVA',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgProjects/j1.png',
      title: 'PROJETO1',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgProjects/j1.png',
      title: 'PROJETO2',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      src: '/imgProjects/j1.png',
      title: 'PROJETO3',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];

  return (
    <div className='bg-#fcfcfc relative' id='Projects'>
      {/* Título da seção */}
      <div className='flex justify-center mt-10'>
        <p className='text-[80px] font-ozikB mt-10 text-[#030303]'>PROJETOS</p>
      </div>

      {/* Descrição */}
      <div className='text-gray-800 justify-center text-center flex font-outfitregular font-bold text-lg p-5'>
        <p>
          Desafiando Limites e Criando Oportunidades para Transformar Vidas pelo
          Evangelho.
        </p>
      </div>

      {/* Carousel */}
      <div className='relative'>
        <EmblaCarousel slides={SLIDES} options={options} />
      </div>
    </div>
  );
}

// Carousel com conteúdo no slide
const EmblaCarousel = ({ slides, options }: EmblaCarouselProps) => {
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className='overflow-hidden relative max-h-full'>
      <div className='overflow-hidden w-full' ref={emblaRef}>
        <div className='flex'>
          {slides.map((slide, index) => (
            <div
              className='flex-[0_0_75%] md:flex-[0_0_33.33%] px-2 mb-8'
              key={index}
            >
              <div className='bg-white rounded-lg shadow-md p-4 flex flex-col w-auto h-full'>
                <img
                  src={slide.src}
                  alt={slide.title}
                  className='w-full h-auto object-cover rounded-md mb-4'
                />
                <h3 className='text-xl3 font-bold text-gray-800 text-center font-ozikB'>
                  {slide.title}
                </h3>
                <p className='text-base text-gray-600 mt-2 text-justify font-outfitregular'>
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
