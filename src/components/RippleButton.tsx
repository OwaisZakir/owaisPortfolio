import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const RippleButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  type = 'button',
}: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);

    onClick?.();
  };

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground neon-text',
    secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    outline: 'border border-primary text-primary hover:bg-primary/10',
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`relative overflow-hidden px-6 py-3 font-display font-semibold tracking-wider uppercase rounded transition-all ${variantClasses[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {/* Ripple container */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30"
            initial={{
              opacity: 1,
              width: 0,
              height: 0,
              x: ripple.x,
              y: ripple.y,
            }}
            animate={{
              opacity: 0,
              width: 300,
              height: 300,
              x: ripple.x - 150,
              y: ripple.y - 150,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
};

export default RippleButton;
