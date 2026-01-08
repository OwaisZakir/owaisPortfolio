import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Database,
  Server,
  Globe,
  Shield,
  GitBranch,
  Cloud,
  Boxes,
  Lock,
  Terminal,
  Cpu,
  Layers,
  Workflow,
  Code2,
  Zap,
  Binary,
  Network,
  HardDrive,
  Fingerprint,
  Eye,
  Key,
  Bug,
  FileCode,
  Wifi,
  Smartphone,
  Monitor,
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Monitor,
    color: 'primary',
    glowColor: 'hsl(187, 100%, 47%)',
    skills: [
      { name: 'React.js', level: 95, icon: Code2 },
      { name: 'TypeScript', level: 92, icon: FileCode },
      { name: 'Tailwind CSS', level: 94, icon: Layers },
      { name: 'Next.js', level: 88, icon: Code2 },
      { name: 'Redux.js', level: 90, icon: Layers },
      { name: 'GSAP & Animation', level: 85, icon: Zap },
    ],
  },
  {
    title: 'Backend & Full-Stack',
    icon: Server,
    color: 'secondary',
    glowColor: 'hsl(274, 73%, 58%)',
    skills: [
      { name: 'Node.js', level: 92, icon: Terminal },
      { name: 'Express.js', level: 91, icon: Server },
      { name: 'MongoDB', level: 90, icon: Database },
      { name: 'GraphQL', level: 85, icon: Network },
      { name: 'REST APIs', level: 93, icon: Wifi },
      { name: 'Vite', level: 90, icon: Zap },
    ],
  },
  {
    title: 'Cybersecurity & Linux',
    icon: Shield,
    color: 'secondary',
    glowColor: 'hsl(274, 73%, 58%)',
    skills: [
      { name: 'Network Security', level: 88, icon: Network },
      { name: 'Threat Detection', level: 85, icon: Bug },
      { name: 'Kali Linux', level: 82, icon: Terminal },
      { name: 'Linux/Ubuntu', level: 87, icon: Terminal },
      { name: 'Cyber Best Practices', level: 90, icon: Shield },
      { name: 'Password Security', level: 85, icon: Key },
    ],
  },
  {
    title: 'Tools & Technologies',
    icon: Cloud,
    color: 'accent',
    glowColor: 'hsl(152, 100%, 50%)',
    skills: [
      { name: 'Git & GitHub', level: 95, icon: GitBranch },
      { name: 'Postman & API Testing', level: 90, icon: Smartphone },
      { name: 'Visual Studio & IDE', level: 93, icon: Code2 },
      { name: 'Docker & Containers', level: 80, icon: Boxes },
      { name: 'AI Tools (Gemini, ChatGPT)', level: 88, icon: Cpu },
      { name: 'Web Design (UI/UX)', level: 85, icon: Monitor },
    ],
  },
  {
    title: 'Business & Leadership',
    icon: Workflow,
    color: 'primary',
    glowColor: 'hsl(187, 100%, 47%)',
    skills: [
      { name: 'Project Management', level: 92, icon: Monitor },
      { name: 'Full-Stack Development', level: 93, icon: Code2 },
      { name: 'ERP & POS Systems', level: 88, icon: Layers },
      { name: 'Agile Methodologies', level: 89, icon: Zap },
      { name: 'Deep Learning & AI', level: 78, icon: Cpu },
      { name: 'Team Leadership', level: 90, icon: Binary },
    ],
  },
  {
    title: 'Languages',
    icon: Globe,
    color: 'accent',
    glowColor: 'hsl(152, 100%, 50%)',
    skills: [
      { name: 'English (Professional)', level: 92, icon: Code2 },
      { name: 'Urdu (Native)', level: 100, icon: Code2 },
      { name: 'Arabic (Limited)', level: 65, icon: Code2 },
    ],
  },
];

const techLogos = [
  { Icon: Database, label: 'MongoDB', color: 'hsl(152, 100%, 50%)' },
  { Icon: Server, label: 'Node.js', color: 'hsl(152, 100%, 50%)' },
  { Icon: Code2, label: 'React', color: 'hsl(187, 100%, 47%)' },
  { Icon: Globe, label: 'Express', color: 'hsl(187, 100%, 47%)' },
  { Icon: Shield, label: 'Security', color: 'hsl(274, 73%, 58%)' },
  { Icon: Lock, label: 'Encryption', color: 'hsl(274, 73%, 58%)' },
  { Icon: Cloud, label: 'AWS', color: 'hsl(187, 100%, 47%)' },
  { Icon: Boxes, label: 'Docker', color: 'hsl(187, 100%, 47%)' },
  { Icon: GitBranch, label: 'Git', color: 'hsl(152, 100%, 50%)' },
  { Icon: Terminal, label: 'CLI', color: 'hsl(152, 100%, 50%)' },
  { Icon: Cpu, label: 'Systems', color: 'hsl(274, 73%, 58%)' },
  { Icon: Layers, label: 'Full Stack', color: 'hsl(187, 100%, 47%)' },
  { Icon: Network, label: 'Networking', color: 'hsl(274, 73%, 58%)' },
  { Icon: HardDrive, label: 'Storage', color: 'hsl(152, 100%, 50%)' },
  { Icon: Fingerprint, label: 'Auth', color: 'hsl(274, 73%, 58%)' },
  { Icon: FileCode, label: 'TypeScript', color: 'hsl(187, 100%, 47%)' },
  { Icon: Wifi, label: 'APIs', color: 'hsl(152, 100%, 50%)' },
  { Icon: Smartphone, label: 'Mobile', color: 'hsl(274, 73%, 58%)' },
];

interface Tech3DIconProps {
  Icon: typeof Database;
  label: string;
  color: string;
  index: number;
}

const Tech3DIcon = ({ Icon, label, color, index }: Tech3DIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 8);
    mouseY.set((rect.top + rect.height / 2 - e.clientY) / 8);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        type: 'spring',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative group cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative p-3 md:p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          borderColor: color,
          boxShadow: `0 0 30px ${color}40, inset 0 0 20px ${color}10`,
        }}
      >
        {/* Rotating animation when not hovered */}
        <motion.div
          className="flex flex-col items-center gap-1 md:gap-2"
          animate={!isHovered ? { rotateY: [0, 360] } : {}}
          transition={{
            rotateY: { duration: 10 + index * 0.5, repeat: Infinity, ease: 'linear' },
          }}
        >
          <Icon
            size={24}
            style={{
              color,
              filter: isHovered ? `drop-shadow(0 0 15px ${color})` : 'none',
            }}
          />
          <span
            className="text-[10px] md:text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors"
            style={{ color: isHovered ? color : undefined }}
          >
            {label}
          </span>
        </motion.div>

        {/* Hover particles */}
        {isHovered &&
          [...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ background: color, left: '50%', top: '50%' }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 60],
                y: [0, -40 - Math.random() * 20],
              }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
      </motion.div>
    </motion.div>
  );
};

const SkillBar = ({
  name,
  level,
  color,
  glowColor,
  delay,
  icon: IconComponent,
}: {
  name: string;
  level: number;
  color: string;
  glowColor: string;
  delay: number;
  icon: typeof Database;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
  };

  return (
    <motion.div
      ref={ref}
      className="space-y-3 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 5 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 rounded-lg border border-border/50 bg-card/50"
            animate={isHovered ? { rotate: 360, scale: 1.1 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: isHovered ? `0 0 20px ${glowColor}40` : 'none',
              borderColor: isHovered ? glowColor : undefined,
            }}
          >
            <IconComponent size={16} style={{ color: glowColor }} />
          </motion.div>
          <span className="font-mono text-sm text-foreground">{name}</span>
        </div>
        <motion.span
          className="font-mono text-sm font-bold"
          style={{ color: glowColor }}
          animate={isHovered ? { scale: 1.2 } : {}}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-3 bg-muted/50 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${colorClasses[color as keyof typeof colorClasses]} relative`}
          style={{
            boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}50`,
          }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden bg-muted/20">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '120px' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
          />
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">SKILLS &</span>{' '}
            <motion.span
              className="text-primary neon-text inline-block"
              animate={{
                textShadow: [
                  '0 0 20px hsl(187 100% 47%)',
                  '0 0 40px hsl(187 100% 47%)',
                  '0 0 20px hsl(187 100% 47%)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              EXPERTISE
            </motion.span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit for building secure, scalable applications
          </p>
        </motion.div>

        {/* 3D Tech Icons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-6 sm:grid-cols-9 gap-2 md:gap-3 mb-16 max-w-5xl mx-auto"
        >
          {techLogos.map((tech, index) => (
            <Tech3DIcon
              key={tech.label}
              Icon={tech.Icon}
              label={tech.label}
              color={tech.color}
              index={index}
            />
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-3 font-display text-sm uppercase tracking-wider rounded-xl transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border hover:border-primary/30'
              }`}
              style={{
                boxShadow:
                  activeCategory === index
                    ? `0 0 30px ${category.glowColor}50`
                    : 'none',
              }}
            >
              <motion.div animate={activeCategory === index ? { rotate: 360 } : {}} transition={{ duration: 0.5 }}>
                <category.icon className="w-4 h-4" />
              </motion.div>
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Skill Bars */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="cyber-card p-8"
            style={{
              boxShadow: `0 0 40px ${skillCategories[activeCategory].glowColor}20`,
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                className="p-3 rounded-xl border"
                style={{
                  borderColor: skillCategories[activeCategory].glowColor,
                  boxShadow: `0 0 20px ${skillCategories[activeCategory].glowColor}40`,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {(() => {
                  const CategoryIcon = skillCategories[activeCategory].icon;
                  return (
                    <CategoryIcon
                      className="w-8 h-8"
                      style={{ color: skillCategories[activeCategory].glowColor }}
                    />
                  );
                })()}
              </motion.div>
              <h3 className="font-display text-2xl font-bold">
                {skillCategories[activeCategory].title}
              </h3>
            </div>
            <div className="space-y-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skillCategories[activeCategory].color}
                  glowColor={skillCategories[activeCategory].glowColor}
                  delay={index * 0.15}
                  icon={skill.icon}
                />
              ))}
            </div>
          </motion.div>

          {/* Circular Progress Visualizers */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cyber-card p-6 flex flex-col items-center justify-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-24 h-24 mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-muted/30"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke={skillCategories[activeCategory].glowColor}
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${skill.level * 2.51} 251`}
                      initial={{ strokeDasharray: '0 251' }}
                      animate={{ strokeDasharray: `${skill.level * 2.51} 251` }}
                      transition={{ duration: 1.5, delay: 0.3 + index * 0.1 }}
                      strokeLinecap="round"
                      style={{
                        filter: `drop-shadow(0 0 10px ${skillCategories[activeCategory].glowColor})`,
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span
                        className="font-display text-xl font-bold"
                        style={{ color: skillCategories[activeCategory].glowColor }}
                      >
                        {skill.level}%
                      </span>
                    </motion.div>
                  </div>
                </div>
                <h4 className="font-display text-sm font-semibold text-center group-hover:text-primary transition-colors">
                  {skill.name}
                </h4>
                <p className="text-muted-foreground text-xs mt-1">
                  {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
