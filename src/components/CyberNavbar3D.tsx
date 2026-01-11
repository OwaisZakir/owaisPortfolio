import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Download } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useActiveSection } from '@/hooks/use-active-section';
import { downloadResume } from '@/lib/resume-generator';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: '3D Showcase', href: '#3d-showcase' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const CyberNavbar3D = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const sectionIds = navItems.map(item => item.href.slice(1));
  const activeSection = useActiveSection(sectionIds);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: prefersReducedMotion ? 0 : -100 }}
        animate={{ y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/40 backdrop-blur-2xl border-b border-primary/30 shadow-2xl'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Gradient mesh background for scrolled state */}
        {isScrolled && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 238, 255, 0.1), transparent 80%)',
              '--mouse-x': `${mousePosition.x}px`,
              '--mouse-y': `${mousePosition.y}px`,
            } as any}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with 3D effect */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center gap-2 group"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={prefersReducedMotion ? {} : {
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative bg-background/80 backdrop-blur-sm p-1.5 rounded-lg border border-primary/50">
                  <Terminal className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <span className="font-display font-bold text-lg tracking-widest">
                <span className="text-primary neon-text">DEV</span>
                <span className="text-foreground">.</span>
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">CYBER</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1.5">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative"
                >
                  <motion.a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className={`relative px-3.5 py-2 font-display text-xs tracking-widest uppercase transition-all font-semibold group ${
                      activeSection === item.href.slice(1)
                        ? 'text-primary'
                        : 'text-foreground/70 hover:text-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Underline animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
                      initial={{ width: 0 }}
                      animate={{
                        width: activeSection === item.href.slice(1) ? '100%' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Background glow on active */}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-primary/5 rounded-lg border border-primary/20 -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <span className="relative z-10">{item.name}</span>
                  </motion.a>
                </motion.div>
              ))}

              {/* Resume Download Button with enhanced styling */}
              <motion.button
                onClick={downloadResume}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.08 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.08, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className="ml-6 px-6 py-2.5 rounded-lg relative group overflow-hidden font-display text-xs font-bold tracking-wider uppercase transition-all"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent"
                  animate={prefersReducedMotion ? {} : {
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Base background */}
                <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" />

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 238, 255, 0.3), transparent)',
                  }}
                />

                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Download size={14} />
                  Resume
                </span>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-white/0 group-hover:border-white/50 transition-all"
                  animate={prefersReducedMotion ? {} : { boxShadow: [
                    '0 0 0 0 rgba(0, 238, 255, 0.4)',
                    '0 0 20px 0 rgba(0, 238, 255, 0.2)',
                    '0 0 0 0 rgba(0, 238, 255, 0)',
                  ] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 text-foreground hover:text-primary transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px] min-w-[44px] flex items-center justify-center relative group"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              />
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Animated border line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #00eeff, transparent)',
          }}
          animate={prefersReducedMotion ? {} : {
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={prefersReducedMotion ? { x: 0 } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? { x: 0 } : { x: '100%' }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
              className="fixed right-0 top-0 bottom-0 z-50 w-64 bg-background/95 backdrop-blur-xl border-l border-primary/20 md:hidden"
              id="mobile-menu"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between h-20 px-6 border-b border-border/50">
                <span className="font-display font-bold text-primary">Menu</span>
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-foreground hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <motion.nav
                className="flex flex-col py-6"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.05 } },
                  closed: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.05, staggerDirection: -1 } },
                }}
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 20 },
                    }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                    className={`px-6 py-4 font-display text-lg tracking-wider uppercase transition-all border-l-4 font-semibold ${
                      activeSection === item.href.slice(1)
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-foreground hover:text-primary hover:border-primary/50'
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}

                <motion.button
                  onClick={() => { downloadResume(); setIsMobileMenuOpen(false); }}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: 20 },
                  }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                  className="mx-6 mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent text-white font-display text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download Resume
                </motion.button>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CyberNavbar3D;
