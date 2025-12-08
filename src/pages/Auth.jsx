import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({ title: 'Đăng nhập thành công', description: 'Chào mừng bạn quay lại!' });
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        toast({ title: 'Đăng ký thành công', description: 'Tài khoản đã được tạo!' });
      }
      navigate('/');
    } catch (err) {
      toast({
        title: isLogin ? 'Đăng nhập thất bại' : 'Đăng ký thất bại',
        description: err.message.includes('already registered') ? 'Email đã được đăng ký' : err.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-gradient-cinema">
              <Ticket className="w-8 h-8" />
            </div>
            <span className="font-display text-4xl gradient-text">CINESTAR</span>
          </div>
          <h1 className="font-display text-3xl">{isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}</h1>
          <p className="text-muted mt-2">
            {isLogin ? 'Đăng nhập để đặt vé và theo dõi lịch sử' : 'Tạo tài khoản để trải nghiệm đặt vé nhanh chóng'}
          </p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2 relative">
                <Label htmlFor="fullName">Họ và tên</Label>
                <User className="input-icon w-5 h-5" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input"
                />
              </div>
            )}

            <div className="space-y-2 relative">
              <Label htmlFor="email">Email</Label>
              <Mail className="input-icon w-5 h-5" />
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Mật khẩu</Label>
              <Lock className="input-icon w-5 h-5" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          <p className="mt-6 text-center text-muted">
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button
              type="button"
              className="auth-toggle-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
