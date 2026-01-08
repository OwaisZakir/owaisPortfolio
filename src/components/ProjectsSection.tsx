import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Shield, Code2, Trophy, Globe, Star, Zap } from 'lucide-react';

const projects = [
  {
    title: 'StackWisdom',
    description: 'CSS-Tricks inspired platform for AI, Full-Stack dev articles, tips, and teaching content. Features multi-role auth, admin panel, MDX support, i18n, and dark mode.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    category: 'web',
    featured: true,
    github: 'https://github.com/OwaisZakir/StackWisdom-FrontEnd',
    demo: 'https://github.com/OwaisZakir/StackWisdom-FrontEnd',
  },
  {
    title: 'Bahar-e-Madinah ERP',
    description: 'Comprehensive ERP system for educational institutions. Full-featured frontend with student/class management, exams, and attendance tracking.',
    image: 'https://images.unsplash.com/photo-1560264357-8d9766626b6f?w=800&h=500&fit=crop',
    tags: ['React', 'Vite', 'Redux Toolkit', 'Ant Design'],
    category: 'web',
    featured: true,
    github: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
    demo: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
  },
  {
    title: 'School Management System Backend',
    description: 'Scalable backend for multi-role educational management. Handles student data, classes, attendance, exam records with RBAC and security.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
    category: 'web',
    featured: false,
    github: 'https://github.com/OwaisZakir/School-Management-System-Backend',
    demo: 'https://github.com/OwaisZakir/School-Management-System-Backend',
  },
  {
    title: 'Auth System Boilerplate',
    description: 'Simple and secure JWT authentication API with registration, login, protected routes, and Postman testing. Production-ready starter template.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop',
    tags: ['Node.js', 'Express', 'MongoDB', 'bcrypt'],
    category: 'web',
    featured: false,
    github: 'https://github.com/OwaisZakir/auth-system-boilerplate',
    demo: 'https://github.com/OwaisZakir/auth-system-boilerplate',
  },
  {
    title: 'Advanced Uber Microservices',
    description: 'Advanced Uber-style Ride Hailing Backend with microservices architecture. Real-time, scalable backend for learning complex distributed systems.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    tags: ['Node.js', 'Microservices', 'Real-time', 'Scalable'],
    category: 'web',
    featured: false,
    github: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
    demo: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
  },
  {
    title: 'Cyber Journey Interactive',
    description: 'Interactive cybersecurity learning platform with hands-on exercises and real-world scenarios. Built with TypeScript for type safety.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop',
    tags: ['TypeScript', 'React', 'Interactive', 'Security'],
    category: 'web',
    featured: false,
    github: 'https://github.com/OwaisZakir/cyber-journey-interactive',
    demo: 'https://github.com/OwaisZakir/cyber-journey-interactive',
  },
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Globe, color: 'hsl(187, 100%, 47%)' },
  { id: 'web', label: 'Web Apps', icon: Code2, color: 'hsl(152, 100%, 50%)' },
  { id: 'security', label: 'Security', icon: Shield, color: 'hsl(274, 73%, 58%)' },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 25);
    mouseY.set((rect.top + rect.height / 2 - e.clientY) / 25);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className={`group relative cursor-pointer ${project.featured ? 'md:col-span-2' : ''}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="cyber-card overflow-hidden h-full"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          boxShadow: '0 0 50px hsl(187 100% 47% / 0.2)',
        }}
      >
        {/* Hackathon Badge */}
        {project.hackathon && (
          <motion.div
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 border border-accent/50 rounded-full backdrop-blur-sm"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Trophy className="w-3.5 h-3.5 text-accent" />
            </motion.div>
            <span className="font-mono text-xs text-accent font-semibold">Winner</span>
          </motion.div>
        )}

        {/* Image with 3D effect and lazy loading */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-muted animate-pulse">
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? 'brightness(0.7)' : 'brightness(0.9)',
            }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

          {/* Overlay with animated grid */}
          <motion.div
            className="absolute inset-0 cyber-grid opacity-0 group-hover:opacity-20 transition-opacity"
            animate={isHovered ? { backgroundPosition: ['0% 0%', '100% 100%'] } : {}}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Overlay Links */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.github}
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-background/90 backdrop-blur-sm rounded-xl text-foreground hover:text-primary transition-colors border border-border"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.demo}
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-primary text-primary-foreground rounded-xl"
              style={{
                boxShadow: '0 0 20px hsl(187 100% 47% / 0.5)',
              }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Floating particles on hover */}
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, -30],
                    x: [0, (Math.random() - 0.5) * 40],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{ left: `${20 + i * 30}%`, bottom: '100%' }}
                />
              ))}
            </>
          )}

          <motion.h3
            className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2"
            style={{ transform: 'translateZ(20px)' }}
          >
            {project.title}
            {project.featured && (
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Star className="w-4 h-4 text-accent fill-accent" />
              </motion.div>
            )}
          </motion.h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + tagIndex * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-2.5 py-1 text-xs font-mono bg-muted/50 text-muted-foreground rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom glow effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, hsl(187 100% 47%), hsl(274 73% 58%), hsl(152 100% 50%))',
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <motion.div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 12, repeat: Infinity }}
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
            <span className="text-foreground">FEATURED</span>{' '}
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
              PROJECTS
            </motion.span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Showcasing innovative solutions in web development and cybersecurity
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.div key={category.id} className="relative">
              <motion.button
                onClick={() => setActiveCategory(category.id)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-3 font-display text-sm uppercase tracking-wider rounded-xl transition-all duration-300 relative ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border hover:border-primary/30'
                }`}
                style={{
                  boxShadow:
                    activeCategory === category.id
                      ? `0 0 30px ${category.color}50`
                      : 'none',
                }}
              >
                <motion.div
                  animate={activeCategory === category.id ? { rotate: 360 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <category.icon className="w-4 h-4" />
                </motion.div>
                {category.label}
              </motion.button>

              {/* Animated underline for active state */}
              {activeCategory === category.id && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px hsl(187 100% 47% / 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 font-display text-sm uppercase tracking-wider border-2 border-primary/50 text-primary rounded-xl hover:bg-primary/10 transition-colors group"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Github className="w-5 h-5" />
            </motion.div>
            <span>View All on GitHub</span>
            <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
