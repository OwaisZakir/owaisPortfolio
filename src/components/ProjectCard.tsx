import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  index?: number;
}

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  demoUrl,
  githubUrl,
  index = 0,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 card-hover"
    >
      {/* Image Container */}
      {image && (
        <div className="relative overflow-hidden h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors"
          whileHover={{ x: 4 }}
        >
          {title}
        </motion.h3>

        <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono bg-primary/10 border border-primary/30 rounded-full text-primary hover:bg-primary/20 transition-colors cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-border/50">
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              whileHover={{ x: 2 }}
            >
              <ExternalLink size={16} />
              <span>Demo</span>
            </motion.a>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
              whileHover={{ x: 2 }}
            >
              <Github size={16} />
              <span>Code</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Neon border effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={{ boxShadow: '0 0 0 0px rgba(0, 238, 255, 0)' }}
        whileHover={{ boxShadow: '0 0 20px 0px rgba(0, 238, 255, 0.3)' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
