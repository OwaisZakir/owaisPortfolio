import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  count?: number;
  type?: 'card' | 'text' | 'circle' | 'line';
  width?: string;
  height?: string;
  className?: string;
}

const SkeletonLoader = ({
  count = 1,
  type = 'card',
  width = '100%',
  height = '200px',
  className = '',
}: SkeletonLoaderProps) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const loadingAnimation = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <motion.div
            className={`${baseClasses} bg-card ${className}`}
            style={{ width, height }}
            {...loadingAnimation}
          />
        );
      case 'text':
        return (
          <motion.div
            className={`${baseClasses} bg-muted ${className}`}
            style={{ width, height: '1em' }}
            {...loadingAnimation}
          />
        );
      case 'circle':
        return (
          <motion.div
            className={`rounded-full bg-muted ${className}`}
            style={{ width: height, height }}
            {...loadingAnimation}
          />
        );
      case 'line':
        return (
          <motion.div
            className={`${baseClasses} bg-muted/50 h-2 ${className}`}
            style={{ width }}
            {...loadingAnimation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mb-4">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
