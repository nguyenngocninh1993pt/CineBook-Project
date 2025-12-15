import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, Mail, Phone, MapPin, Globe, Camera, CheckCircle, 
  AlertCircle, Ticket, Settings, Lock, Bell, LogOut 
} from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+84|0)[0-9]{9,10}$/, 'Invalid phone number').optional().or(z.literal('')),
  city: z.string().optional(),
  language: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[a-z]/, 'Must contain lowercase letter')
    .regex(/[0-9]/, 'Must contain number'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Profile = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    language: '',
    avatar: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || 'Ho Chi Minh City',
        language: user.language || 'English',
        avatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      });
    }
  }, [user, isAuthenticated, navigate]);


  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    bookingConfirmation: true,
    showReminder: true,
    promotions: false,
    newsletter: false,
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      profileSchema.parse(profileData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
        return;
      }
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateProfile(profileData);
    toast.success("Profile updated successfully!");
    setLoading(false);
  };


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) return null;


  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      passwordSchema.parse(passwordData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
        return;
      }
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });

    setLoading(false);
  };


  const handleNotificationSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    toast.success("Notification preferences saved!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 mb-8 border border-border"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              
              {/* Avatar */}
              <div className="relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-serif font-bold mb-1">{profileData.name}</h1>
                <p className="text-muted-foreground">{profileData.email}</p>

                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Premium Member
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                    12 Bookings
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Link to="/my-tickets">
                  <Button variant="outline" className="gap-2">
                    <Ticket className="w-4 h-4" />
                    My Tickets
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* TABS */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-12 bg-card">
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <User className="w-4 h-4" /> Profile
              </TabsTrigger>

              <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Lock className="w-4 h-4" /> Security
              </TabsTrigger>

              <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Bell className="w-4 h-4" /> Notifications
              </TabsTrigger>
            </TabsList>

            {/* =============== PROFILE TAB =============== */}
            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl p-6 border border-border"
              >

                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" /> Personal Information
                </h2>

                <form onSubmit={handleProfileUpdate} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className={`pl-11 h-12 ${errors.name ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.name && <p className="text-destructive text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className={`pl-11 h-12 ${errors.email ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.email && <p className="text-destructive text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className={`pl-11 h-12 ${errors.phone ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.phone && <p className="text-destructive text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>}
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <Label htmlFor="city">Preferred City</Label>
                      <Select
                        value={profileData.city}
                        onValueChange={(value) => setProfileData({ ...profileData, city: value })}
                      >
                        <SelectTrigger className="h-12">
                          <MapPin className="w-5 h-5 text-muted-foreground mr-2" />
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="Ho Chi Minh City">Ho Chi Minh City</SelectItem>
                          <SelectItem value="Ha Noi">Ha Noi</SelectItem>
                          <SelectItem value="Da Nang">Da Nang</SelectItem>
                          <SelectItem value="Can Tho">Can Tho</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Language */}
                    <div className="space-y-2">
                      <Label htmlFor="language">Preferred Language</Label>
                      <Select
                        value={profileData.language}
                        onValueChange={(value) => setProfileData({ ...profileData, language: value })}
                      >
                        <SelectTrigger className="h-12">
                          <Globe className="w-5 h-5 text-muted-foreground mr-2" />
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                          <SelectItem value="Korean">Korean</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" variant="hero" disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </TabsContent>

            {/* =============== SECURITY TAB =============== */}
            <TabsContent value="security">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" /> Change Password
                </h2>

                <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">

                  {/* Current password */}
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className={`h-12 ${errors.currentPassword ? "border-destructive" : ""}`}
                    />
                    {errors.currentPassword && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.currentPassword}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className={`h-12 ${errors.newPassword ? "border-destructive" : ""}`}
                    />
                    {errors.newPassword && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.newPassword}
                      </p>
                    )}

                    {passwordData.newPassword && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[
                            passwordData.newPassword.length >= 8,
                            /[A-Z]/.test(passwordData.newPassword),
                            /[a-z]/.test(passwordData.newPassword),
                            /[0-9]/.test(passwordData.newPassword),
                          ].map((met, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-colors ${met ? "bg-green-500" : "bg-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className={`h-12 ${errors.confirmPassword ? "border-destructive" : ""}`}
                      />
                      {passwordData.confirmPassword &&
                        passwordData.newPassword === passwordData.confirmPassword && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                    </div>

                    {errors.confirmPassword && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="hero" disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </motion.div>
            </TabsContent>

            {/* =============== NOTIFICATION TAB =============== */}
            <TabsContent value="notifications">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" /> Notification Preferences
                </h2>

                <div className="space-y-4">

                  {[
                    { key: 'bookingConfirmation', label: 'Booking Confirmations', desc: 'Get notified when your booking is confirmed' },
                    { key: 'showReminder', label: 'Show Reminders', desc: 'Reminder 2 hours before showtime' },
                    { key: 'promotions', label: 'Promotional Offers', desc: 'Receive special offers and discounts' },
                    { key: 'newsletter', label: 'Newsletter', desc: 'Weekly updates on new movies and events' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                    >
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key]}
                          onChange={(e) =>
                            setNotifications({ ...notifications, [item.key]: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-6">
                  <Button onClick={handleNotificationSave} variant="hero" disabled={loading}>
                    {loading ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
