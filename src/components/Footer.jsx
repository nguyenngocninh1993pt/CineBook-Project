import { Link } from 'react-router-dom';
import { Ticket, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Ticket className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl text-primary">CINESTAR</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Hệ thống rạp chiếu phim hiện đại hàng đầu Việt Nam với công nghệ IMAX, 4DX và trải nghiệm điện ảnh tuyệt vời nhất.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary transition-colors group">
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary transition-colors group">
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary transition-colors group">
                <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {['Phim đang chiếu', 'Phim sắp chiếu', 'Rạp chiếu', 'Khuyến mãi', 'Tin tức'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-xl mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              {['Hướng dẫn đặt vé', 'Chính sách bảo mật', 'Điều khoản sử dụng', 'Câu hỏi thường gặp', 'Liên hệ'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">1900 6017</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">support@cinestar.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 CineStar. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Điều khoản
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Bảo mật
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
