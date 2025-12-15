import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from '@/components/auth/AuthForm';
import { Film, Sparkles, Star, Ticket } from 'lucide-react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState(
    searchParams.get('mode') === 'register' ? 'register' : 'login'
  );

  const handleSuccess = () => {
    navigate('/');
  };

  const features = [
    { icon: Ticket, text: 'Book tickets instantly' },
    { icon: Star, text: 'Get exclusive offers' },
    { icon: Sparkles, text: 'Premium seat selection' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-10 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30"
            >
              <Film className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <span className="font-serif text-2xl font-bold">CineBook</span>
          </Link>

          {/* Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h1>
              <p className="text-muted-foreground text-lg">
                {mode === 'login' && 'Sign in to continue your cinema journey'}
                {mode === 'register' && 'Join CineBook for the ultimate movie experience'}
                {mode === 'forgot' && "Enter your email and we'll send you a reset link"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Form */}
          <AuthForm mode={mode} onModeChange={setMode} onSuccess={handleSuccess} />

          {/* Switch Mode */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-muted-foreground"
          >
            {mode === 'login' && (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-primary font-semibold hover:underline transition-colors"
                >
                  Sign up free
                </button>
              </>
            )}
            {mode === 'register' && (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-primary font-semibold hover:underline transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
            {mode === 'forgot' && (
              <button
                onClick={() => setMode('login')}
                className="text-primary font-semibold hover:underline transition-colors"
              >
                ← Back to login
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200"
            alt="Cinema"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-4xl font-serif font-bold mb-4 leading-tight">
              Experience the<br /><span className="text-primary">Magic of Cinema</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Book tickets for the latest blockbusters, choose your perfect seats, and enjoy exclusive member benefits.
            </p>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;