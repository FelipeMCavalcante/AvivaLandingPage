// import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
// import Insta from '@/components/Insta';
import Eventos from '@/components/Eventos';
import Hero2 from '@/components/Hero2';
import Santos from '@/components/Santos';
import Serie from '@/components/Serie';
import Us from '@/components/Us';

export default function Home() {
  return (
    <main className='relative text-2xl text-red-900 bg-white'>
      <Header />
      <Hero />
      <Us />
      <Hero2 />
      <Serie />
      <Eventos />
      <Santos />
      {/* <Contact /> */}
      {/* <Insta /> */}
      <Footer />
    </main>
  );
}
