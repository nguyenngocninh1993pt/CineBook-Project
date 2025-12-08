import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Wallet, Building2, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const paymentMethods = [
  { id: 'momo', name: 'Ví MoMo', icon: Wallet, color: 'text-pink-500' },
  { id: 'zalopay', name: 'ZaloPay', icon: Wallet, color: 'text-blue-500' },
  { id: 'vnpay', name: 'VNPay', icon: Building2, color: 'text-blue-600' },
  { id: 'card', name: 'Thẻ tín dụng/ghi nợ', icon: CreditCard, color: 'text-green-500' },
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  const bookingData = location.state;

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: 'Yêu cầu đăng nhập',
        description: 'Vui lòng đăng nhập để tiếp tục thanh toán',
        variant: 'destructive',
      });
      navigate('/auth', { state: { from: location } });
    }
  }, [user, authLoading, navigate, location, toast]);

  useEffect(() => {
    if (!bookingData) {
      navigate('/movies');
    }
  }, [bookingData, navigate]);

  if (!bookingData || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng đăng nhập để thanh toán',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Save booking to database
    const { error } = await supabase.from('bookings').insert({
      user_id: user.id,
      movie_title: bookingData.movie.title,
      movie_poster: bookingData.movie.poster,
      cinema_name: bookingData.cinema.name,
      show_date: bookingData.date,
      showtime: `${bookingData.showtime.time} - ${bookingData.showtime.type}`,
      seats: bookingData.seats,
      total_amount: bookingData.totalAmount,
      payment_method: paymentMethods.find((m) => m.id === paymentMethod)?.name,
      payment_status: 'paid',
    });

    if (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Lỗi đặt vé',
        description: 'Không thể lưu thông tin đặt vé. Vui lòng thử lại.',
        variant: 'destructive',
      });
      setIsProcessing(false);
      return;
    }

    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 min-h-[80vh] flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center animate-scale-in">
                <CheckCircle className="w-14 h-14 text-green-500" />
              </div>
              <h1 className="font-display text-4xl text-foreground mb-4">
                ĐẶT VÉ THÀNH CÔNG!
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Cảm ơn bạn đã đặt vé tại CineStar. Thông tin vé đã được gửi đến email của bạn.
              </p>

              <div className="glass-card rounded-xl p-6 text-left mb-8">
                <h3 className="font-display text-xl mb-4 text-center">Chi tiết vé</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phim:</span>
                    <span className="font-medium">{bookingData.movie.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rạp:</span>
                    <span>{bookingData.cinema.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày:</span>
                    <span>{new Date(bookingData.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Suất chiếu:</span>
                    <span>{bookingData.showtime.time} - {bookingData.showtime.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ghế:</span>
                    <span className="text-primary font-medium">{bookingData.seats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border/30">
                    <span className="text-muted-foreground">Tổng tiền:</span>
                    <span className="font-display text-xl gradient-text">
                      {bookingData.totalAmount.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/booking-history')}
                  className="bg-gradient-cinema hover:opacity-90 text-primary-foreground font-semibold"
                >
                  Xem lịch sử đặt vé
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="border-border/50"
                >
                  Về trang chủ
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <h1 className="font-display text-3xl md:text-4xl mb-6">THANH TOÁN</h1>

              <div className="glass-card rounded-xl p-6">
                <h2 className="font-display text-xl mb-6">Chọn phương thức thanh toán</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <Label
                        key={method.id}
                        htmlFor={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'bg-primary/10 border-2 border-primary'
                            : 'bg-secondary/50 border-2 border-transparent hover:bg-secondary'
                        }`}
                      >
                        <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                        <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center ${method.color}`}>
                          <method.icon className="w-6 h-6" />
                        </div>
                        <span className="font-medium text-lg">{method.name}</span>
                        {paymentMethod === method.id && (
                          <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                        )}
                      </Label>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border/30">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Lưu ý:</strong> Đây là bản demo, thanh toán sẽ được mô phỏng. 
                    Trong phiên bản thực tế, bạn sẽ được chuyển đến cổng thanh toán của nhà cung cấp.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <h2 className="font-display text-xl mb-6">Thông tin đặt vé</h2>

                <div className="flex gap-4 mb-6">
                  <img
                    src={bookingData.movie.poster}
                    alt={bookingData.movie.title}
                    className="w-24 h-36 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-display text-lg leading-tight mb-1">
                      {bookingData.movie.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {bookingData.movie.ageRating} • {bookingData.movie.duration} phút
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rạp:</span>
                    <span>{bookingData.cinema.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày:</span>
                    <span>{new Date(bookingData.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Suất chiếu:</span>
                    <span>{bookingData.showtime.time} - {bookingData.showtime.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ghế ({bookingData.seats.length}):</span>
                    <span className="text-primary font-medium">{bookingData.seats.join(', ')}</span>
                  </div>
                </div>

                <div className="border-t border-border/30 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Tổng tiền:</span>
                    <span className="font-display text-3xl gradient-text">
                      {bookingData.totalAmount.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full h-12 bg-gradient-cinema hover:opacity-90 text-primary-foreground font-semibold glow-effect"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    `Thanh toán ${bookingData.totalAmount.toLocaleString('vi-VN')}đ`
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
