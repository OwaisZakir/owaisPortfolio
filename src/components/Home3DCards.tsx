import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Code2,
  Zap,
  Shield,
  Database,
  Layers,
  Cpu,
  GitBranch,
  Rocket,
  LucideIcon,
} from 'lucide-react';

interface ExpertiseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  metrics: string;
  index: number;
}

const ExpertiseCard = ({
  icon: Icon,
  title,
  description,
  color,
  metrics,
  index,
}: ExpertiseCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-200, 200], [20, -20]),
    {
      stiffness: 150,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], [-30, 30]),
    {
      stiffness: 150,
      damping: 20,
    }
  );

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
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100,
      }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl p-8 border transition-all duration-300 ${
          isHovered
            ? `border-[${color}] shadow-[0_0_40px_${color}40]`
            : 'border-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
        }`}
        style={{
          borderColor: isHovered ? color : undefined,
          boxShadow: isHovered
            ? `0 0 40px ${color}40, inset 0 0 40px ${color}10`
            : '0 20px 40px rgba(0,0,0,0.3)',
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          background: isHovered
            ? `linear-gradient(135deg, ${color}05, ${color}02)`
            : 'linear-gradient(135deg, hsl(230 25% 12%), hsl(230 25% 8%))',
        }}
      >
        {/* Animated background gradients */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}20, transparent 70%)`,
          }}
        />

        {/* Top glow effect */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-40 transition-opacity blur-2xl"
          style={{
            background: `linear-gradient(to bottom, ${color}, transparent)`,
          }}
        />

        {/* Icon with glow */}
        <motion.div
          className="relative mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl border transition-all"
          style={{
            borderColor: color,
            background: isHovered
              ? `linear-gradient(135deg, ${color}20, ${color}10)`
              : `linear-gradient(135deg, ${color}10, ${color}05)`,
            boxShadow: isHovered
              ? `0 0 30px ${color}60, inset 0 0 20px ${color}30`
              : `0 0 15px ${color}20`,
          }}
          animate={{
            scale: isHovered ? 1.15 : 1,
            boxShadow: isHovered
              ? [
                  `0 0 30px ${color}60`,
                  `0 0 50px ${color}80`,
                  `0 0 30px ${color}60`,
                ]
              : 'none',
          }}
          transition={{
            scale: { duration: 0.3 },
            boxShadow: { duration: 2, repeat: Infinity },
          }}
        >
          <Icon size={32} style={{ color }} strokeWidth={1.5} />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:line-clamp-3 transition-all">
          {description}
        </p>

        {/* Metrics */}
        <motion.div
          className="inline-block px-3 py-1 rounded-full text-xs font-mono text-foreground/80 border transition-all"
          style={{
            borderColor: color,
            background: isHovered ? `${color}15` : `${color}08`,
          }}
          animate={{
            y: isHovered ? -5 : 0,
          }}
        >
          {metrics}
        </motion.div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-40"
          style={{
            background: `linear-gradient(135deg, ${color}, transparent)`,
          }}
          animate={{ rotate: isHovered ? 0 : 90 }}
          transition={{ duration: 0.6 }}
        />

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: color }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Home3DCards = () => {
  const expertise = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description:
        'MERN Stack expert building scalable, production-ready applications with modern patterns',
      color: 'hsl(187 100% 47%)',
      metrics: '8+ projects',
    },
    {
      icon: Database,
      title: 'Backend Architecture',
      description:
        'Microservices, REST APIs, and database optimization for enterprise-scale systems',
      color: 'hsl(152 100% 50%)',
      metrics: '5+ systems',
    },
    {
      icon: Shield,
      title: 'Security & Auth',
      description:
        'JWT, OAuth, secure password handling, and role-based access control implementation',
      color: 'hsl(274 73% 58%)',
      metrics: '99.9% uptime',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description:
        'Code splitting, lazy loading, caching strategies, and rendering optimization',
      color: 'hsl(187 100% 47%)',
      metrics: '90+ Lighthouse',
    },
    {
      icon: Layers,
      title: 'Modern Frameworks',
      description:
        'React, Next.js, Vite, TypeScript with advanced patterns and best practices',
      color: 'hsl(152 100% 50%)',
      metrics: 'TypeScript',
    },
    {
      icon: Cpu,
      title: 'System Design',
      description:
        'Scalable architecture, load balancing, database optimization, and infrastructure planning',
      color: 'hsl(274 73% 58%)',
      metrics: '10K+ users',
    },
    {
      icon: GitBranch,
      title: 'DevOps & Deployment',
      description:
        'CI/CD pipelines, containerization, cloud platforms, and automated testing',
      color: 'hsl(187 100% 47%)',
      metrics: 'Docker, Git',
    },
    {
      icon: Rocket,
      title: 'UX/DX Engineering',
      description:
        'Interactive animations, responsive design, and developer-friendly APIs and documentation',
      color: 'hsl(152 100% 50%)',
      metrics: 'Framer Motion',
    },
  ];

  return (
    <div className="py-16 md:py-24">
      {/* Section header */}
      <motion.div
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-4"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary uppercase tracking-widest">
            Expertise
          </span>
        </motion.div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
          What I Bring to the Table
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Comprehensive skill set combining modern frontend development, robust backend architecture, and system design excellence
        </p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {expertise.map((item, index) => (
          <ExpertiseCard key={item.title} {...item} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default Home3DCards;
