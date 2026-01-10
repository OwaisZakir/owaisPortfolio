import { useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from './use-reduced-motion';

export const useScrollDepth = (startOffset = 0, endOffset = 100) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Map scroll position to depth value (0 to 1)
  const depth = useTransform(
    scrollY,
    [startOffset, startOffset + endOffset],
    [0, 1],
    { clamp: true }
  );

  // Calculate scale based on depth (zoom effect)
  const scale = useTransform(depth, (d) => {
    if (prefersReducedMotion) return 1;
    return 1 + d * 0.1; // Grows 10% as you scroll through section
  });

  // Calculate opacity based on depth
  const opacity = useTransform(depth, (d) => {
    if (prefersReducedMotion) return 1;
    return Math.max(0.3, 1 - d * 0.2); // Fades slightly as depth increases
  });

  // Calculate Z position for 3D depth
  const zDepth = useTransform(depth, (d) => {
    if (prefersReducedMotion) return 0;
    return d * 100; // Move forward in 3D space
  });

  // Calculate rotation based on depth
  const rotationY = useTransform(depth, (d) => {
    if (prefersReducedMotion) return 0;
    return d * 5; // Subtle rotation
  });

  return {
    depth,
    scale,
    opacity,
    zDepth,
    rotationY,
    prefersReducedMotion,
  };
};

export default useScrollDepth;
