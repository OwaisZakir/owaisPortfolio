import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Filter, Zap } from 'lucide-react';
import Card3D from './3DPortfolioCard';

const projects = [
  {
    title: 'StackWisdom',
    description: 'CSS-Tricks inspired platform for AI, Full-Stack dev articles, tips, and teaching content. Features multi-role auth, admin panel, MDX support, i18n, and dark mode.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'MDX'],
    category: 'web',
    featured: true,
    github: 'https://github.com/OwaisZakir/StackWisdom-FrontEnd',
    demo: 'https://github.com/OwaisZakir/StackWisdom-FrontEnd',
  },
  {
    title: 'Bahar-e-Madinah ERP',
    description: 'Comprehensive ERP system for educational institutions. Full-featured frontend with student/class management, exams, and attendance tracking.',
    image: 'https://images.unsplash.com/photo-1560264357-8d9766626b6f?w=800&h=500&fit=crop',
    tags: ['React', 'Vite', 'Redux Toolkit', 'Ant Design', 'TypeScript'],
    category: 'web',
    featured: true,
    github: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
    demo: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
  },
  {
    title: 'School Management System Backend',
    description: 'Scalable backend for multi-role educational management. Handles student data, classes, attendance, exam records with RBAC and security.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API'],
    category: 'backend',
    featured: false,
    github: 'https://github.com/OwaisZakir/School-Management-System-Backend',
    demo: 'https://github.com/OwaisZakir/School-Management-System-Backend',
  },
  {
    title: 'Auth System Boilerplate',
    description: 'Simple and secure JWT authentication API with registration, login, protected routes, and Postman testing. Production-ready starter template.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop',
    tags: ['Node.js', 'Express', 'MongoDB', 'bcrypt', 'JWT'],
    category: 'backend',
    featured: false,
    github: 'https://github.com/OwaisZakir/auth-system-boilerplate',
    demo: 'https://github.com/OwaisZakir/auth-system-boilerplate',
  },
  {
    title: 'Advanced Uber Microservices',
    description: 'Advanced Uber-style Ride Hailing Backend with microservices architecture. Real-time, scalable backend for learning complex distributed systems.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    tags: ['Node.js', 'Microservices', 'Real-time', 'Scalable', 'WebSocket'],
    category: 'backend',
    featured: false,
    github: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
    demo: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
  },
  {
    title: 'Cyber Journey Interactive',
    description: 'Interactive cybersecurity learning platform with hands-on exercises and real-world scenarios. Built with TypeScript for type safety.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop',
    tags: ['TypeScript', 'React', 'Interactive', 'Security', 'Education'],
    category: 'web',
    featured: false,
    github: 'https://github.com/OwaisZakir/cyber-journey-interactive',
    demo: 'https://github.com/OwaisZakir/cyber-journey-interactive',
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Apps' },
  { id: 'backend', label: 'Backend' },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'all' || project.category === activeCategory
  );

  // Parallax effect for background
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const headerScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent pointer-events-none"
        style={{ y: bgY }}
      />

      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(0deg, hsl(187 100% 47% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(187 100% 47% / 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with gradient text */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          style={{ scale: headerScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-6 h-6 text-accent" />
            </motion.div>
            <span className="font-mono text-sm text-primary uppercase tracking-widest">
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            <span className="text-foreground">Showcase of</span>{' '}
            <motion.span
              animate={{
                backgroundImage: [
                  'linear-gradient(90deg, hsl(187 100% 47%), hsl(274 73% 58%))',
                  'linear-gradient(90deg, hsl(274 73% 58%), hsl(152 100% 50%))',
                  'linear-gradient(90deg, hsl(152 100% 50%), hsl(187 100% 47%))',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Digital Excellence
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Production-ready applications spanning full-stack development, microservices architecture, and interactive experiences
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16 md:mb-20"
        >
          <Filter className="w-5 h-5 text-muted-foreground mr-2" />
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-lg font-mono text-sm uppercase tracking-wide transition-all border ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary/60 shadow-[0_0_20px_rgba(0,238,255,0.3)]'
                  : 'bg-background border-primary/20 text-primary/60 hover:border-primary/40 hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={project.featured ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <Card3D
                {...project}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/OwaisZakir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-foreground font-display font-bold text-lg rounded-xl hover:shadow-[0_0_40px_rgba(0,238,255,0.4)] transition-all border border-primary/60"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 40px rgba(0, 238, 255, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore All Projects on GitHub</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { label: 'Projects Completed', value: projects.length },
            { label: 'Featured Projects', value: projects.filter(p => p.featured).length },
            { label: 'Technologies Used', value: new Set(projects.flatMap(p => p.tags)).size },
            { label: 'Client Satisfaction', value: '100%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm hover:border-primary/40 transition-all"
              whileHover={{
                borderColor: 'hsl(187 100% 47% / 0.6)',
                boxShadow: '0 0 20px rgba(0, 238, 255, 0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-primary mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-muted-foreground font-mono">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
