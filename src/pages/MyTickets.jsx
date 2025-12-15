import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Ticket, Calendar, Clock, MapPin, QrCode, Download, 
  ChevronRight, Film, Users, Star, X 
} from 'lucide-react';

const mockTickets = [
  {
    id: 'BK001',
    movie: {
      title: 'Dune: Part Two',
      poster: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400',
      rating: 8.8,
      duration: '166 min',
      genre: 'Sci-Fi',
    },
    theater: 'CGV Vincom Center',
    address: '72 Le Thanh Ton, District 1, HCMC',
    date: '2024-12-15',
    time: '19:30',
    seats: ['G7', 'G8'],
    seatType: 'Platinum',
    totalPrice: 280000,
    status: 'upcoming',
    bookingDate: '2024-12-10',
  },
  {
    id: 'BK002',
    movie: {
      title: 'Oppenheimer',
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
      rating: 9.0,
      duration: '180 min',
      genre: 'Drama',
    },
    theater: 'Lotte Cinema Landmark',
    address: '772 Dien Bien Phu, Binh Thanh, HCMC',
    date: '2024-12-20',
    time: '20:00',
    seats: ['E5', 'E6', 'E7'],
    seatType: 'Gold',
    totalPrice: 360000,
    status: 'upcoming',
    bookingDate: '2024-12-08',
  },
  {
    id: 'BK003',
    movie: {
      title: 'The Batman',
      poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400',
      rating: 8.5,
      duration: '176 min',
      genre: 'Action',
    },
    theater: 'Galaxy Cinema Nguyen Du',
    address: '116 Nguyen Du, District 1, HCMC',
    date: '2024-11-28',
    time: '18:00',
    seats: ['H10'],
    seatType: 'Standard',
    totalPrice: 95000,
    status: 'completed',
    bookingDate: '2024-11-25',
  },
  {
    id: 'BK004',
    movie: {
      title: 'Avatar: The Way of Water',
      poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400',
      rating: 8.2,
      duration: '192 min',
      genre: 'Adventure',
    },
    theater: 'BHD Star Pham Hung',
    address: '782 Pham Hung, District 6, HCMC',
    date: '2024-11-15',
    time: '14:30',
    seats: ['D3', 'D4'],
    seatType: 'Gold',
    totalPrice: 200000,
    status: 'cancelled',
    bookingDate: '2024-11-10',
  },
];

const MyTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const upcomingTickets = mockTickets.filter((t) => t.status === 'upcoming');
  const pastTickets = mockTickets.filter(
    (t) => t.status === 'completed' || t.status === 'cancelled'
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const TicketCard = ({ ticket }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => setSelectedTicket(ticket)}
      className="bg-card rounded-xl border border-border overflow-hidden cursor-pointer group hover:border-primary/50 transition-all"
    >
      <div className="flex">
        <div className="w-28 md:w-36 shrink-0">
          <img src={ticket.movie.poster} alt={ticket.movie.title} className="w-full h-full object-cover" />
        </div>

        {/* INFO */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg line-clamp-1">{ticket.movie.title}</h3>

              <Badge
                variant={
                  ticket.status === 'upcoming'
                    ? 'default'
                    : ticket.status === 'completed'
                    ? 'secondary'
                    : 'destructive'
                }
                className="shrink-0"
              >
                {ticket.status}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>{ticket.movie.rating}</span>
              <span className="text-border">•</span>
              <span>{ticket.movie.duration}</span>
              <span className="text-border">•</span>
              <span>{ticket.movie.genre}</span>
            </div>

            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {ticket.theater}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-primary" />
                {formatDate(ticket.date)}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-primary" />
                {ticket.time}
              </span>
            </div>

            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const TicketModal = ({ ticket, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        {/* HEADER */}
        <div className="relative h-40">
          <img src={ticket.movie.poster} alt={ticket.movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center hover:bg-background"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl font-serif font-bold">{ticket.movie.title}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>{ticket.movie.rating}</span>
              <span>•</span>
              <span>{ticket.movie.duration}</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <div className="bg-background rounded-xl p-4 border border-dashed border-border mb-4">
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 bg-foreground/10 rounded-lg flex items-center justify-center">
                <QrCode className="w-24 h-24 text-foreground" />
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Booking ID: <span className="font-mono font-bold">{ticket.id}</span>
            </p>
          </div>

          {/* INFO */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Theater
              </span>
              <span className="font-medium text-right">{ticket.theater}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date
              </span>
              <span className="font-medium">{formatDate(ticket.date)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" /> Time
              </span>
              <span className="font-medium">{ticket.time}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" /> Seats
              </span>
              <span className="font-medium">{ticket.seats.join(', ')}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Ticket className="w-4 h-4" /> Type
              </span>
              <span className="font-medium">{ticket.seatType}</span>
            </div>

            <div className="flex justify-between pt-3 border-t border-border">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary">{formatPrice(ticket.totalPrice)}</span>
            </div>
          </div>

          {ticket.status === 'upcoming' && (
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button variant="hero" className="flex-1">
                Show QR Code
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* HEADER */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">My Tickets</h1>
            <p className="text-muted-foreground">View and manage your movie bookings</p>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {[
              { label: 'Total Bookings', value: mockTickets.length, icon: Ticket },
              { label: 'Upcoming', value: upcomingTickets.length, icon: Calendar },
              { label: 'Completed', value: pastTickets.filter((t) => t.status === 'completed').length, icon: Film },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-4 border border-border text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* TABS */}
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid grid-cols-2 h-12 bg-card">
              <TabsTrigger value="upcoming" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calendar className="w-4 h-4" />
                Upcoming ({upcomingTickets.length})
              </TabsTrigger>

              <TabsTrigger value="history" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Film className="w-4 h-4" />
                History ({pastTickets.length})
              </TabsTrigger>
            </TabsList>

            {/* UPCOMING */}
            <TabsContent value="upcoming">
              <AnimatePresence mode="popLayout">
                {upcomingTickets.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingTickets.map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming tickets</h3>
                    <p className="text-muted-foreground mb-4">Book your next movie experience!</p>
                    <Link to="/movies">
                      <Button variant="hero">Browse Movies</Button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* HISTORY */}
            <TabsContent value="history">
              <AnimatePresence mode="popLayout">
                {pastTickets.length > 0 ? (
                  <div className="space-y-4">
                    {pastTickets.map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No booking history</h3>
                    <p className="text-muted-foreground">Your past bookings will appear here</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {selectedTicket && (
          <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default MyTickets;
