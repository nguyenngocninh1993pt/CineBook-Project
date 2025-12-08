import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, Clock, MapPin, Ticket, Film, CreditCard } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBookings(data);
      }
      setLoading(false);
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Hoàn thành</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Chờ thanh toán</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Đã hủy</Badge>;
      default:
        return <Badge className="bg-muted text-muted-foreground">Không xác định</Badge>;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display text-4xl md:text-5xl gradient-text mb-3">
              LỊCH SỬ ĐẶT VÉ
            </h1>
            <p className="text-muted-foreground text-lg">
              Xem lại các vé đã đặt và trạng thái thanh toán
            </p>
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-xl p-6">
                  <div className="flex gap-6">
                    <Skeleton className="w-32 h-48 rounded-lg" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Ticket className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl text-foreground mb-2">
                CHƯA CÓ VÉ NÀO
              </h2>
              <p className="text-muted-foreground mb-6">
                Bạn chưa đặt vé xem phim nào. Hãy khám phá các bộ phim hấp dẫn tại rạp!
              </p>
              <button
                onClick={() => navigate('/movies')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-cinema rounded-lg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <Film className="w-5 h-5" />
                Khám phá phim
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Movie Poster */}
                    <div className="w-full md:w-32 flex-shrink-0">
                      {booking.movie_poster ? (
                        <img
                          src={booking.movie_poster}
                          alt={booking.movie_title}
                          className="w-full md:w-32 h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full md:w-32 h-48 bg-muted rounded-lg flex items-center justify-center">
                          <Film className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                        <h3 className="font-display text-2xl text-foreground">
                          {booking.movie_title}
                        </h3>
                        {getStatusBadge(booking.payment_status)}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{booking.cinema_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>
                            {format(new Date(booking.show_date), 'EEEE, dd/MM/yyyy', { locale: vi })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>Suất chiếu: {booking.showtime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Ticket className="w-4 h-4 text-primary" />
                          <span>Ghế: {booking.seats.join(', ')}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <CreditCard className="w-4 h-4" />
                          <span>{booking.payment_method || 'Chưa thanh toán'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-muted-foreground text-sm">Tổng tiền:</span>
                          <span className="ml-2 font-display text-2xl gradient-text">
                            {booking.total_amount.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingHistory;
