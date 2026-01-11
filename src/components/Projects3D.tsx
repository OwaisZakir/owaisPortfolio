import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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
    color: 'from-primary to-secondary',
  },
  {
    title: 'Bahar-e-Madinah ERP',
    description: 'Comprehensive ERP system for educational institutions with real-time features.',
    image: 'https://images.unsplash.com/photo-1560264357-8d9766626b6f?w=600&h=400&fit=crop',
    tags: ['React', 'Redux', 'Ant Design'],
    github: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
    demo: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
    featured: true,
    color: 'from-secondary to-accent',
  },
  {
    title: 'School Management Backend',
    description: 'Scalable backend for multi-role educational management with RBAC.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    tags: ['Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/OwaisZakir/School-Management-System-Backend',
    demo: 'https://github.com/OwaisZakir/School-Management-System-Backend',
    color: 'from-accent to-primary',
  },
  {
    title: 'Auth System Boilerplate',
    description: 'Production-ready JWT authentication API with secure practices.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    tags: ['Node.js', 'JWT', 'bcrypt'],
    github: 'https://github.com/OwaisZakir/auth-system-boilerplate',
    demo: 'https://github.com/OwaisZakir/auth-system-boilerplate',
    color: 'from-primary to-accent',
  },
  {
    title: 'Advanced Uber Microservices',
    description: 'Uber-style ride hailing backend with microservices architecture.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    tags: ['Node.js', 'Microservices', 'Real-time'],
    github: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
    demo: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
    color: 'from-secondary to-primary',
  },
  {
    title: 'Cyber Journey Interactive',
    description: 'Interactive cybersecurity learning platform with hands-on exercises.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    tags: ['React', 'TypeScript', 'Security'],
    github: 'https://github.com/OwaisZakir/cyber-journey-interactive',
    demo: 'https://github.com/OwaisZakir/cyber-journey-interactive',
    color: 'from-accent to-secondary',
  },
];

interface Project3DCardProps {
  project: typeof projects[0];
  index: number;
  mousePosition: { x: number; y: number };
}

const Project3DCard = ({ project, index, mousePosition }: Project3DCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = (e.clientY - rect.top - centerY) / 10;
    const y = (e.clientX - rect.left - centerX) / -10;

    setCardRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setCardRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: cardRotation.x,
        rotateY: cardRotation.y,
      }}
      className="group relative h-full"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-primary/20 hover:border-primary/60 transition-all duration-300 bg-background/50 hover:bg-background/80 backdrop-blur-sm h-full flex flex-col"
        animate={{
          boxShadow: isHovered
            ? '0 20px 60px rgba(0, 238, 255, 0.3), 0 0 40px rgba(157, 78, 221, 0.2)'
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container with 3D effect */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? 'brightness(1.2) contrast(1.1)' : 'brightness(0.9)',
            }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          {/* Floating badge */}
          <motion.div
            className={`absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.color} text-white font-mono text-xs font-bold`}
            animate={{
              y: isHovered ? -5 : 0,
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.featured ? 'Featured' : 'Project'}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex-grow flex flex-col">
          {/* Title */}
          <motion.h3
            className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors"
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono bg-primary/10 text-primary/80 rounded border border-primary/20 group-hover:border-primary/40 transition-all"
                whileHover={{ scale: 1.1, translateY: -2 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex gap-3"
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono bg-primary/10 hover:bg-primary/20 text-primary rounded border border-primary/20 hover:border-primary/60 transition-all"
                aria-label="GitHub"
              >
                <Github size={14} />
                Code
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono bg-accent/10 hover:bg-accent/20 text-accent rounded border border-accent/20 hover:border-accent/60 transition-all"
                aria-label="View Demo"
              >
                <ExternalLink size={14} />
                View
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Hover glow effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 border-2 border-primary/30 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 238, 255, 0.2)',
                '0 0 40px rgba(0, 238, 255, 0.4)',
                '0 0 20px rgba(0, 238, 255, 0.2)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(0, 238, 255, 0.1) 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
          }}
          animate={isHovered ? {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

interface Projects3DProps {
  sectionRef?: React.RefObject<HTMLElement>;
}

const Projects3D = ({ sectionRef }: Projects3DProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const internalRef = useRef<HTMLElement>(null);
  const ref = sectionRef || internalRef;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} id="projects" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{ y: bgY }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
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
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
          />

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

        {/* Projects Grid with 3D effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Project3DCard
              key={project.title}
              project={project}
              index={index}
              mousePosition={mousePosition}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/OwaisZakir"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 hover:from-primary/20 hover:via-secondary/20 hover:to-accent/20 text-primary border border-primary/30 hover:border-primary/60 rounded-lg font-mono text-sm transition-all"
          >
            <span>View All Projects on GitHub</span>
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects3D;
