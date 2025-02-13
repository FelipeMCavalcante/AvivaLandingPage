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
      src: '/imgProjects/P1.png',
      title: 'PARÁRRAIÁ',
      description:
        'O Parárraiá, o São João da Amazônia 2024, rolou entre os dias 13 e 16 de junho no estacionamento do Mangueirão, em Belém. Foi a estreia do Pará no circuito das grandes festas juninas do Brasil, e que estreia! Com entrada gratuita, milhares de pessoas curtiram a festa todas as noites. A cultura amazônica brilhou em shows de Luan Santana, Xand Avião, Joelma, João Gomes, Mari Fernandez e Nattan, além de apresentações regionais e quadrilhas juninas.',
    },
    {
      src: '/imgProjects/P2.png',
      title: 'SÃO JOÃO DE CAMPINA GRANDE',
      description:
        'No Maior São João do Mundo, em Campina Grande, os artistas da Vybbe deram um show à parte no Parque do Povo. Destaque para o emocionante “Forró é Pop”, de Xand Avião, que resgatou as raízes do forró em uma noite histórica. A Vybbe foi parceira na realização desse momento único, celebrando a tradição e a modernidade do forró em sua essência.',
    },
    {
      src: '/imgProjects/P3.png',
      title: 'EUSÉBIO JUNINO',
      description:
        'O Eusébio Junino 2024, de 22 a 30 de junho, celebrou os 37 anos do município de Eusébio, no Ceará, com muita festa e tradição. Cerca de 100 mil pessoas curtiram uma programação rica, com festival de quadrilhas e shows gratuitos. No palco, Mari Fernandez, Xand Avião, Nattan e DJ Alok fizeram a festa! O evento também fortaleceu a economia local, gerando empregos e impulsionando o comércio. Uma celebração que já é tradição no calendário junino do Brasil!',
    },
    {
      src: '/imgProjects/P4.png',
      title: 'SÃO JOÃO DE PETROLINA',
      description:
        'No São João de Petrolina 2024, realizado entre os dias 14 e 24 de junho no Pátio de Eventos Ana das Carrancas, artistas da Vybbe tiveram grande destaque na programação. Xand Avião, Nattan, Mari Fernandez, Zé Vaqueiro e Felipe Amorim animaram o público em noites memoráveis. O evento, considerado um dos maiores festejos juninos do Brasil, reuniu cerca de 50 atrações e atraiu milhares de pessoas, consolidando-se como um marco cultural e econômico para a cidade.',
    },
    {
      src: '/imgProjects/P5.png',
      title: 'BUMBA MEU SÃO JOÃO',
      description:
        'No São João de São Luís 2024, a Vybbe marcou presença com o exclusivo espaço “Bumba Meu São João”, realizado na área externa do Castelão entre 13 e 21 de junho. A festa trouxe uma programação poderosa com Xand Avião, Mari Fernandez, Nattan, Felipe Amorim, Zé Vaqueiro, Jonas Esticado e Guilherme Dantas. Além dos talentos da Vybbe, o evento contou com apresentações de artistas nacionais e regionais, celebrando a diversidade e a riqueza cultural do Maranhão em uma experiência única.',
    },
    {
      src: '/imgProjects/P6.png',
      title: 'SÃO JOÃO DE BANANEIRAS',
      description:
        'No São João de Bananeiras 2024, a Vybbe levou sua energia contagiante para o Bananeiras Parque, na Paraíba! De 14 a 24 de junho, Xand Avião, Nattan, Mari Fernandez e Felipe Amorim embalaram a festa com shows que reuniram multidões e agitaram a cidade. Com uma estrutura grandiosa e uma vibe junina inesquecível, o evento movimentou cerca de R$ 40 milhões na economia local, consolidando Bananeiras como um dos principais destinos juninos do Nordeste.',
    },
    {
      src: '/imgProjects/j1.png',
      title: 'TUMTARARÁ',
      description:
        'Liderado por Xand Avião em parceria com o IPREDE, essa iniciativa beneficia mais de 2 mil crianças, incluindo aquelas com deficiência, autismo, microcefalia e paralisia cerebral. Financiado pelo próprio artista, o espaço dedicado à música vai além das notas: é terapia, inclusão e desenvolvimento. Aqui, a cultura nordestina e a solidariedade se unem para mostrar que a arte pode mudar o mundo. É emoção, é propósito, é a força da música fazendo a diferença!',
    },
    {
      src: '/imgProjects/P9.png',
      title: 'VEM PRA VYBBE',
      description:
        'O "Vem pra Vybbe" é um projeto lançado em 2024 para descobrir novos talentos nas áreas de produção musical, artística e audiovisual. Após inscrições e etapas seletivas, realizadas no mês de novembro em Fortaleza, os aprovados de diferentes áreas foram contratados para integrar a equipe da Vybbe, contribuindo com seus grandes projetos e eventos. A iniciativa reforça o compromisso da empresa com inovação e renovação no mercado do entretenimento',
    },
  ];

  return (
    <div className='bg-#fcfcfc relative' id='Projects'>
      {/* Título da seção */}
      <div className='flex justify-center mt-10'>
        <p className='text-[80px] font-ozikB mt-10 text-[#030303]'>PROJETOS</p>
      </div>

      {/* Descrição */}
      <div className='text-gray-800 justify-center flex font-outfitregular font-bold text-lg p-5'>
        <p>
          Desafiando limites e criando oportunidades que mudam o mundo: conheça
          os projetos transformadores desenvolvidos pela Vybbe.
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
