import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
// import Insta from '@/components/Insta';
import Projects from '@/components/Projects';
import Santos from '@/components/Santos';
import Serie from '@/components/Serie';
import Us from '@/components/Us';

export default function Home() {
  return (
    <main className='relative text-2xl text-red-900 bg-white'>
      <Header />
      <Hero />
      <Us />
      <Santos />
      <Serie />
      <Projects />
      {/* <Insta /> */}
      <Contact />
      <Footer />
    </main>
  );
}
