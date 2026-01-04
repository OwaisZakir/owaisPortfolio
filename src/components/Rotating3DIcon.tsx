import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface Rotating3DIconProps {
  Icon: LucideIcon;
  size?: number;
  color?: string;
  glowColor?: string;
  className?: string;
  floatDelay?: number;
  rotationSpeed?: number;
  interactive?: boolean;
}

export const Rotating3DIcon = ({
  Icon,
  size = 48,
  color = 'text-primary',
  glowColor = 'hsl(187, 100%, 47%)',
  className = '',
  floatDelay = 0,
  rotationSpeed = 20,
  interactive = true,
}: Rotating3DIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to element
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !interactive) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer ${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: floatDelay, duration: 0.5, type: 'spring' }}
    >
      <motion.div
        className="relative"
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={
          !isHovered
            ? {
                rotateY: [0, 360],
                y: [0, -15, 0],
              }
            : {}
        }
        transition={{
          rotateY: {
            duration: rotationSpeed,
            repeat: Infinity,
            ease: 'linear',
          },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: floatDelay,
          },
        }}
      >
        {/* Glow effect behind icon */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: glowColor,
            opacity: isHovered ? 0.6 : 0.3,
          }}
          animate={{
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main icon container with 3D effect */}
        <motion.div
          className={`relative p-4 rounded-xl border backdrop-blur-sm ${color}`}
          style={{
            background: `linear-gradient(135deg, hsl(230 25% 12% / 0.8), hsl(230 25% 8% / 0.9))`,
            borderColor: isHovered ? glowColor : 'hsl(230 20% 18%)',
            boxShadow: isHovered
              ? `0 0 30px ${glowColor}, 0 20px 40px rgba(0,0,0,0.4)`
              : `0 10px 30px rgba(0,0,0,0.3)`,
            transform: 'translateZ(20px)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon size={size} strokeWidth={1.5} />
        </motion.div>

        {/* Reflection/shadow plane */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(to bottom, transparent, ${glowColor})`,
            opacity: 0.1,
            transform: 'translateZ(-10px) rotateX(180deg) translateY(100%)',
            filter: 'blur(10px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Floating tech logo with orbit animation
interface OrbitingIconProps {
  Icon: LucideIcon;
  orbitRadius?: number;
  orbitDuration?: number;
  startAngle?: number;
  size?: number;
  color?: string;
}

export const OrbitingIcon = ({
  Icon,
  orbitRadius = 150,
  orbitDuration = 20,
  startAngle = 0,
  size = 32,
  color = 'text-primary',
}: OrbitingIconProps) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: orbitDuration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <motion.div
        className={`p-3 rounded-lg backdrop-blur-sm border border-border/50 bg-card/50 ${color}`}
        style={{
          transform: `translateX(${orbitRadius}px) rotate(-${startAngle}deg)`,
        }}
        whileHover={{ scale: 1.3 }}
      >
        <Icon size={size} />
      </motion.div>
    </motion.div>
  );
};

// Scroll-triggered rotating cube
interface ScrollRotatingCubeProps {
  children: ReactNode;
  className?: string;
}

export const ScrollRotatingCube = ({ children, className = '' }: ScrollRotatingCubeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{
          rotateY: scrollProgress * 360,
          rotateX: scrollProgress * 180,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Rotating3DIcon;
