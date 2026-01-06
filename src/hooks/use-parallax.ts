import { useScroll, useTransform, MotionValue } from 'framer-motion';

export const useParallax = (offset: number = 0, speed: number = 0.5) => {
  const { scrollY } = useScroll();
  
  const y = useTransform(
    scrollY,
    [0, 1000],
    [0, -1000 * speed],
    { clamp: false }
  );

  return y;
};

export const useScrollOpacity = (start: number = 0, end: number = 1000) => {
  const { scrollY } = useScroll();
  
  const opacity = useTransform(
    scrollY,
    [start, end],
    [0, 1],
    { clamp: true }
  );

  return opacity;
};

export const useScrollScale = (start: number = 0, end: number = 1000) => {
  const { scrollY } = useScroll();
  
  const scale = useTransform(
    scrollY,
    [start, end],
    [0.8, 1],
    { clamp: true }
  );

  return scale;
};
