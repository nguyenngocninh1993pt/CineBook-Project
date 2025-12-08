import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MovieCard from './MovieCard';
import { movies } from '@/data/movies';

const MovieSection = () => {
  const [activeTab, setActiveTab] = useState('now_showing');

  const filteredMovies = movies.filter((m) => m.status === activeTab);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-4xl md:text-5xl mb-2">
              {activeTab === 'now_showing' ? 'Phim đang chiếu' : 'Phim sắp chiếu'}
            </h2>
            <p className="text-muted-foreground">
              Khám phá những bộ phim hấp dẫn nhất tại CineStar
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'now_showing' ? 'default' : 'outline'}
              onClick={() => setActiveTab('now_showing')}
              className={activeTab === 'now_showing' 
                ? 'bg-gradient-cinema hover:opacity-90' 
                : 'border-border/50 hover:bg-secondary'
              }
            >
              Đang chiếu
            </Button>
            <Button
              variant={activeTab === 'coming_soon' ? 'default' : 'outline'}
              onClick={() => setActiveTab('coming_soon')}
              className={activeTab === 'coming_soon' 
                ? 'bg-gradient-cinema hover:opacity-90' 
                : 'border-border/50 hover:bg-secondary'
              }
            >
              Sắp chiếu
            </Button>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <MovieCard movie={movie} showBooking={activeTab === 'now_showing'} />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-10">
          <Link to="/movies">
            <Button variant="outline" size="lg" className="border-border/50 hover:bg-secondary group">
              Xem tất cả phim
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MovieSection;
