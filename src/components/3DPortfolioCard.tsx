import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

interface Card3DProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  index?: number;
}

const Card3D = ({ 
  title, 
  description, 
  image, 
  tags, 
  github, 
  demo, 
  featured = false,
  index = 0 
}: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [20, -20]), {
    stiffness: 150,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-30, 30]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`group relative ${featured ? 'md:col-span-2 lg:row-span-2' : ''}`}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 50, rotateX: 15 }
      }
      transition={{
        duration: 0.8,
        delay: (index || 0) * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Container */}
      <motion.div
        className={`relative h-full overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/80 to-background backdrop-blur-xl transition-all duration-300 ${
          isHovered
            ? 'border-primary/60 shadow-[0_0_40px_rgba(0,238,255,0.3)]'
            : 'shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
        }`}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          transformPerspective: 1000,
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Image Container with 3D Effect */}
        <div className="relative h-56 md:h-72 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/5 to-secondary/20"
            animate={isHovered ? { opacity: 0.8 } : { opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />

          {/* Image with parallax */}
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? 'brightness(1.1)' : 'brightness(0.9)',
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Overlay glow on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}

          {/* Featured badge */}
          {featured && (
            <motion.div
              className="absolute top-4 right-4 px-3 py-1.5 bg-accent/90 text-accent-foreground text-xs font-bold rounded-full backdrop-blur-sm border border-accent/60"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: (index || 0) * 0.1 + 0.3, type: 'spring' }}
            >
              Featured
            </motion.div>
          )}
        </div>

        {/* Content Container */}
        <div className="relative p-6 md:p-8">
          {/* Title */}
          <motion.h3
            className="text-xl md:text-2xl font-bold mb-2 text-foreground"
            animate={{
              color: isHovered ? 'hsl(187 100% 47%)' : 'inherit',
            }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2 group-hover:line-clamp-3 transition-all">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 3).map((tag) => (
              <motion.span
                key={tag}
                className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/20 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
            {tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-mono text-muted-foreground">
                +{tags.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-2">
              {github && (
                <motion.a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 hover:border-primary/60 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                </motion.a>
              )}
              {demo && (
                <motion.a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 border border-accent/30 hover:border-accent/60 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={18} />
                </motion.a>
              )}
            </div>

            {/* Hover indicator */}
            <motion.div
              className="text-primary/60 group-hover:text-primary transition-colors"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              <ChevronRight size={20} />
            </motion.div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-secondary"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Card3D;
