import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Shield, Code2, Trophy, Globe } from 'lucide-react';

const projects = [
  {
    title: 'SecureVault',
    description: 'End-to-end encrypted password manager with zero-knowledge architecture. Features biometric authentication and secure sharing.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Encryption'],
    category: 'security',
    featured: true,
    github: '#',
    demo: '#',
    hackathon: true,
  },
  {
    title: 'ThreatHunter',
    description: 'Real-time network monitoring and threat detection system with ML-powered anomaly detection.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop',
    tags: ['Python', 'TensorFlow', 'React', 'Docker'],
    category: 'security',
    featured: true,
    github: '#',
    demo: '#',
    hackathon: true,
  },
  {
    title: 'DevCollab',
    description: 'Real-time collaborative coding platform with integrated video chat and code review features.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    tags: ['React', 'Socket.io', 'WebRTC', 'Express'],
    category: 'web',
    featured: false,
    github: '#',
    demo: '#',
  },
  {
    title: 'CryptoTracker',
    description: 'Cryptocurrency portfolio tracker with real-time prices, alerts, and advanced analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=500&fit=crop',
    tags: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
    category: 'web',
    featured: false,
    github: '#',
    demo: '#',
  },
  {
    title: 'PenTest Toolkit',
    description: 'Automated penetration testing framework with comprehensive reporting and vulnerability scanning.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
    tags: ['Python', 'Bash', 'Docker', 'Security'],
    category: 'security',
    featured: false,
    github: '#',
    demo: '#',
  },
  {
    title: 'TeamSync',
    description: 'Project management platform with Kanban boards, time tracking, and team analytics.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    tags: ['MERN Stack', 'Redux', 'Socket.io'],
    category: 'web',
    featured: false,
    github: '#',
    demo: '#',
  },
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Globe },
  { id: 'web', label: 'Web Apps', icon: Code2 },
  { id: 'security', label: 'Security', icon: Shield },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`group relative cyber-card overflow-hidden ${project.featured ? 'md:col-span-2' : ''}`}
    >
      {/* Hackathon Badge */}
      {project.hackathon && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1 bg-accent/20 border border-accent/50 rounded-full backdrop-blur-sm">
          <Trophy className="w-3 h-3 text-accent" />
          <span className="font-mono text-xs text-accent">Hackathon Winner</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Overlay Links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.demo}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-primary text-primary-foreground rounded-full"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono bg-muted/50 text-muted-foreground rounded border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

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
            <span className="text-foreground">FEATURED</span>{' '}
            <span className="text-primary neon-text">PROJECTS</span>
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
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 font-display text-sm uppercase tracking-wider rounded-lg transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground neon-border'
                  : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border hover:border-primary/30'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 font-display text-sm uppercase tracking-wider border border-primary/50 text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            <Github className="w-4 h-4" />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
