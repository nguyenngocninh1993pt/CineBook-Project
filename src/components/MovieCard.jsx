import { Link } from 'react-router-dom';
import { Star, Clock, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MovieCard = ({ movie, showBooking = true }) => {
  return (
    <div className="cinema-card group">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <div className="flex gap-2">
            {showBooking && (
              <Link to={`/movie/${movie.id}`}>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Đặt vé
                </Button>
              </Link>
            )}
            <Button size="sm" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10">
              <Play className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-primary-foreground font-bold">
            {movie.ageRating}
          </Badge>
        </div>

        {/* Score */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
          <span className="text-sm font-semibold">{movie.rating}</span>
        </div>

        {/* Status Badge */}
        {movie.status === 'coming_soon' && (
          <div className="absolute bottom-3 left-3 right-3">
            <Badge className="w-full justify-center bg-accent text-accent-foreground font-semibold py-1">
              Sắp chiếu
            </Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-display text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((g) => (
            <span key={g} className="text-xs text-muted-foreground">
              {g}{movie.genre.indexOf(g) < 1 && ', '}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{movie.duration} phút</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
