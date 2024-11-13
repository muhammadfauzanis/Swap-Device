import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

export default async function Home() {
  return (
    <div className="w-full h-screen">
      <Hero />
      <Footer />
    </div>
  );
}
