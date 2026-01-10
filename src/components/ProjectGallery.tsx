import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'StackWisdom',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop',
    description: 'CSS-Tricks inspired platform with MDX support, dark mode, and multi-role auth',
    tags: ['Next.js', 'React', 'TypeScript'],
    github: 'https://github.com/OwaisZakir/StackWisdom-FrontEnd',
    demo: 'https://github.com/OwaisZakir/StackWisdom-FrontEnd',
  },
  {
    id: 2,
    title: 'Bahar-e-Madinah ERP',
    image: 'https://images.unsplash.com/photo-1560264357-8d9766626b6f?w=1200&h=800&fit=crop',
    description: 'Comprehensive ERP system for educational institutions with real-time updates',
    tags: ['React', 'Redux', 'Ant Design'],
    github: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
    demo: 'https://github.com/OwaisZakir/bahar-e-madinah-frontend',
  },
  {
    id: 3,
    title: 'Advanced Uber Microservices',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    description: 'Microservices architecture for ride-hailing platform with real-time features',
    tags: ['Node.js', 'Microservices', 'WebSocket'],
    github: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
    demo: 'https://github.com/OwaisZakir/Advance-Backend-Microservices-Uber-Project',
  },
];

interface GalleryItemProps {
  project: typeof projects[0];
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const GalleryItem = ({ project, isSelected, onSelect }: GalleryItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });

  return (
    <motion.div
      ref={ref}
      onClick={() => onSelect(project.id)}
      className="group relative cursor-pointer h-64 md:h-96 overflow-hidden rounded-2xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Image container */}
      <div className="relative w-full h-full overflow-hidden bg-muted">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isSelected ? 1.1 : 1,
            filter: isSelected ? 'brightness(1.1)' : 'brightness(0.8)',
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          animate={{
            opacity: isSelected ? 1 : 0.6,
          }}
        />

        {/* Content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
          animate={{
            y: isSelected ? 0 : 20,
          }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            animate={{
              color: isSelected ? 'hsl(187 100% 47%)' : 'white',
            }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-sm md:text-base text-gray-200 mb-4 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isSelected ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isSelected ? 1 : 0, y: isSelected ? 0 : 10 }}
            transition={{ delay: 0.2 }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono bg-primary/30 text-primary rounded-full border border-primary/60"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Border effect on hover */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/0 rounded-2xl"
          animate={{
            borderColor: isSelected
              ? 'hsl(187 100% 47%)'
              : 'hsl(187 100% 47% / 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const ProjectGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary uppercase tracking-widest mb-4">
            Gallery
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on any project to view details
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {projects.map((project) => (
            <GalleryItem
              key={project.id}
              project={project}
              isSelected={selectedId === project.id}
              onSelect={setSelectedId}
            />
          ))}
        </motion.div>

        {/* Full-Screen Preview Modal */}
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            {/* Background overlay */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal content */}
            <motion.div
              className="relative bg-background rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] border border-primary/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {selectedProject.description}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setSelectedId(null)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-sm font-mono bg-primary/10 text-primary rounded-lg border border-primary/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {selectedProject.github && (
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg border border-primary/30 transition-all font-mono text-sm"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                      GitHub
                    </motion.a>
                  )}
                  {selectedProject.demo && (
                    <motion.a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] rounded-lg border border-accent/60 transition-all font-mono text-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      View
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Navigation arrows */}
            <motion.button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = projects.findIndex((p) => p.id === selectedId);
                const prevIndex =
                  currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
                setSelectedId(projects[prevIndex].id);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = projects.findIndex((p) => p.id === selectedId);
                const nextIndex =
                  currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
                setSelectedId(projects[nextIndex].id);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
