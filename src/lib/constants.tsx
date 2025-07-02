import { FaDatabase } from 'react-icons/fa6';
import {
  IoLogoAndroid,
  IoLogoDocker,
  IoLogoFigma,
  IoLogoJavascript,
  IoLogoNodejs,
  IoLogoReact,
} from 'react-icons/io5';
import {
  // SiAmazonaws,
  SiExpress,
  SiGithubactions,
  SiGooglecloud,
  SiHeroku,
  SiIos,
  SiKubernetes,
  // SiMicrosoftazure,
  SiNestjs,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
} from 'react-icons/si';
import { TbBrandNextjs, TbBrandTerraform, TbBrandVercel } from 'react-icons/tb';

export const NAVIGATION = [
  { name: 'MOVIMENTO', href: '/#Us', current: true },
  { name: 'SÉRIES', href: '/#Serie', current: false },
  { name: 'BALUARTES', href: '/#Santos', current: false },
  { name: 'EVENTOS', href: '/#Projects', current: false },
  { name: 'COMUNIDADE', href: '/#Contact', current: false },
];

export interface ClientImageProps {
  src: string;
  alt: string;
  background?: string;
}

export interface Client {
  src: string;
  alt: string;
}

export interface Portfolio {
  name: string;
  description: string;
  src: string;
  alt: string;
}

export const CLIENTS: Client[] = [
  { src: '/clients/logo_alloha_positivo.png', alt: 'Alloha positivo' },
  {
    src: '/clients/Logo-Areba-Pinto-removebg-preview.png',
    alt: 'Areba-Pinto-removebg',
  },
  { src: '/clients/Alva Contabilidade.png', alt: 'Alva Contabilidade' },
  { src: '/clients/AMP Advocacia.png', alt: 'AMP Advocacia' },
  { src: '/clients/Ancar_logo.png', alt: 'Ancar' },
  { src: '/clients/ARCANJOSLIFE.png', alt: 'ARCANJOSLIFE' },
  { src: '/clients/AURIA.png', alt: 'AURIA' },
  { src: '/clients/logo-br22-preta.png', alt: 'br22-preta' },
  { src: '/clients/Bahea.png', alt: 'Bahea.png' },
  { src: '/clients/benedik.png', alt: 'benedik.png' },
  { src: '/clients/B2.png', alt: 'B2.png' },
  { src: '/clients/Blanc SPA.png', alt: 'Blanc SPA.png' },
  { src: '/clients/Logo2_Black_Prime_.png', alt: 'Logo2_Black_Prime' },
  { src: '/clients/Clínica Babella.png', alt: 'Clínica Babella.png' },
  { src: '/clients/CLÍNICA FELIZARDO.png', alt: 'CLÍNICA FELIZARDO' },
  { src: '/clients/ClínicaLucyannaBaracat.png', alt: 'ClínicaLucyannaBaracat' },
  { src: '/clients/Code2.png', alt: 'Code2' },
  { src: '/clients/CRIA.mov.png', alt: 'CRIA.mov' },
  { src: '/clients/LOGOMARCA CLUB.png', alt: 'LOGOMARCA CLUB' },
  {
    src: '/clients/logo_casa-204_vertical_laranja.png',
    alt: 'Casa-204_vertical_laranja',
  },
  { src: '/clients/D_Castro.png', alt: 'D_Castro' },
  { src: '/clients/dali.png', alt: 'dali' },
  { src: '/clients/Global.png', alt: 'Global' },
  { src: '/clients/Grupo Altri.png', alt: 'Grupo Altri' },
  { src: '/clients/Logo-GrupoFlug-preto.png', alt: 'Logo-GrupoFlug-preto' },
  { src: '/clients/Holder.png', alt: 'Holder' },
  { src: '/clients/Incrivel Hamburgueria.png', alt: 'Incrivel Hamburgueria' },
  { src: '/clients/instituto steinkopf.png', alt: 'instituto steinkopf' },
  {
    src: '/clients/Logo_Wolney_vetor-1-removebg-preview.png',
    alt: 'Wolney_vetor-1-removebg-preview',
  },
  { src: '/clients/LogoNegativo.png', alt: 'LogoNegativo' },
  { src: '/clients/Magnólia.png', alt: 'Magnólia.png' },
  { src: '/clients/MARCOSROGERIOADV.png', alt: 'MARCOSROGERIOADV' },
  { src: '/clients/Meet.png', alt: 'Meet.png' },
  { src: '/clients/MOAI.png', alt: 'MOAI' },
  { src: '/clients/senai-logo-0.png', alt: 'senai-logo' },
  { src: '/clients/SESC.png', alt: 'SESC' },
  { src: '/clients/Solvitech.png', alt: 'Solvitech.png' },
  { src: '/clients/Tax All.png', alt: 'Tax All.png' },
  { src: '/clients/TRK.png', alt: 'TRK.png' },
  {
    src: '/clients/Logos_Preto - Sem assinatura.png',
    alt: 'Logos_Preto - vieira e serra',
  },

  { src: '/clients/LOGO PRETA VAI BEM PNG.png', alt: 'LOGO PRETA VAI BEM ' },

  {
    src: '/clients/PADRAO DE APRESENTACAO - VSG CONNECT GLOBAL.png',
    alt: 'CONNECT GLOBAL',
  },

  {
    src: '/clients/Verbalize_Logo_Prancheta 1-10.png',
    alt: 'Verbalize_Logo_Prancheta 1-10.png',
  },
  { src: '/clients/VR ASSESSORIA.png', alt: 'VR ASSESSORIA.png' },
  { src: '/clients/capim-preto-branco.svg', alt: 'vybbe' },
];

export const PORTFOLIO: Portfolio[] = [
  {
    name: 'Sucré',
    description:
      'Capim Tech implementou um aplicativo e totem de autoatendimento para a Sucré, otimizando a interação do cliente com um sistema de vendas ágil diretamente na loja.',
    src: '/portfolio/sucre.png',
    alt: 'Sucré',
  },
  {
    name: 'Fiscaleza',
    description:
      'Para Fiscaleza, a Capim Tech desenvolveu um site e um sistema de gestão de denúncias, melhorando a capacidade de reporte e acompanhamento de problemas urbanos pela população.',
    src: '/portfolio/fiscaleza.png',
    alt: 'Fiscaleza',
  },
  {
    name: 'Talismã',
    description:
      'A Capim Tech projetou um aplicativo de vendas para Talismã, ampliando o alcance e a eficiência na comercialização de semijoias e bijuterias de qualidade.',
    src: '/portfolio/talisma.png',
    alt: 'Talismã',
  },
  {
    name: 'Auto Escola Júnior',
    description:
      'Capim Tech criou um app para Auto Escola Júnior que permite o acompanhamento de exames e gestão financeira, facilitando a administração educacional de motoristas.',
    src: '/portfolio/auto-escola-junior.png',
    alt: 'Auto Escola Júnior',
  },
];

export const WPP_NUMBER = '556199498605';
export const WPP_MESSAGE =
  'Ol%C3%A1!%20Acessei%20o%20site%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20Instituto.%E2%84%83';

export const TOOLS = [
  { name: 'React', icon: <IoLogoReact />, category: ['Frontend'] },
  {
    name: 'React Native',
    icon: <IoLogoReact />,
    category: ['Frontend', 'Mobile'],
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript />,
    category: ['Frontend', 'Backend', 'Mobile'],
  },
  {
    name: 'JavaScript',
    icon: <IoLogoJavascript />,
    category: ['Frontend', 'Backend', 'Mobile'],
  },
  { name: 'Next.js', icon: <TbBrandNextjs />, category: ['Frontend'] },
  { name: 'NodeJS', icon: <IoLogoNodejs />, category: ['Backend'] },
  { name: 'NestJS', icon: <SiNestjs />, category: ['Backend'] },
  { name: 'ExpressJS', icon: <SiExpress />, category: ['Backend'] },
  {
    name: 'WordPress',
    icon: <SiWordpress />,
    category: ['Frontend', 'Backend'],
  },
  { name: 'Figma', icon: <IoLogoFigma />, category: ['Frontend'] },
  { name: 'Docker', icon: <IoLogoDocker />, category: ['DevOps'] },
  { name: 'Kubernetes', icon: <SiKubernetes />, category: ['DevOps'] },
  { name: 'Terraform', icon: <TbBrandTerraform />, category: ['DevOps'] },
  // { name: 'AWS', icon: <SiAmazonaws />, category: ['DevOps'] },
  // { name: 'Azure', icon: <SiMicrosoftazure />, category: ['DevOps'] },
  { name: 'Google Cloud', icon: <SiGooglecloud />, category: ['DevOps'] },
  { name: 'CloudCluster', icon: <FaDatabase />, category: ['DevOps'] },
  { name: 'Vercel', icon: <TbBrandVercel />, category: ['DevOps'] },
  { name: 'Heroku', icon: <SiHeroku />, category: ['DevOps'] },
  { name: 'GitHub Actions', icon: <SiGithubactions />, category: ['DevOps'] },
  { name: 'Android', icon: <IoLogoAndroid />, category: ['Mobile'] },
  { name: 'iOS', icon: <SiIos />, category: ['Mobile'] },
  { name: 'Tailwind', icon: <SiTailwindcss />, category: ['Frontend'] },
];

export const WHAT_WE_DO = [
  {
    image: '/cards/card-01.png',
    title: 'Business Intelligence Personalizado',
    description:
      'Eliminamos a dependência de planilhas complexas. Desenvolvemos aplicações que automatizam a geração de relatórios de desempenho online e em tempo real, proporcionando um painel de gestão completo e acessível a qualquer momento.',
  },
  {
    image: '/cards/card-02.png',
    title: 'Desenvolvimento de Sistemas Sob Medida',
    description:
      'Criamos sistemas que se adaptam perfeitamente à realidade e às necessidades específicas da sua empresa, proporcionando eficiência e praticidade em suas operações.',
  },
  {
    image: '/cards/card-03.png',
    title: 'Soluções Web Responsivas e Aplicativos',
    description:
      'Desenvolvemos soluções web e aplicativos que oferecem uma experiência de usuário otimizada em qualquer dispositivo, garantindo acesso fácil e intuitivo às suas ferramentas.',
  },
  {
    image: '/cards/card-04.png',
    title: 'Criação de E-commerce Integrado',
    description:
      'Inicie suas vendas online com um site personalizado, integrado ao seu sistema de gestão para garantir a precisão do estoque e facilitar a promoção de produtos.',
  },
  {
    image: '/cards/card-05.png',
    title: 'Integração entre Sistemas',
    description:
      'Automatizamos processos e reduzimos o trabalho manual através da integração entre sistemas, garantindo agilidade e precisão nas informações, além de eliminar tarefas repetitivas.',
  },
  {
    image: '/cards/card-06.png',
    title: 'Implantação de SaaS',
    description:
      'Encontre a melhor solução para suas necessidades entre as ferramentas disponíveis no mercado. Com nossa experiência, auxiliamos na escolha e implementação da solução adequada para a sua equipe.',
  },
];

export type StageType =
  | 'diagnostic'
  | 'planning'
  | 'execution'
  | 'delivery'
  | 'maintenance';

export interface Stage {
  id: StageType;
  image: string;
  imageSelected: string;
  label: string;
}

export const METHOD_STAGES: Stage[] = [
  {
    id: 'diagnostic',
    image: '/stages/01-diagnostico.svg',
    imageSelected: '/stages/01-diagnostico-selected.svg',
    label: 'Diagnóstico',
  },
  {
    id: 'planning',
    image: '/stages/02-planejamento.svg',
    imageSelected: '/stages/02-planejamento-selected.svg',
    label: 'Planejamento',
  },
  {
    id: 'execution',
    image: '/stages/03-execucao.svg',
    imageSelected: '/stages/03-execucao-selected.svg',
    label: 'Execução',
  },
  {
    id: 'delivery',
    image: '/stages/04-entrega.svg',
    imageSelected: '/stages/04-entrega-selected.svg',
    label: 'Entrega',
  },
  {
    id: 'maintenance',
    image: '/stages/05-manutencao.svg',
    imageSelected: '/stages/05-manutencao-selected.svg',
    label: 'Manutenção',
  },
];

export const METHOD_DESCRIPTIONS = {
  diagnostic: (
    <p>
      Aqui fazemos um <span className='text-primary-500'>raio-X</span> do seu
      negócio, entendendo suas características e necessidades, com o objetivo de
      projetarmos a solução que mais se encaixa com a sua{' '}
      <span className='text-primary-500'>realidade</span>.
    </p>
  ),
  planning: (
    <p>
      Nessa etapa executamos um processo chamado de{' '}
      <span className='text-primary-500'>análise de requisitos</span>, que é
      extremamente importante para o sucesso do projeto. Aqui, desenhamos todos
      os mínimos detalhes do que vai ser a{' '}
      <span className='text-primary-500'>solução perfeita para você</span>.
    </p>
  ),
  execution: (
    <p>
      Sua <span className='text-primary-500'>solução perfeita</span> começa a
      ser produzida, e você acompanha tudo com{' '}
      <span className='text-primary-500'>reuniões quinzenais de follow-up</span>
       do projeto para garantir você por dentro de{' '}
      <span className='text-primary-500'>tudo</span> que está acontecendo.
    </p>
  ),
  delivery: (
    <p>
      <span className='text-primary-500'>Projeto finalizado!</span> Após uma
      rígida fase de testes e correções finais, hora de implementar a solução
      dentro do seu negócio. Aqui o foco é{' '}
      <span className='text-primary-500'>treinar seu time</span> para extrair o{' '}
      <span className='text-primary-500'>máximo</span> da ferramenta que vocês
      terão em mãos.
    </p>
  ),
  maintenance: (
    <p>
      <span className='text-primary-500'>Solução rodando</span> e{' '}
      <span className='text-primary-500'>resultados vindo</span>, esse é o
      objetivo final. Agora é a fase focada em manter isso acontecendo e sempre
      acelerando. Como sua solução é{' '}
      <span className='text-primary-500'>individual</span>, você terá total
      liberdade para nos acionar diretamente em busca de suporte e negociar{' '}
      <span className='text-primary-500'>melhorias no seu novo sistema</span>.
    </p>
  ),
};
