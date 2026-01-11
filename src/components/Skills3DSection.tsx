import { motion, useInView } from 'framer-motion';
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
      { name: 'Framer Motion', level: 90, icon: Zap },
    ],
  },
  {
    title: 'Backend & Full-Stack',
    icon: Server,
    color: 'secondary',
    glowColor: 'hsl(274, 73%, 58%)',
    skills: [
      { name: 'Node.js', level: 94, icon: Terminal },
      { name: 'Express.js', level: 93, icon: Server },
      { name: 'MongoDB', level: 92, icon: Database },
      { name: 'PostgreSQL', level: 88, icon: Database },
      { name: 'REST APIs', level: 95, icon: Network },
      { name: 'Microservices', level: 85, icon: Boxes },
    ],
  },
  {
    title: '3D & Graphics',
    icon: Cpu,
    color: 'accent',
    glowColor: 'hsl(152, 100%, 50%)',
    skills: [
      { name: 'Three.js', level: 90, icon: Cube },
      { name: 'WebGL', level: 85, icon: Eye },
      { name: 'React Three Fiber', level: 88, icon: Workflow },
      { name: 'Canvas API', level: 87, icon: Monitor },
      { name: 'GLSL Shaders', level: 80, icon: Code2 },
      { name: '3D Modeling', level: 75, icon: Boxes },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: Cloud,
    color: 'primary',
    glowColor: 'hsl(187, 100%, 47%)',
    skills: [
      { name: 'Docker', level: 85, icon: Boxes },
      { name: 'Git & GitHub', level: 95, icon: GitBranch },
      { name: 'CI/CD Pipeline', level: 82, icon: Workflow },
      { name: 'AWS', level: 80, icon: Cloud },
      { name: 'Vercel & Netlify', level: 92, icon: Globe },
      { name: 'Linux', level: 88, icon: Terminal },
    ],
  },
  {
    title: 'Security & Best Practices',
    icon: Shield,
    color: 'secondary',
    glowColor: 'hsl(274, 73%, 58%)',
    skills: [
      { name: 'JWT Authentication', level: 92, icon: Key },
      { name: 'Encryption', level: 85, icon: Lock },
      { name: 'OWASP', level: 82, icon: Shield },
      { name: 'Code Quality', level: 90, icon: Bug },
      { name: 'Testing', level: 87, icon: Fingerprint },
      { name: 'Security Audits', level: 80, icon: Eye },
    ],
  },
];

const Cube = (props: any) => (
  <Boxes {...props} />
);

interface SkillItemProps {
  skill: {
    name: string;
    level: number;
    icon: any;
  };
  categoryColor: string;
}

const SkillItem = ({ skill, categoryColor }: SkillItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { icon: Icon } = skill;

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      <motion.div
        className="relative p-4 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm overflow-hidden"
        animate={{
          borderColor: isHovered ? 'var(--color)' : 'hsl(230 20% 25%)',
          boxShadow: isHovered
            ? '0 0 30px rgba(0, 238, 255, 0.2)'
            : '0 5px 15px rgba(0, 0, 0, 0.2)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          '--color': categoryColor === 'primary'
            ? 'hsl(187 100% 47%)'
            : categoryColor === 'secondary'
            ? 'hsl(274 73% 58%)'
            : 'hsl(152 100% 50%)',
        } as any}
      >
        {/* Icon */}
        <motion.div
          className="flex items-center justify-center p-2 rounded-lg bg-primary/10 mb-3 w-fit"
          animate={{
            rotateY: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          <Icon className={`w-5 h-5 text-${categoryColor}`} />
        </motion.div>

        {/* Skill Name */}
        <h4 className="font-display text-sm font-bold text-foreground mb-2">
          {skill.name}
        </h4>

        {/* Progress Bar */}
        <div className="relative h-1.5 bg-background/50 rounded-full overflow-hidden border border-primary/10">
          <motion.div
            className={`h-full bg-gradient-to-r from-${categoryColor} via-${categoryColor} to-accent rounded-full`}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            style={{
              background: `linear-gradient(90deg, ${
                categoryColor === 'primary'
                  ? 'hsl(187 100% 47%)'
                  : categoryColor === 'secondary'
                  ? 'hsl(274 73% 58%)'
                  : 'hsl(152 100% 50%)'
              }, hsl(152 100% 50%))`
            }}
          />
        </div>

        {/* Level percentage */}
        <motion.p
          className="text-xs text-muted-foreground mt-2 font-mono"
          animate={{
            opacity: isHovered ? 1 : 0.6,
          }}
        >
          {skill.level}%
        </motion.p>

        {/* Animated border glow */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 border border-primary/20 rounded-xl pointer-events-none"
            animate={{
              boxShadow: [
                `0 0 20px ${categoryColor === 'primary' ? 'hsl(187 100% 47% / 0.3)' : categoryColor === 'secondary' ? 'hsl(274 73% 58% / 0.3)' : 'hsl(152 100% 50% / 0.3)'}`,
                `0 0 40px ${categoryColor === 'primary' ? 'hsl(187 100% 47% / 0.5)' : categoryColor === 'secondary' ? 'hsl(274 73% 58% / 0.5)' : 'hsl(152 100% 50% / 0.5)'}`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

interface SkillCategoryProps {
  category: typeof skillCategories[0];
  index: number;
}

const SkillCategory = ({ category, index }: SkillCategoryProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { icon: Icon } = category;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Category Header */}
      <motion.div
        className="mb-6 flex items-center gap-4"
        whileHover={{ x: 4 }}
      >
        <motion.div
          className={`p-3 rounded-lg bg-${category.color}/10 border border-${category.color}/30`}
          animate={{
            rotate: isInView ? 360 : 0,
            boxShadow: `0 0 30px ${category.glowColor}40`,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <Icon className={`w-6 h-6 text-${category.color}`} />
        </motion.div>
        <div>
          <h3 className={`text-lg font-display font-bold text-${category.color}`}>
            {category.title}
          </h3>
          <p className="text-xs text-muted-foreground font-mono">
            {category.skills.length} Skills
          </p>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: (index * 0.1) + (skillIndex * 0.05),
              type: 'spring',
              stiffness: 100,
            }}
          >
            <SkillItem skill={skill} categoryColor={category.color} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills3DSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section ref={containerRef} id="skills" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '120px' } : {}}
            transition={{ duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
          />

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Technical{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Comprehensive skill set across frontend, backend, 3D graphics, and DevOps with focus on modern technologies and best practices.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    </section>
  );
};

export default Skills3DSection;
