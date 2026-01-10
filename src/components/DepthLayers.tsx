import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const DepthLayers = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Multiple parallax layers for depth
  const layer1Y = useTransform(scrollY, [0, 2000], [0, 200]);
  const layer2Y = useTransform(scrollY, [0, 2000], [0, 150]);
  const layer3Y = useTransform(scrollY, [0, 2000], [0, 100]);

  // Color shifts for depth perception
  const layer1Opacity = useTransform(scrollY, [0, 3000], [0.3, 0.1]);
  const layer2Opacity = useTransform(scrollY, [0, 3000], [0.2, 0.05]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Layer 1 - Cyan gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, hsl(187 100% 47% / 0.4), transparent 50%)',
          y: layer1Y,
          opacity: layer1Opacity,
        }}
      />

      {/* Layer 2 - Purple gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 80% 70%, hsl(274 73% 58% / 0.3), transparent 50%)',
          y: layer2Y,
          opacity: layer2Opacity,
        }}
      />

      {/* Layer 3 - Green accent */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, hsl(152 100% 50% / 0.15), transparent 60%)',
          y: layer3Y,
          opacity: useTransform(scrollY, [0, 3000], [0.15, 0.02]),
        }}
      />

      {/* Grid pattern with parallax */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(0deg, hsl(187 100% 47%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 100% 47%) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          y: useTransform(scrollY, [0, 2000], [0, 250]),
        }}
      />

      {/* Floating accent elements */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`accent-${i}`}
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: [
              'radial-gradient(circle, hsl(187 100% 47% / 0.1), transparent)',
              'radial-gradient(circle, hsl(274 73% 58% / 0.1), transparent)',
              'radial-gradient(circle, hsl(152 100% 50% / 0.1), transparent)',
            ][i],
            left: `${20 + i * 35}%`,
            top: `${10 + i * 20}%`,
            y: useTransform(scrollY, [0, 3000], [0, 300 - i * 50]),
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Top fade gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default DepthLayers;
