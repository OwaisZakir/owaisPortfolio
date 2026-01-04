import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, Trophy } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Cybersecurity Trainer',
    company: 'Tech Academy',
    location: 'Remote',
    period: '2023 - Present',
    description: 'Leading comprehensive cybersecurity training programs, teaching ethical hacking, penetration testing, and security best practices to over 100+ students.',
    achievements: ['Developed curriculum for 5 courses', 'Trained 100+ professionals', '95% student satisfaction rate'],
    icon: Briefcase,
    color: 'primary',
  },
  {
    type: 'work',
    title: 'Lead Developer & Project Manager',
    company: 'Various Projects',
    location: 'Hybrid',
    period: '2022 - Present',
    description: 'Managing cross-functional development teams, architecting MERN stack applications, and ensuring on-time delivery of complex software projects.',
    achievements: ['Led 10+ successful projects', 'Managed teams of 5-8 developers', 'Implemented Agile methodologies'],
    icon: Briefcase,
    color: 'secondary',
  },
  {
    type: 'achievement',
    title: 'Hackathon Champion',
    company: 'Multiple Events',
    location: 'Various',
    period: '2022 - 2024',
    description: 'Won multiple hackathons leading innovative teams to develop cutting-edge solutions in cybersecurity and web development.',
    achievements: ['5+ First Place Wins', 'Led winning teams', 'Built security-focused solutions'],
    icon: Trophy,
    color: 'accent',
  },
  {
    type: 'education',
    title: 'Software Engineering',
    company: 'University',
    location: 'Campus',
    period: '2021 - 2025',
    description: 'Final-year student specializing in software engineering with focus on secure application development and system architecture.',
    achievements: ['Dean\'s List', 'Research in Security', 'Final Year Project Lead'],
    icon: GraduationCap,
    color: 'primary',
  },
];

const ExperienceCard = ({ experience, index, isLeft }: { experience: typeof experiences[0]; index: number; isLeft: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const colorClasses = {
    primary: {
      bg: 'bg-primary/10',
      border: 'border-primary/30',
      text: 'text-primary',
      glow: 'group-hover:shadow-[0_0_30px_hsl(187_100%_47%/0.3)]',
    },
    secondary: {
      bg: 'bg-secondary/10',
      border: 'border-secondary/30',
      text: 'text-secondary',
      glow: 'group-hover:shadow-[0_0_30px_hsl(274_73%_58%/0.3)]',
    },
    accent: {
      bg: 'bg-accent/10',
      border: 'border-accent/30',
      text: 'text-accent',
      glow: 'group-hover:shadow-[0_0_30px_hsl(152_100%_50%/0.3)]',
    },
  };

  const colors = colorClasses[experience.color as keyof typeof colorClasses];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} mb-8 md:mb-0`}
    >
      {/* Timeline dot - visible on larger screens */}
      <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 ${colors.bg} ${colors.border} border-2 rounded-full z-10`}>
        <div className={`absolute inset-1 ${colors.bg} rounded-full animate-pulse`} />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`group w-full md:w-[calc(50%-40px)] cyber-card p-6 ${colors.bg} ${colors.border} ${colors.glow} transition-shadow duration-300`}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 ${colors.bg} ${colors.border} border rounded-lg`}>
            <experience.icon className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold">{experience.title}</h3>
            <p className={`${colors.text} font-semibold`}>{experience.company}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {experience.period}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {experience.location}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {experience.description}
        </p>

        {/* Achievements */}
        <div className="flex flex-wrap gap-2">
          {experience.achievements.map((achievement) => (
            <span
              key={achievement}
              className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-mono ${colors.bg} ${colors.text} rounded border ${colors.border}`}
            >
              <Award className="w-3 h-3" />
              {achievement}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden bg-muted/20">
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
            <span className="text-foreground">EXPERIENCE &</span>{' '}
            <span className="text-primary neon-text">ACHIEVEMENTS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A timeline of growth, leadership, and innovation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line - visible on md and up */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {/* Experience Cards */}
          <div className="space-y-8 md:space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.title}
                experience={experience}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hidden md:flex justify-center mt-8"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-full animate-pulse-glow" />
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
