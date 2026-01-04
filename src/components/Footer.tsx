import { motion } from 'framer-motion';
import { Terminal, Heart, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-border/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Terminal className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-lg">
                <span className="text-primary">DEV</span>
                <span className="text-foreground">.CYBER</span>
              </span>
            </motion.div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-destructive fill-destructive" /> in 2024
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Mail, href: '#contact', label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-card/50 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-xs font-mono">
            &copy; {new Date().getFullYear()} CyberDev Portfolio. All rights reserved.
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
