'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
// OUTRO PR
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

export default function Events() {
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
      src: '/imgEvents/bgMari.jpg',
      hoverSrc: '/imgEvents/hoverMari4.png',
      title: 'MARI SEM FIM',
      description:
        'O Mari Sem Fim é uma maratona de música, energia e emoção! Criada por Mari Fernandez, essa label já rodou o Brasil com shows épicos em festivais como Caldas Country e Jaguariúna. Cada edição é pura intensidade, com a galera vibrando ao som dos maiores hits da artista!',
    },
    {
      src: '/imgEvents/bgKiss.jpg',
      hoverSrc: '/imgEvents/hoverkiss2.png',
      title: 'KISS ME',
      description:
        'A Kiss Me, do Felipe Amorim, chega misturando piseiro, trap, funk e pop em uma festa única. Desde a estreia em 2022, em Fortaleza, já passou por Natal e voltou com tudo em 2023 no Colosso. É ritmo, vibe e muita resenha!',
    },
    {
      src: '/imgEvents/bgDesmanttelo.jpg',
      hoverSrc: '/imgEvents/hovernattan.png',
      title: 'DESMANTTELO',
      description:
        'O Desmantello do Nattan veio para causar! Desde 2023, a festa arrasta multidões com a energia e o carisma do Nattan. Em 2025, o desmantello cresce: vira festival! Dia 8 de fevereiro, Recife vai ferver com o rolê mais esperado do ano!',
    },
    {
      src: '/imgEvents/bgAvioes.jpg',
      hoverSrc: '/imgEvents/hoverAvioes2.png',
      title: 'AVIÕES FANTASY',
      description:
        'O Aviões Fantasy é a festa à fantasia que já virou tradição com Xand Avião. A maior festa à fantasia do Brasil. Em 2023, rolou no dia 28 de outubro, em Fortaleza, com uma estrutura gigante para 45 mil pessoas! Além do show, a festa movimenta a economia — em 2022, foram R$ 12 milhões e visitantes de 15 estados. É música, criatividade e interação em cenários temáticos e experiências que fazem a galera pirar.',
    },
    {
      src: '/imgEvents/bgNoittada.jpg',
      hoverSrc: '/imgEvents/hoverNoittada2.png',
      title: 'NOITTADA COM NATTAN',
      description:
        'Noittada com Nattan é o novo rolê do Nattan que teve sua largada no dia 13 de dezembro de 2024, em Salvador, no Terminal Náutico. Exclusiva e intimista, essa festa "all black" traz uma vibe sofisticada, misturando o luxo europeu com a energia das noites nova-iorquinas. É Nattan levando o conceito de festa para outro nível. Vem muito som e momentos únicos por aí!',
    },
    {
      src: '/imgEvents/bgXandy.jpg',
      hoverSrc: '/imgEvents/hoverXandy2.png',
      title: "XAND'S BAR",
      description:
        'O Xand’s Bar é aquele projeto que traz o Xand Avião para perto, num clima de resenha e nostalgia. É como entrar num bar onde o próprio Xand puxa o som, cantando os hits que marcaram sua história. A próxima edição rola dia 21 de dezembro de 2024, no Marina Park Hotel, em Fortaleza. Um encontro descontraído e cheio de memória afetiva — bora?',
    },
    {
      src: '/imgEvents/bgViiixe.jpg',
      hoverSrc: '/imgEvents/hoverViiixe2.png',
      title: 'FESTIVAL VIIIXE',
      description:
        'O VIIIXE! é o festival que coloca a música nordestina no topo! Desde 2022, ele já arrastou multidões pelo Brasil, somando mais de 300 mil pessoas na primeira turnê. Em 2024, voltou com tudo pra São Paulo, na Arena Anhembi, no dia 20 de abril. É forró, estrutura gigante e uma vibe única, com o público vibrando do começo ao fim. E em 2025, o objetivo é claro: ser o maior festival de forró do mundo!',
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
    <div className='bg-gray-100' id='Events'>
      <div className='flex justify-center'>
        <p className='text-[80px] font-ozikB mt-10 text-[#030303]'>EVENTOS</p>
      </div>

      <div className='text-gray-800 justify-center flex font-outfitregular text-lg p-5 font-bold'>
        <p>
          Vybbe é emoção, inovação e entretenimento: Vem curtir os nossos
          eventos.
        </p>
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
                className='w-full h-auto rounded-md'
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
      <div className='overflow-hidden w-full' ref={emblaRef}>
        <div className='flex'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className='flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_25%] px-2 cursor-pointer group'
              onClick={() => onSlideClick(index)}
            >
              <div className='bg-gray-100 w-full h-auto rounded-lg shadow-md overflow-hidden relative'>
                <img
                  src={slide.src}
                  alt={slide.title}
                  className='object-cover transition-opacity duration-300 group-hover:opacity-0'
                />
                <img
                  src={slide.hoverSrc}
                  alt={`${slide.title} hover`}
                  className='h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                  loading='lazy'
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
