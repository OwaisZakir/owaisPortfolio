import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useSectionAnimation } from '@/hooks/use-section-animation';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

const SectionWrapper = ({ 
  children, 
  id, 
  className = '',
  delay = 0
}: SectionWrapperProps) => {
  const { ref, isInView } = useSectionAnimation(0.1);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
