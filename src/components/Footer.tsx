import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast({
        variant: 'destructive',
        title: t.subscribeError,
        description: t.invalidEmail,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast({
        title: t.subscribeSuccess,
        description: 'You’ll receive our latest health tips and updates.',
      });
      setEmail('');
    } catch {
      toast({
        variant: 'destructive',
        title: t.subscribeError,
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">

        {/* Newsletter Section */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-2xl p-8 border border-primary/20">
            <div className="text-center mb-6">
              <h3 className="font-bold text-2xl mb-2">
                {t.newsletterTitle}
              </h3>
              <p className="text-muted-foreground text-sm">
                Stay updated with our latest health tips and features.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletterPlaceholder}
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : t.subscribe}
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">{t.appName}</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {t.welcomeMessage}
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 cursor-pointer" />
              <Twitter className="w-5 h-5 cursor-pointer" />
              <Instagram className="w-5 h-5 cursor-pointer" />
              <Linkedin className="w-5 h-5 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.quickLinks}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/">{t.home}</Link></li>
              <li><Link to="/symptoms">{t.symptomTracker}</Link></li>
              <li><Link to="/tips">{t.healthTips}</Link></li>
              <li><Link to="/store">{t.medicineStore}</Link></li>
              <li><Link to="/schemes">{t.sarkariYojana}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.support}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>{t.helpCenter}</li>
              <li className="flex gap-2"><Phone className="w-4 h-4" /> +91 1800-123-4567</li>
              <li className="flex gap-2"><Mail className="w-4 h-4" /> support@swasthya.com</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.legal}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/privacy-policy">{t.privacyPolicy}</Link></li>
              <li><Link to="/terms-and-conditions">{t.termsConditions}</Link></li>
            </ul>
          </div>

          {/* Our Location */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Our Location
            </h3>

            <iframe
              title="IIT Madras"
              className="w-full h-40 rounded-lg border"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?marker=12.9935,80.2310"
            />

            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                Inspired by SAATHI Initiative
              </p>
              <p>IIT Madras</p>
              <p>Chennai, Tamil Nadu – 600036</p>
              <p>India</p>
            </div>

            <a
              href="https://www.google.com/maps?q=IIT+Madras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm"
            >
              Get Directions →
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t.appName}. {t.rightsReserved}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
