import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Database, Server, Globe, Shield, GitBranch, Cloud,
  Boxes, Lock, Terminal, Cpu, Layers, Workflow
} from 'lucide-react';

const skillCategories = [
  {
    title: 'MERN Stack',
    icon: Layers,
    color: 'primary',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'React.js', level: 95 },
      { name: 'Node.js', level: 92 },
    ],
  },
  {
    title: 'Cybersecurity',
    icon: Shield,
    color: 'secondary',
    skills: [
      { name: 'Penetration Testing', level: 85 },
      { name: 'Network Security', level: 88 },
      { name: 'Ethical Hacking', level: 90 },
      { name: 'Security Auditing', level: 82 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: Cloud,
    color: 'accent',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'Git/GitHub', level: 95 },
      { name: 'CI/CD', level: 78 },
    ],
  },
  {
    title: 'Leadership',
    icon: Workflow,
    color: 'primary',
    skills: [
      { name: 'Project Management', level: 92 },
      { name: 'Team Leadership', level: 90 },
      { name: 'Agile/Scrum', level: 88 },
      { name: 'Mentoring', level: 85 },
    ],
  },
];

const techIcons = [
  { Icon: Database, label: 'MongoDB', color: 'text-accent' },
  { Icon: Server, label: 'Node.js', color: 'text-primary' },
  { Icon: Globe, label: 'React', color: 'text-primary' },
  { Icon: Shield, label: 'Security', color: 'text-secondary' },
  { Icon: GitBranch, label: 'Git', color: 'text-accent' },
  { Icon: Cloud, label: 'AWS', color: 'text-primary' },
  { Icon: Boxes, label: 'Docker', color: 'text-primary' },
  { Icon: Lock, label: 'Encryption', color: 'text-secondary' },
  { Icon: Terminal, label: 'CLI', color: 'text-accent' },
  { Icon: Cpu, label: 'Systems', color: 'text-primary' },
];

const SkillBar = ({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
  };

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-mono text-sm text-foreground">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${colorClasses[color as keyof typeof colorClasses]} progress-glow`}
        />
      </div>
    </div>
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
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

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
            animate={isInView ? { width: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
          />
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">SKILLS &</span>{' '}
            <span className="text-primary neon-text">EXPERTISE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit for building secure, scalable applications
          </p>
        </motion.div>

        {/* Floating Tech Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {techIcons.map(({ Icon, label, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.2, y: -5 }}
              className={`p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer group`}
            >
              <Icon className={`w-6 h-6 ${color} group-hover:scale-110 transition-transform`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 font-display text-sm uppercase tracking-wider rounded-lg transition-all ${
                activeCategory === index
                  ? 'bg-primary text-primary-foreground neon-border'
                  : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border hover:border-primary/30'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="cyber-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const CategoryIcon = skillCategories[activeCategory].icon;
                return <CategoryIcon className={`w-8 h-8 text-${skillCategories[activeCategory].color}`} />;
              })()}
              <h3 className="font-display text-2xl font-bold">{skillCategories[activeCategory].title}</h3>
            </div>
            <div className="space-y-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skillCategories[activeCategory].color}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Visual Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col justify-center gap-6"
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-muted"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${skill.level * 1.76} 176`}
                        initial={{ strokeDasharray: '0 176' }}
                        animate={{ strokeDasharray: `${skill.level * 1.76} 176` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`text-${skillCategories[activeCategory].color}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-xs font-bold">{skill.level}%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold">{skill.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
