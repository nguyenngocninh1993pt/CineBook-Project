import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { movies } from '@/data/movies';

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = movies.filter((m) => m.featured);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const currentMovie = featuredMovies[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl pt-20">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
            <Badge className="bg-primary/90 text-primary-foreground font-semibold">
              {currentMovie?.ageRating}
            </Badge>
            {currentMovie?.genre.slice(0, 2).map((g) => (
              <Badge key={g} variant="outline" className="border-border/50 text-foreground/80">
                {g}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 
            key={currentMovie?.id}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-4 animate-fade-in"
          >
            {currentMovie?.title}
          </h1>

          {/* Info */}
          <div className="flex items-center gap-4 text-muted-foreground mb-6 animate-fade-in animation-delay-100">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="font-semibold text-foreground">{currentMovie?.rating}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{currentMovie?.duration} phút</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{currentMovie?.language}</span>
          </div>

          {/* Synopsis */}
          <p className="text-foreground/70 text-lg leading-relaxed mb-8 line-clamp-3 animate-fade-in animation-delay-200">
            {currentMovie?.synopsis}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
            <Link to={`/movie/${currentMovie?.id}`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-14 px-8 text-lg">
                Đặt vé ngay
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-foreground hover:bg-primary/10 h-14 px-8 text-lg group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Xem trailer
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 flex justify-between z-20 pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full glass-card pointer-events-auto hover:bg-primary/20"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full glass-card pointer-events-auto hover:bg-primary/20"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-foreground/30 hover:bg-foreground/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
