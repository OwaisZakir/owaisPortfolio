import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, ExternalLink, Zap } from 'lucide-react';

const projects = [
  {
    title: 'StackWisdom',
    description: 'CSS-Tricks inspired platform with MDX support, admin panel, and dark mode.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    tags: ['Next.js', 'React', 'TypeScript'],
    github: 'https://github.com/OwaisZakir/StackWisdom-FrontEnd',
    demo: 'https://github.com/OwaisZakir/StackWisdom-FrontEnd',
    featured: true,
  },
  {
    title: 'Bahar-e-Madinah ERP',
    description: 'Comprehensive ERP system for educational institutions with real-time features.',
    image: 'https://images.unsplash.com/photo-1560264357-8d9766626b6f?w=600&h=400&fit=crop',
    tags: ['React', 'Redux', 'Ant Design'],
    github: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
    demo: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
    featured: true,
  },
  {
    title: 'School Management Backend',
    description: 'Scalable backend for multi-role educational management with RBAC.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    tags: ['Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/OwaisZakir/School-Management-System-Backend',
    demo: 'https://github.com/OwaisZakir/School-Management-System-Backend',
  },
  {
    title: 'Auth System Boilerplate',
    description: 'Production-ready JWT authentication API with secure practices.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    tags: ['Node.js', 'JWT', 'bcrypt'],
    github: 'https://github.com/OwaisZakir/auth-system-boilerplate',
    demo: 'https://github.com/OwaisZakir/auth-system-boilerplate',
  },
  {
    title: 'Advanced Uber Microservices',
    description: 'Uber-style ride hailing backend with microservices architecture.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    tags: ['Node.js', 'Microservices', 'Real-time'],
    github: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
    demo: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
  },
  {
    title: 'Cyber Journey Interactive',
    description: 'Interactive cybersecurity learning platform with hands-on exercises.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    tags: ['React', 'TypeScript', 'Security'],
    github: 'https://github.com/OwaisZakir/cyber-journey-interactive',
    demo: 'https://github.com/OwaisZakir/cyber-journey-interactive',
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl border border-primary/20 hover:border-primary/60 transition-all duration-300 bg-background/50 hover:bg-background/80 backdrop-blur-sm"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? 'brightness(1.1)' : 'brightness(0.9)',
          }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono bg-primary/10 text-primary/80 rounded border border-primary/20 group-hover:border-primary/40 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono bg-primary/10 hover:bg-primary/20 text-primary rounded border border-primary/20 hover:border-primary/60 transition-all"
              aria-label="GitHub"
            >
              <Github size={14} />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono bg-accent/10 hover:bg-accent/20 text-accent rounded border border-accent/20 hover:border-accent/60 transition-all"
              aria-label="View Demo"
            >
              <ExternalLink size={14} />
              View
            </a>
          )}
        </div>
      </div>

      {/* Hover glow */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 border border-primary/30 rounded-xl pointer-events-none"
          animate={{ boxShadow: ['0 0 20px rgba(0, 238, 255, 0.2)', '0 0 40px rgba(0, 238, 255, 0.4)'] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} id="projects" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{ y: bgY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-xs font-mono text-primary uppercase tracking-widest">
              Featured Projects
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Showcase of{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Digital Excellence
            </span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Production-ready applications and solutions across full-stack development and system design
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/OwaisZakir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/60 rounded-lg font-mono text-sm transition-all hover:translate-y-[-2px]"
          >
            <span>View All Projects on GitHub</span>
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
