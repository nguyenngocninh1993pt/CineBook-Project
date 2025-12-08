import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, Play, ChevronRight, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeatSelection from '@/components/SeatSelection';
import { movies, cinemas, showtimes, seatLayout } from '@/data/movies';
import { toast } from '@/hooks/use-toast';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(id));
  
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy phim</p>
      </div>
    );
  }

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('vi-VN', { weekday: 'short' }),
      dayNum: date.getDate(),
      month: date.getMonth() + 1,
    };
  });

  const calculateTotal = () => {
    if (!selectedShowtime || selectedSeats.length === 0) return 0;
    const showtime = showtimes.find((s) => s.id === selectedShowtime);
    const vipSeats = selectedSeats.filter((seat) => 
      seatLayout.vipRows.includes(seat[0])
    );
    const normalSeats = selectedSeats.length - vipSeats.length;
    const vipPrice = showtime.price * 1.3;
    return normalSeats * showtime.price + vipSeats.length * vipPrice;
  };

  const handleBooking = () => {
    const showtime = showtimes.find((s) => s.id === selectedShowtime);
    const cinema = cinemas.find((c) => c.id === selectedCinema);
    
    navigate('/checkout', {
      state: {
        movie: {
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          duration: movie.duration,
          ageRating: movie.ageRating,
        },
        cinema: {
          id: cinema.id,
          name: cinema.name,
        },
        date: selectedDate,
        showtime: {
          id: showtime.id,
          time: showtime.time,
          type: showtime.type,
        },
        seats: selectedSeats,
        totalAmount: calculateTotal(),
      },
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20">
        {/* Backdrop */}
        <div className="absolute inset-0 h-[500px]">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-64 md:w-72 shrink-0 mx-auto md:mx-0">
              <div className="cinema-card overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 pt-4 md:pt-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary text-primary-foreground font-bold">
                  {movie.ageRating}
                </Badge>
                {movie.genre.map((g) => (
                  <Badge key={g} variant="outline" className="border-border/50">
                    {g}
                  </Badge>
                ))}
              </div>

              <h1 className="font-display text-4xl md:text-6xl mb-2">{movie.title}</h1>
              <p className="text-muted-foreground text-lg mb-6">{movie.originalTitle}</p>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-semibold text-foreground text-lg">{movie.rating}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration} phút</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(movie.releaseDate).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6 max-w-2xl">
                {movie.synopsis}
              </p>

              <div className="space-y-2 mb-8">
                <p><span className="text-muted-foreground">Đạo diễn:</span> {movie.director}</p>
                <p><span className="text-muted-foreground">Diễn viên:</span> {movie.cast.join(', ')}</p>
                <p><span className="text-muted-foreground">Ngôn ngữ:</span> {movie.language}</p>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-cinema hover:opacity-90 text-primary-foreground font-semibold glow-effect">
                  Đặt vé ngay
                </Button>
                <Button size="lg" variant="outline" className="border-border/50 hover:bg-secondary group">
                  <Play className="w-5 h-5 mr-2" />
                  Xem trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">Đặt vé xem phim</h2>

          {/* Booking Steps */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-4">
              {[
                { step: 1, label: 'Chọn rạp' },
                { step: 2, label: 'Chọn suất' },
                { step: 3, label: 'Chọn ghế' },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                      bookingStep >= item.step
                        ? 'bg-gradient-cinema text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {bookingStep > item.step ? <Check className="w-5 h-5" /> : item.step}
                  </div>
                  <span className={`ml-2 hidden md:inline ${
                    bookingStep >= item.step ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {item.label}
                  </span>
                  {index < 2 && (
                    <ChevronRight className="w-5 h-5 mx-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Tabs value={`step-${bookingStep}`} className="w-full">
            {/* Step 1: Choose Cinema */}
            <TabsContent value="step-1" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cinemas.map((cinema) => (
                  <button
                    key={cinema.id}
                    onClick={() => {
                      setSelectedCinema(cinema.id);
                      setBookingStep(2);
                    }}
                    className={`cinema-card p-4 text-left transition-all ${
                      selectedCinema === cinema.id 
                        ? 'ring-2 ring-primary' 
                        : ''
                    }`}
                  >
                    <img
                      src={cinema.image}
                      alt={cinema.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-display text-lg mb-1">{cinema.name}</h3>
                    <div className="flex items-start gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                      <span className="line-clamp-2">{cinema.address}</span>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>

            {/* Step 2: Choose Date & Showtime */}
            <TabsContent value="step-2" className="mt-0">
              <div className="glass-card rounded-xl p-6 max-w-4xl mx-auto">
                {/* Date Selection */}
                <div className="mb-8">
                  <h3 className="font-display text-xl mb-4">Chọn ngày</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {dates.map((d) => (
                      <button
                        key={d.date}
                        onClick={() => setSelectedDate(d.date)}
                        className={`flex flex-col items-center p-3 rounded-xl min-w-[70px] transition-all ${
                          selectedDate === d.date
                            ? 'bg-gradient-cinema text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                      >
                        <span className="text-xs uppercase">{d.day}</span>
                        <span className="text-2xl font-bold">{d.dayNum}</span>
                        <span className="text-xs">Th{d.month}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Showtime Selection */}
                {selectedDate && (
                  <div className="animate-fade-in">
                    <h3 className="font-display text-xl mb-4">Chọn suất chiếu</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                      {showtimes.map((showtime) => (
                        <button
                          key={showtime.id}
                          onClick={() => {
                            setSelectedShowtime(showtime.id);
                            setBookingStep(3);
                          }}
                          className={`p-3 rounded-xl transition-all ${
                            selectedShowtime === showtime.id
                              ? 'bg-gradient-cinema text-primary-foreground'
                              : 'bg-secondary hover:bg-secondary/80'
                          }`}
                        >
                          <span className="block font-semibold">{showtime.time}</span>
                          <span className={`text-xs ${
                            selectedShowtime === showtime.id 
                              ? 'text-primary-foreground/80' 
                              : 'text-muted-foreground'
                          }`}>
                            {showtime.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-border/30">
                  <Button
                    variant="outline"
                    onClick={() => setBookingStep(1)}
                    className="border-border/50"
                  >
                    Quay lại
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Step 3: Choose Seats */}
            <TabsContent value="step-3" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Seat Map */}
                <div className="lg:col-span-2 glass-card rounded-xl p-6">
                  <SeatSelection
                    selectedSeats={selectedSeats}
                    onSeatSelect={setSelectedSeats}
                  />
                </div>

                {/* Booking Summary */}
                <div className="glass-card rounded-xl p-6 h-fit sticky top-24">
                  <h3 className="font-display text-2xl mb-4">Thông tin đặt vé</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex gap-4">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-display text-lg">{movie.title}</h4>
                        <p className="text-sm text-muted-foreground">{movie.ageRating} • {movie.duration} phút</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rạp:</span>
                        <span>{cinemas.find((c) => c.id === selectedCinema)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ngày:</span>
                        <span>{selectedDate && new Date(selectedDate).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Suất:</span>
                        <span>
                          {showtimes.find((s) => s.id === selectedShowtime)?.time} • 
                          {showtimes.find((s) => s.id === selectedShowtime)?.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ghế:</span>
                        <span className="text-primary font-medium">
                          {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Tổng tiền:</span>
                      <span className="font-display text-3xl gradient-text">
                        {calculateTotal().toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-cinema hover:opacity-90 text-primary-foreground font-semibold h-12 glow-effect"
                      disabled={selectedSeats.length === 0}
                      onClick={handleBooking}
                    >
                      Thanh toán
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-border/50"
                      onClick={() => setBookingStep(2)}
                    >
                      Quay lại
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MovieDetail;
