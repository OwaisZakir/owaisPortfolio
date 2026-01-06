import { motion, useScroll, useTransform } from 'framer-motion';
import { useActiveSection } from '@/hooks/use-active-section';

const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const currentSection = useActiveSection(sections);

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Section Indicators - Hidden on mobile */}
      <motion.div
        className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {sections.map((section) => (
          <motion.a
            key={section}
            href={`#${section}`}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(section);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`relative group`}
            whileHover={{ scale: 1.2 }}
          >
            {/* Indicator dot */}
            <motion.div
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSection === section
                  ? 'bg-primary shadow-lg shadow-primary/50'
                  : 'bg-border group-hover:bg-primary/50'
              }`}
              initial={false}
              animate={{
                scale: currentSection === section ? 1.3 : 1,
              }}
            />

            {/* Label tooltip */}
            <motion.div
              className="absolute right-8 whitespace-nowrap px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-display font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ pointerEvents: 'none' }}
            >
              <span
                className={
                  currentSection === section ? 'text-primary neon-text' : 'text-foreground'
                }
              >
                {section}
              </span>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </>
  );
};

export default ScrollProgressBar;
