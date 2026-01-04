import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Code2, Users, Trophy, GraduationCap, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Shield,
    title: 'Cybersecurity Master',
    description: 'Expert trainer in ethical hacking, penetration testing, and security best practices.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/30',
  },
  {
    icon: Code2,
    title: 'MERN Stack Developer',
    description: 'Building full-stack applications with MongoDB, Express, React, and Node.js.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
  },
  {
    icon: Users,
    title: 'Project Manager',
    description: 'Leading cross-functional teams to deliver complex software projects on time.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/30',
  },
  {
    icon: Trophy,
    title: 'Hackathon Winner',
    description: 'Multiple first-place finishes leading innovative teams in competitive events.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

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
            <span className="text-foreground">ABOUT</span>{' '}
            <span className="text-primary neon-text">ME</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover the passion and expertise behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Final Year Student</h3>
                <p className="text-muted-foreground text-sm">Software Engineering</p>
              </div>
            </div>

            <p className="text-foreground text-lg leading-relaxed">
              I'm a passionate technologist who lives at the intersection of 
              <span className="text-primary font-semibold"> development</span> and 
              <span className="text-secondary font-semibold"> security</span>. 
              With a deep understanding of both building and breaking systems, 
              I bring a unique perspective to every project.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              As a final-year Software Engineering student, I've dedicated myself to mastering 
              the MERN stack while simultaneously developing expertise in cybersecurity. 
              This dual focus allows me to create applications that are not only functional 
              and beautiful but also inherently secure.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond coding, I thrive in leadership roles—managing teams, mentoring developers, 
              and driving projects from concept to deployment. My hackathon victories are a 
              testament to my ability to innovate under pressure and deliver results.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex items-center gap-2 text-accent">
                <Zap className="w-5 h-5" />
                <span className="font-mono text-sm">Always learning</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-primary">
                <Code2 className="w-5 h-5" />
                <span className="font-mono text-sm">Building the future</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`cyber-card p-6 ${item.bgColor} ${item.borderColor} group cursor-pointer`}
              >
                <div className={`inline-flex p-3 rounded-lg ${item.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { value: '50+', label: 'Projects Completed' },
            { value: '3+', label: 'Years Experience' },
            { value: '100+', label: 'Students Trained' },
            { value: '5+', label: 'Hackathons Won' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 border border-border/50 rounded-lg bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
