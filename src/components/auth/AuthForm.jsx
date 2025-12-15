import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^(\+84|0)[0-9]{9,10}$/, 'Please enter a valid phone number').optional().or(z.literal('')),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const AuthForm = ({ mode, onModeChange, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
  });

  const validateField = (name, value) => {
    try {
      if (mode === 'login') {
        if (name === 'email') z.string().email('Please enter a valid email address').parse(value);
        if (name === 'password') z.string().min(6, 'Password must be at least 6 characters').parse(value);
      } else if (mode === 'register') {
        if (name === 'name') z.string().min(2, 'Name must be at least 2 characters').max(50).parse(value);
        if (name === 'email') z.string().email('Please enter a valid email address').parse(value);
        if (name === 'phone' && value) z.string().regex(/^(\+84|0)[0-9]{9,10}$/, 'Please enter a valid phone number').parse(value);
        if (name === 'password') {
          z.string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .parse(value);
        }
        if (name === 'confirmPassword' && value !== formData.password) {
          throw new z.ZodError([{ code: 'custom', message: "Passwords don't match", path: ['confirmPassword'] }]);
        }
      } else {
        if (name === 'email') z.string().email('Please enter a valid email address').parse(value);
      }
      setErrors((prev) => ({ ...prev, [name]: '' }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    try {
      if (mode === 'login') loginSchema.parse(formData);
      else if (mode === 'register') registerSchema.parse(formData);
      else forgotSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = {};
        err.errors.forEach((error) => {
          if (error.path[0]) newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const ok = await login(formData.email, formData.password);
        if (ok) {
          setSuccess('Welcome back! Redirecting...');
          setTimeout(onSuccess, 1000);
        }
      } else if (mode === 'register') {
        const ok = await register(formData.name, formData.email, formData.password);
        if (ok) {
          setSuccess('Account created successfully! Redirecting...');
          setTimeout(onSuccess, 1000);
        }
      } else {
        await new Promise((res) => setTimeout(res, 1500));
        setSuccess('Password reset link sent!');
        setTimeout(() => onModeChange('login'), 2000);
      }
    } catch {
      setErrors({ general: 'An error occurred. Please try again.' });
    }

    setLoading(false);
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* SUCCESS MESSAGE */}
      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Alert className="bg-green-500/10 border-green-500/50 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAME (Register only) */}
      {mode === 'register' && (
        <div className="space-y-2">
          <Label>Full Name *</Label>
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`pl-11 h-12 ${errors.name ? 'border-destructive' : ''}`}
            />
          </motion.div>
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
      )}

      {/* EMAIL */}
      <div className="space-y-2">
        <Label>Email *</Label>
        <motion.div variants={inputVariants} whileFocus="focus" className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`pl-11 h-12 ${errors.email ? 'border-destructive' : ''}`}
          />
        </motion.div>
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* PHONE (Register only) */}
      {mode === 'register' && (
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              name="phone"
              type="tel"
              placeholder="+84 123 456 789"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`pl-11 h-12 ${errors.phone ? 'border-destructive' : ''}`}
            />
          </motion.div>
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>
      )}

      {/* PASSWORD (Login + Register) */}
      {mode !== 'forgot' && (
        <div className="space-y-2">
          <Label>Password *</Label>
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`pl-11 pr-11 h-12 ${errors.password ? 'border-destructive' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </motion.div>

          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
      )}

      {/* CONFIRM PASSWORD (Register) */}
      {mode === 'register' && (
        <div className="space-y-2">
          <Label>Confirm Password *</Label>
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
            <Input
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`pl-11 h-12 ${errors.confirmPassword ? 'border-destructive' : ''}`}
            />
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
            )}
          </motion.div>
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
        </div>
      )}

      {/* FORGOT PASSWORD LINK */}
      {mode === 'login' && (
        <div className="flex justify-end">
          <button onClick={() => onModeChange('forgot')} className="text-sm text-primary">
            Forgot password?
          </button>
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
        {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
      </Button>
    </motion.form>
  );
};

export default AuthForm;
