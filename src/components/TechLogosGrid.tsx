import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Database,
  Server,
  Globe,
  Shield,
  GitBranch,
  Cloud,
  Lock,
  Terminal,
  Cpu,
  Layers,
  Code2,
  Boxes,
  Workflow,
  Zap,
  Binary,
  Network,
  HardDrive,
  Fingerprint,
  Eye,
  Key,
} from 'lucide-react';

const techLogos = [
  { Icon: Code2, name: 'React', color: 'hsl(187, 100%, 47%)', category: 'frontend' },
  { Icon: Server, name: 'Node.js', color: 'hsl(152, 100%, 50%)', category: 'backend' },
  { Icon: Database, name: 'MongoDB', color: 'hsl(152, 100%, 50%)', category: 'database' },
  { Icon: Globe, name: 'Express', color: 'hsl(187, 100%, 47%)', category: 'backend' },
  { Icon: Shield, name: 'Security', color: 'hsl(274, 73%, 58%)', category: 'security' },
  { Icon: Lock, name: 'Encryption', color: 'hsl(274, 73%, 58%)', category: 'security' },
  { Icon: Cloud, name: 'AWS', color: 'hsl(187, 100%, 47%)', category: 'cloud' },
  { Icon: Boxes, name: 'Docker', color: 'hsl(187, 100%, 47%)', category: 'devops' },
  { Icon: GitBranch, name: 'Git', color: 'hsl(152, 100%, 50%)', category: 'devops' },
  { Icon: Terminal, name: 'CLI', color: 'hsl(152, 100%, 50%)', category: 'tools' },
  { Icon: Cpu, name: 'Systems', color: 'hsl(274, 73%, 58%)', category: 'systems' },
  { Icon: Layers, name: 'Full Stack', color: 'hsl(187, 100%, 47%)', category: 'frontend' },
  { Icon: Workflow, name: 'CI/CD', color: 'hsl(152, 100%, 50%)', category: 'devops' },
  { Icon: Zap, name: 'Performance', color: 'hsl(274, 73%, 58%)', category: 'tools' },
  { Icon: Binary, name: 'Algorithms', color: 'hsl(187, 100%, 47%)', category: 'skills' },
  { Icon: Network, name: 'Networking', color: 'hsl(274, 73%, 58%)', category: 'security' },
  { Icon: HardDrive, name: 'Storage', color: 'hsl(152, 100%, 50%)', category: 'database' },
  { Icon: Fingerprint, name: 'Auth', color: 'hsl(274, 73%, 58%)', category: 'security' },
  { Icon: Eye, name: 'Monitoring', color: 'hsl(187, 100%, 47%)', category: 'devops' },
  { Icon: Key, name: 'API Keys', color: 'hsl(152, 100%, 50%)', category: 'security' },
];

interface Tech3DCardProps {
  Icon: typeof Code2;
  name: string;
  color: string;
  index: number;
}

const Tech3DCard = ({ Icon, name, color, index }: Tech3DCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 10);
    mouseY.set((centerY - e.clientY) / 10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="relative p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ z: 50 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${color}20, transparent 70%)`,
            boxShadow: isHovered ? `0 0 40px ${color}40, inset 0 0 20px ${color}10` : 'none',
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-2"
          animate={
            !isHovered
              ? {
                  rotateY: [0, 360],
                }
              : { rotateY: 0 }
          }
          transition={{
            rotateY: {
              duration: 8 + index * 0.5,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          <Icon
            size={28}
            style={{ color, filter: isHovered ? `drop-shadow(0 0 10px ${color})` : 'none' }}
          />
          <span
            className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors"
            style={{ color: isHovered ? color : undefined }}
          >
            {name}
          </span>
        </motion.div>

        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ background: color }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -30 - i * 10],
                  x: [(i - 1) * 15, (i - 1) * 20],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

interface TechLogosGridProps {
  limit?: number;
}

const TechLogosGrid = ({ limit }: TechLogosGridProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const displayedLogos = limit ? techLogos.slice(0, limit) : techLogos;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3"
    >
      {displayedLogos.map((tech, index) => (
        <Tech3DCard
          key={tech.name}
          Icon={tech.Icon}
          name={tech.name}
          color={tech.color}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default TechLogosGrid;
