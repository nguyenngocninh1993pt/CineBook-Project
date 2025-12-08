import { Sparkles, Gift, Percent, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const promotions = [
  {
    id: 1,
    title: 'Happy Day',
    description: 'Giảm 50% giá vé vào thứ 2 & thứ 4 hàng tuần',
    icon: Sparkles,
  },
  {
    id: 2,
    title: 'Combo Tiết Kiệm',
    description: 'Mua combo bắp nước tiết kiệm đến 30%',
    icon: Gift,
  },
  {
    id: 3,
    title: 'Thành viên VIP',
    description: 'Tích điểm đổi vé miễn phí & quà tặng hấp dẫn',
    icon: CreditCard,
  },
  {
    id: 4,
    title: 'Sinh nhật',
    description: 'Tặng vé xem phim miễn phí trong tháng sinh nhật',
    icon: Percent,
  },
];

const PromotionSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Khuyến mãi đặc biệt</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nhiều ưu đãi hấp dẫn đang chờ đón bạn tại CineStar
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((promo, index) => (
            <div
              key={promo.id}
              className="glass-card rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <promo.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              <h3 className="font-display text-2xl mb-2 group-hover:text-primary transition-colors">
                {promo.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {promo.description}
              </p>
              
              <Button 
                variant="link" 
                className="p-0 h-auto mt-4 text-primary hover:text-accent"
              >
                Xem chi tiết →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
