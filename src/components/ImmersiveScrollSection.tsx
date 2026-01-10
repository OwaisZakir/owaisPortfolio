import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface ImmersiveScrollSectionProps {
  children: ReactNode;
  id: string;
  title?: string;
  subtitle?: string;
  index: number;
  totalSections: number;
  className?: string;
}

const ImmersiveScrollSection = ({
  children,
  id,
  title,
  subtitle,
  index,
  totalSections,
  className = '',
}: ImmersiveScrollSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Calculate section depth (0 at bottom of viewport, 1 at top)
  const sectionDepth = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // 3D transforms based on scroll position
  const scale = useTransform(sectionDepth, (depth) => {
    if (prefersReducedMotion) return 1;
    return 1 + depth * 0.15;
  });

  const opacity = useTransform(sectionDepth, (depth) => {
    if (prefersReducedMotion) return 1;
    return Math.max(0.5, depth);
  });

  const rotateX = useTransform(sectionDepth, (depth) => {
    if (prefersReducedMotion) return 0;
    return depth * -10;
  });

  const translateZ = useTransform(sectionDepth, (depth) => {
    if (prefersReducedMotion) return 0;
    return depth * 100;
  });

  // Blur effect based on depth
  const blur = useTransform(sectionDepth, (depth) => {
    if (prefersReducedMotion) return 0;
    return (1 - depth) * 10;
  });

  // Calculate background intensity
  const bgIntensity = useTransform(sectionDepth, (depth) => {
    return depth * 0.5;
  });

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32 ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Dynamic background gradient */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            hsl(187 100% 47% / ${useTransform(bgIntensity, (v) => v * 0.15)}),
            hsl(274 73% 58% / ${useTransform(bgIntensity, (v) => v * 0.1)}),
            transparent 70%)`,
        }}
      />

      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, hsl(187 100% 47% / 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(187 100% 47% / 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: useTransform(bgIntensity, (v) => 0.2 + v),
        }}
      />

      {/* Floating particles */}
      {!prefersReducedMotion &&
        [0, 1, 2, 3].map((i) => (
          <motion.div
            key={`particle-${id}-${i}`}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${25 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Main content wrapper with 3D effects */}
      <motion.div
        ref={containerRef}
        className="relative z-10 w-full"
        style={{
          scale,
          opacity,
          rotateX: prefersReducedMotion ? 0 : rotateX,
          transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d',
          filter: blur.get ? `blur(${blur.get()}px)` : 'blur(0px)',
        }}
      >
        {/* Section header (optional) */}
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title && (
              <motion.h2
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4"
                animate={{
                  backgroundImage: [
                    'linear-gradient(90deg, hsl(187 100% 47%), hsl(274 73% 58%))',
                    'linear-gradient(90deg, hsl(274 73% 58%), hsl(152 100% 50%))',
                    'linear-gradient(90deg, hsl(152 100% 50%), hsl(187 100% 47%))',
                    'linear-gradient(90deg, hsl(187 100% 47%), hsl(274 73% 58%))',
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Main content */}
        {children}
      </motion.div>

      {/* Section divider */}
      {index < totalSections - 1 && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
          style={{
            opacity: useTransform(sectionDepth, [0, 1], [1, 0]),
          }}
        />
      )}
    </motion.section>
  );
};

export default ImmersiveScrollSection;
