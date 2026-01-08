import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Shield,
  Code2,
  Users,
  Trophy,
  GraduationCap,
  Zap,
  Star,
  Target,
  Rocket,
  Award,
} from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'MERN Stack Developer',
    description: 'Building scalable full-stack applications with React, Node.js, MongoDB, and Express.',
    color: 'hsl(187, 100%, 47%)',
    stats: '65+ Projects',
  },
  {
    icon: Shield,
    title: 'Security-First Approach',
    description: 'Cisco Certified in Cybersecurity with expertise in secure architecture and best practices.',
    color: 'hsl(274, 73%, 58%)',
    stats: 'Certified',
  },
  {
    icon: Users,
    title: 'ERP & POS Solutions',
    description: 'Designing and integrating comprehensive business systems for startups and enterprises.',
    color: 'hsl(152, 100%, 50%)',
    stats: 'Enterprise Scale',
  },
  {
    icon: Trophy,
    title: 'Business-First Mindset',
    description: 'Every line of code contributes to real-world business impact and scalability.',
    color: 'hsl(187, 100%, 47%)',
    stats: 'Production Ready',
  },
];

const stats = [
  { value: '65+', label: 'GitHub Repositories', icon: Rocket, color: 'hsl(187, 100%, 47%)' },
  { value: '500+', label: 'LinkedIn Connections', icon: Star, color: 'hsl(274, 73%, 58%)' },
  { value: '9', label: 'Months at Suffah Tech', icon: Target, color: 'hsl(152, 100%, 50%)' },
  { value: '5', label: 'Certifications', icon: Award, color: 'hsl(187, 100%, 47%)' },
];

interface HighlightCardProps {
  icon: typeof Shield;
  title: string;
  description: string;
  color: string;
  stats: string;
  index: number;
}

const HighlightCard = ({ icon: Icon, title, description, color, stats, index }: HighlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 15);
    mouseY.set((rect.top + rect.height / 2 - e.clientY) / 15);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 45 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
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
        className="cyber-card p-6 h-full relative overflow-hidden"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          borderColor: color,
          boxShadow: `0 0 40px ${color}30, inset 0 0 30px ${color}10`,
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${isHovered ? '50%' : '0%'} ${isHovered ? '50%' : '0%'}, ${color}15, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative inline-flex p-4 rounded-xl mb-4"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}30`,
          }}
          animate={isHovered ? { rotate: 360, scale: 1.1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Icon size={28} style={{ color }} />
          
          {/* Orbiting particle */}
          {isHovered && (
            <motion.div
              className="absolute w-2 h-2 rounded-full"
              style={{ background: color, top: '50%', left: '50%' }}
              animate={{
                rotate: 360,
                x: [0, 30, 0, -30, 0],
                y: [-30, 0, 30, 0, -30],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </motion.div>

        {/* Content */}
        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Stats badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}30`,
            color,
          }}
          animate={isHovered ? { scale: 1.05 } : {}}
        >
          <Zap size={12} />
          {stats}
        </motion.div>

        {/* Corner decoration */}
        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${color} 50%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

interface StatCardProps {
  value: string;
  label: string;
  icon: typeof Rocket;
  color: string;
  index: number;
}

const StatCard = ({ value, label, icon: Icon, color, index }: StatCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-center p-6 border border-border/50 rounded-xl bg-card/30 backdrop-blur-sm cursor-pointer group overflow-hidden"
      whileHover={{
        borderColor: color,
        boxShadow: `0 0 30px ${color}20`,
        y: -5,
      }}
    >
      {/* Background pulse */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{ background: `radial-gradient(circle, ${color}10, transparent 70%)` }}
        animate={isHovered ? { scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Icon */}
      <motion.div
        className="relative mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        animate={isHovered ? { rotate: 360 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Icon size={20} style={{ color }} />
      </motion.div>

      {/* Value */}
      <motion.div
        className="font-display text-3xl md:text-4xl font-bold mb-2"
        style={{ color }}
        animate={isHovered ? { scale: 1.1 } : {}}
      >
        {value}
      </motion.div>

      {/* Label */}
      <div className="font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{ scale: { duration: 8, repeat: Infinity }, rotate: { duration: 60, repeat: Infinity, ease: 'linear' } }}
      />

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
            <span className="text-foreground">ABOUT</span>{' '}
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
              ME
            </motion.span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover the passion and expertise behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Education Badge */}
            <motion.div
              className="inline-flex items-center gap-4 p-4 rounded-xl border border-primary/30 bg-primary/5 backdrop-blur-sm"
              whileHover={{ scale: 1.02, borderColor: 'hsl(187 100% 47% / 0.6)' }}
            >
              <motion.div
                className="p-3 bg-primary/10 border border-primary/30 rounded-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <GraduationCap className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-display text-lg font-semibold">Final Year Student</h3>
                <p className="text-muted-foreground text-sm">Software Engineering</p>
              </div>
            </motion.div>

            <p className="text-foreground text-lg leading-relaxed">
              I'm a passionate technologist who lives at the intersection of
              <motion.span
                className="text-primary font-semibold mx-1"
                whileHover={{ scale: 1.1 }}
              >
                development
              </motion.span>
              and
              <motion.span
                className="text-secondary font-semibold mx-1"
                whileHover={{ scale: 1.1 }}
              >
                security
              </motion.span>.
              With a deep understanding of both building and breaking systems,
              I bring a unique perspective to every project.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              As a final-year Software Engineering student, I've dedicated myself to mastering
              the MERN stack while simultaneously developing expertise in cybersecurity.
              This dual focus allows me to create applications that are not only functional
              and beautiful but also inherently secure.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond coding, I thrive in leadership roles—managing teams, mentoring developers,
              and driving projects from concept to deployment. My hackathon victories are a
              testament to my ability to innovate under pressure and deliver results.
            </p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {[
                { text: 'Always learning', icon: Zap, color: 'hsl(152, 100%, 50%)' },
                { text: 'Building the future', icon: Code2, color: 'hsl(187, 100%, 47%)' },
                { text: 'Security first', icon: Shield, color: 'hsl(274, 73%, 58%)' },
              ].map((tag, i) => (
                <motion.div
                  key={tag.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border"
                  style={{ borderColor: `${tag.color}50`, background: `${tag.color}10` }}
                  whileHover={{ scale: 1.05, borderColor: tag.color }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <tag.icon size={14} style={{ color: tag.color }} />
                  <span className="font-mono text-sm" style={{ color: tag.color }}>
                    {tag.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <HighlightCard key={item.title} {...item} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
