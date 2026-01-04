import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useIsTouchDevice } from '@/hooks/use-is-touch-device';
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Shield,
  Code2,
  Briefcase,
  Database,
  Server,
  Lock,
  Cpu,
  Globe,
  Terminal,
  Zap,
  Binary,
  Network,
} from 'lucide-react';

const floatingIcons = [
  { Icon: Shield, x: 8, y: 15, color: 'hsl(274, 73%, 58%)', size: 40, delay: 0 },
  { Icon: Code2, x: 88, y: 20, color: 'hsl(187, 100%, 47%)', size: 44, delay: 0.5 },
  { Icon: Briefcase, x: 12, y: 75, color: 'hsl(152, 100%, 50%)', size: 36, delay: 1 },
  { Icon: Database, x: 92, y: 70, color: 'hsl(187, 100%, 47%)', size: 38, delay: 1.5 },
  { Icon: Server, x: 5, y: 45, color: 'hsl(152, 100%, 50%)', size: 32, delay: 2 },
  { Icon: Lock, x: 95, y: 45, color: 'hsl(274, 73%, 58%)', size: 34, delay: 2.5 },
  { Icon: Cpu, x: 20, y: 88, color: 'hsl(187, 100%, 47%)', size: 30, delay: 3 },
  { Icon: Globe, x: 80, y: 85, color: 'hsl(152, 100%, 50%)', size: 36, delay: 3.5 },
  { Icon: Terminal, x: 30, y: 10, color: 'hsl(274, 73%, 58%)', size: 28, delay: 4 },
  { Icon: Zap, x: 70, y: 8, color: 'hsl(152, 100%, 50%)', size: 32, delay: 4.5 },
  { Icon: Binary, x: 50, y: 5, color: 'hsl(187, 100%, 47%)', size: 26, delay: 5 },
  { Icon: Network, x: 50, y: 92, color: 'hsl(274, 73%, 58%)', size: 34, delay: 5.5 },
];

interface Floating3DIconProps {
  Icon: typeof Shield;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  mouseX: number;
  mouseY: number;
  scrollY: any;
  prefersReducedMotion?: boolean;
}

const Floating3DIcon = ({
  Icon,
  x,
  y,
  color,
  size,
  delay,
  mouseX,
  mouseY,
  scrollY,
  prefersReducedMotion = false,
}: Floating3DIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const localMouseX = useMotionValue(0);
  const localMouseY = useMotionValue(0);

  const rotateX = useSpring(localMouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(localMouseX, { stiffness: 150, damping: 20 });

  // Scroll-based rotation
  const scrollRotate = useTransform(scrollY, [0, 1000], [0, 360]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    localMouseX.set((e.clientX - centerX) / 5);
    localMouseY.set((centerY - e.clientY) / 5);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute hidden md:block cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        perspective: prefersReducedMotion ? 'none' : 1000,
        transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0, rotateY: prefersReducedMotion ? 0 : 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              delay: delay * 0.15,
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
            }
      }
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        localMouseX.set(0);
        localMouseY.set(0);
      }}
    >
      <motion.div
        style={{
          rotateX: !prefersReducedMotion && isHovered ? rotateX : 0,
          rotateY: !prefersReducedMotion && isHovered ? rotateY : prefersReducedMotion ? 0 : scrollRotate,
          transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d',
          x: prefersReducedMotion ? 0 : mouseX * (0.02 * (12 - delay)),
          y: prefersReducedMotion ? 0 : mouseY * (0.02 * (12 - delay)),
        }}
        animate={
          prefersReducedMotion || isHovered
            ? {}
            : {
                y: [0, -20, 0],
                rotateZ: [0, 5, -5, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                y: { duration: 4 + delay * 0.5, repeat: Infinity, ease: 'easeInOut' },
                rotateZ: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }
        }
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-xl blur-xl"
          style={{
            background: color,
            opacity: isHovered ? 0.6 : 0.3,
          }}
          animate={{ scale: isHovered ? 1.5 : 1 }}
        />

        {/* Icon container */}
        <motion.div
          className="relative p-3 rounded-xl border backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, hsl(230 25% 12% / 0.9), hsl(230 25% 8% / 0.95))`,
            borderColor: isHovered ? color : 'hsl(230 20% 25%)',
            boxShadow: isHovered
              ? `0 0 30px ${color}, 0 20px 40px rgba(0,0,0,0.4)`
              : `0 10px 30px rgba(0,0,0,0.3)`,
            transform: 'translateZ(20px)',
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon size={size} style={{ color }} strokeWidth={1.5} />
        </motion.div>

        {/* Particles on hover */}
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: color,
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [0, (Math.random() - 0.5) * 80],
                  y: [0, (Math.random() - 0.5) * 80],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], prefersReducedMotion ? [0, 0] : [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], prefersReducedMotion ? [0, 0] : [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.8]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Grid */}
      <motion.div
        className="absolute inset-0 cyber-grid opacity-30"
        style={{ y: y1 }}
      />

      {/* Multiple gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        style={{ x: prefersReducedMotion ? 0 : mousePosition.x * 0.5, y: prefersReducedMotion ? 0 : mousePosition.y * 0.5 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }
        }
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl"
        style={{ x: prefersReducedMotion ? 0 : mousePosition.x * -0.3, y: prefersReducedMotion ? 0 : mousePosition.y * -0.3 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }
        }
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl"
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotate: 360,
              }
        }
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating 3D Icons - Reduced on mobile/touch */}
      {floatingIcons
        .filter((_, index) => {
          // On touch devices, show only first 6 icons
          if (isTouchDevice) return index < 6;
          return true;
        })
        .map((icon, index) => (
          <Floating3DIcon
            key={index}
            {...icon}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
            scrollY={scrollY}
            prefersReducedMotion={prefersReducedMotion || isTouchDevice}
          />
        ))}

      {/* Rotating geometric shapes */}
      <motion.div
        className="absolute w-96 h-96 border border-primary/10 rounded-full hidden lg:block"
        style={{ right: '5%', top: '10%', y: y2 }}
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full"
          style={{ boxShadow: '0 0 20px hsl(187 100% 47%)' }}
        />
      </motion.div>

      <motion.div
        className="absolute w-64 h-64 border border-secondary/10 hidden lg:block"
        style={{ left: '5%', bottom: '20%', rotate: 45 }}
        animate={prefersReducedMotion ? {} : { rotate: [45, 225, 45] }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Hexagon pattern */}
      <motion.svg
        className="absolute left-[10%] top-[30%] w-32 h-32 text-primary/20 hidden lg:block"
        viewBox="0 0 100 100"
        style={{ y: y1 }}
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <polygon
          points="50,3 95,25 95,75 50,97 5,75 5,25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </motion.svg>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity, scale }}
      >
        <motion.div
          style={{
            x: mousePosition.x * 0.3,
            y: mousePosition.y * 0.3,
          }}
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-md"
            whileHover={{ scale: 1.05, borderColor: 'hsl(187 100% 47% / 0.8)' }}
          >
            <motion.span
              className="w-2.5 h-2.5 bg-accent rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 0 0 hsl(152 100% 50% / 0.7)',
                  '0 0 0 10px hsl(152 100% 50% / 0)',
                  '0 0 0 0 hsl(152 100% 50% / 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-sm text-foreground/90">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name with glitch effect */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight relative"
          >
            <motion.span
              className="text-foreground inline-block"
              whileHover={{ scale: 1.05 }}
            >
              CYBER
            </motion.span>
            <motion.span
              className="gradient-text inline-block ml-4"
              whileHover={{ scale: 1.05 }}
              animate={{
                textShadow: [
                  '0 0 20px hsl(187 100% 47% / 0.5)',
                  '0 0 40px hsl(274 73% 58% / 0.5)',
                  '0 0 20px hsl(152 100% 50% / 0.5)',
                  '0 0 20px hsl(187 100% 47% / 0.5)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              DEVELOPER
            </motion.span>
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-mono text-lg md:text-2xl text-primary mb-8 h-10"
          >
            <Typewriter
              options={{
                strings: [
                  '<MERN Stack Developer />',
                  '{ Cybersecurity Specialist }',
                  '[ Project Lead & Manager ]',
                  '// Hackathon Champion',
                  'def innovate(): return "success"',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body leading-relaxed"
          >
            Building{' '}
            <span className="text-primary font-semibold">secure</span>,{' '}
            <span className="text-secondary font-semibold">scalable</span>{' '}
            applications with cutting-edge technology. Final-year Software
            Engineering student passionate about{' '}
            <span className="text-accent font-semibold">cybersecurity</span> and
            innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px hsl(187 100% 47% / 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="cyber-btn px-10 py-5 bg-primary text-primary-foreground font-display text-lg relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ opacity: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Code2 size={20} />
                View My Work
              </span>
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-btn px-10 py-5 border-2 border-primary/50 text-primary hover:bg-primary/10 font-display text-lg transition-all"
            >
              <span className="flex items-center gap-2">
                <Mail size={20} />
                Contact Me
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center justify-center gap-6"
          >
            {[
              { Icon: Github, href: '#', label: 'GitHub', color: 'hsl(187, 100%, 47%)' },
              { Icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hsl(274, 73%, 58%)' },
              { Icon: Mail, href: '#contact', label: 'Email', color: 'hsl(152, 100%, 50%)' },
            ].map(({ Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{
                  scale: 1.3,
                  y: -8,
                  rotate: [0, -10, 10, 0],
                }}
                whileTap={{ scale: 0.9 }}
                className="relative p-4 text-muted-foreground hover:text-foreground transition-colors group"
                aria-label={label}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle, ${color}20, transparent 70%)`,
                  }}
                />
                <Icon size={26} className="relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <motion.a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
        >
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-2 rounded-full border border-border group-hover:border-primary transition-colors"
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Corner Decorations with animations */}
      {[
        { pos: 'top-20 left-4', border: 'border-l-2 border-t-2' },
        { pos: 'top-20 right-4', border: 'border-r-2 border-t-2' },
        { pos: 'bottom-4 left-4', border: 'border-l-2 border-b-2' },
        { pos: 'bottom-4 right-4', border: 'border-r-2 border-b-2' },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.pos} w-20 h-20 ${corner.border} border-primary/30`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 1 + i * 0.1, duration: 0.5 }
          }
          whileHover={prefersReducedMotion ? {} : { borderColor: 'hsl(187 100% 47%)', scale: 1.1 }}
        />
      ))}
    </section>
  );
};

export default HeroSection;
