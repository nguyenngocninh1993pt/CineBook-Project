import { MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cinemas } from '@/data/movies';

const CinemaSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Hệ thống rạp chiếu</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trải nghiệm điện ảnh đỉnh cao với công nghệ IMAX, 4DX và âm thanh Dolby Atmos tại các rạp CineStar trên toàn quốc
          </p>
        </div>

        {/* Cinema Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cinemas.map((cinema, index) => (
            <div
              key={cinema.id}
              className="cinema-card overflow-hidden animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cinema.image}
                  alt={cinema.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              
              <div className="p-5">
                <h3 className="font-display text-xl mb-2">{cinema.name}</h3>
                <div className="flex items-start gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                  <span className="line-clamp-2">{cinema.address}</span>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1 bg-gradient-cinema hover:opacity-90 text-primary-foreground">
                    Xem lịch chiếu
                  </Button>
                  <Button size="sm" variant="outline" className="border-border/50 hover:bg-secondary">
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" className="border-border/50 hover:bg-secondary group">
            Xem tất cả rạp
            <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CinemaSection;
