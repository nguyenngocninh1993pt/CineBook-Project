import { useState } from 'react';
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cinemas } from '@/data/movies';

const Cinemas = () => {
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = [...new Set(cinemas.map((c) => c.city))];

  const filteredCinemas = selectedCity === 'all' 
    ? cinemas 
    : cinemas.filter((c) => c.city === selectedCity);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl mb-4">Hệ thống rạp</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tìm rạp chiếu phim CineStar gần bạn nhất
            </p>
          </div>

          {/* Filter */}
          <div className="flex justify-center mb-10">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-64 bg-secondary border-border/50">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả thành phố</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cinemas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCinemas.map((cinema, index) => (
              <div
                key={cinema.id}
                className="cinema-card overflow-hidden animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={cinema.image}
                      alt={cinema.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-6">
                    <h2 className="font-display text-2xl mb-3">{cinema.name}</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{cinema.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground text-sm">1900 6017</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground text-sm">08:00 - 24:00</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['IMAX', '4DX', 'Dolby Atmos', 'VIP'].map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-secondary rounded-full text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-cinema hover:opacity-90 text-primary-foreground">
                        Xem lịch chiếu
                      </Button>
                      <Button variant="outline" className="border-border/50 hover:bg-secondary">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cinemas;
