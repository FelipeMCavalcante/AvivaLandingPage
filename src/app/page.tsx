import Artist from '@/components/Artist';
import Contact from '@/components/Contact';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Insta from '@/components/Insta';
import Projects from '@/components/Projects';
import Sente from '@/components/Sente';

export default function Home() {
  return (
    <main className='relative text-2xl text-red-900 bg-white'>
      <Header />
      <Hero />
      <Sente />
      <Artist />
      <Events />
      <Projects />
      <Insta />
      <Contact />
      <Footer />
    </main>
  );
}
