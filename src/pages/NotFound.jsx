import { Link } from 'react-router-dom';
import { Home, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <span className="font-display text-9xl gradient-text">404</span>
          </div>
          
          <h1 className="font-display text-4xl mb-4">Không tìm thấy trang</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến địa chỉ khác.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-gradient-cinema hover:opacity-90 text-primary-foreground gap-2">
                <Home className="w-4 h-4" />
                Về trang chủ
              </Button>
            </Link>
            <Link to="/movies">
              <Button variant="outline" className="border-border/50 hover:bg-secondary gap-2">
                <Film className="w-4 h-4" />
                Xem phim
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
