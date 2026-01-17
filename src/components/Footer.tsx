import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Our Process', href: '/process' },
    { label: 'About Us', href: '/about' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact', href: '/contact' },
  ];

  const materialLinks = [
    { label: 'Granite Countertops', href: '/services/granite-countertops' },
    { label: 'Quartz Countertops', href: '/services/quartz-countertops' },
    { label: 'Quartzite Countertops', href: '/services/quartzite-countertops' },
    { label: 'Porcelain Countertops', href: '/services/porcelain-countertops' },
    { label: 'All Materials', href: '/services' },
  ];

  const resourceLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Service Area', href: '/service-area' },
  ];

  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="text-primary-foreground">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="14" height="14" fill="currentColor" opacity="0.8"/>
                  <rect x="22" y="4" width="14" height="14" fill="currentColor" opacity="0.4"/>
                  <rect x="4" y="22" width="14" height="14" fill="currentColor" opacity="0.4"/>
                  <rect x="22" y="22" width="14" height="14" fill="currentColor" opacity="0.8"/>
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-medium tracking-tight block">Stoneworks</span>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-70 -mt-0.5 block">of Colorado</span>
              </div>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6 max-w-sm">
              Crafting exceptional stone countertops for Northern Colorado homeowners since 2003. Granite, quartz, quartzite, and porcelain expertly fabricated and installed.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Materials</h4>
            <ul className="space-y-3">
              {materialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Resources below materials */}
            <h4 className="font-serif text-lg font-medium mb-4 mt-8">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Visit Our Showroom</h4>
            <address className="not-italic text-sm text-primary-foreground/60 space-y-3">
              <p>123 Craftsman Way</p>
              <p>Fort Collins, CO 80524</p>
              <p className="pt-2">
                <a href="tel:+19705551234" className="hover:text-primary-foreground transition-colors">
                  (970) 555-1234
                </a>
              </p>
              <p>
                <a href="mailto:info@stoneworksco.com" className="hover:text-primary-foreground transition-colors">
                  info@stoneworksco.com
                </a>
              </p>
            </address>
            <div className="mt-6 text-sm text-primary-foreground/60">
              <p className="font-medium text-primary-foreground mb-1">Hours</p>
              <p>Mon - Fri: 8am - 5pm</p>
              <p>Sat: 9am - 2pm</p>
              <p>Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Stoneworks of Colorado. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="text-sm text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-sm text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
