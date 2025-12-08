import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import MovieSection from '@/components/MovieSection';
import CinemaSection from '@/components/CinemaSection';
import PromotionSection from '@/components/PromotionSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroBanner />
        <MovieSection />
        <CinemaSection />
        <PromotionSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
