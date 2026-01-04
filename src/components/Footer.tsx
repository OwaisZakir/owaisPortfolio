import { motion } from 'framer-motion';
import { Terminal, Heart, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const version = '1.0.0';

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 w-fit"
            >
              <Terminal className="w-6 h-6 text-primary" />
              <div>
                <span className="font-display font-bold text-lg block">
                  <span className="text-primary">DEV</span>
                  <span className="text-foreground">.CYBER</span>
                </span>
                <span className="text-xs text-muted-foreground font-mono">v{version}</span>
              </div>
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Building secure, scalable applications with cutting-edge technology.
            </p>
          </motion.div>

          {/* Sitemap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-semibold mb-4 text-foreground">Navigate</h4>
            <nav className="space-y-2.5">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-semibold mb-4 text-foreground">Resources</h4>
            <nav className="space-y-2.5">
              {[
                { label: 'GitHub', href: '#' },
                { label: 'Resume', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-semibold mb-4 text-foreground">Connect</h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 bg-card/50 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-xs font-mono">
              &copy; {currentYear} CyberDev Portfolio. All rights reserved.
            </p>
            <p className="text-muted-foreground/50 text-xs mt-1">
              Built with React, Tailwind CSS, Framer Motion, and TypeScript
            </p>
          </div>
          <p className="text-muted-foreground text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-destructive fill-destructive" /> for web excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
