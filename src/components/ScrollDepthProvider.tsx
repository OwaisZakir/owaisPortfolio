import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface ScrollDepthProviderProps {
  children: ReactNode;
}

const ScrollDepthProvider = ({ children }: ScrollDepthProviderProps) => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Create a depth effect based on scroll position
  const depthScale = useTransform(scrollY, [0, 3000], [1, 1.02]);
  const depthBlur = useTransform(
    scrollY,
    [0, 3000],
    [0, 2]
  );

  // Subtle color shift based on scroll
  const bgOpacity = useTransform(scrollY, [0, 1000], [0, 0.5]);

  return (
    <>
      {/* Dynamic depth background */}
      {!prefersReducedMotion && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, hsl(187 100% 47% / 0.1), transparent 70%)',
            opacity: bgOpacity,
          }}
        />
      )}

      {/* Main content with depth effects */}
      <motion.div
        style={{
          scale: prefersReducedMotion ? 1 : depthScale,
          filter: prefersReducedMotion ? 'none' : depthBlur.get ? `blur(${depthBlur.get()}px)` : 'blur(0px)',
          transformOrigin: 'center top',
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default ScrollDepthProvider;
