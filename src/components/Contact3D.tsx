import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MessageSquare, Linkedin, Github, Send, Phone, MapPin, Clock } from 'lucide-react';
import { downloadResume } from '@/lib/resume-generator';

const Contact3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'owais.zakir.dev@gmail.com',
      href: 'mailto:owais.zakir.dev@gmail.com',
      color: 'from-primary to-secondary',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '@owaiszakir',
      href: 'https://linkedin.com/in/owaiszakir/',
      color: 'from-secondary to-accent',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@OwaisZakir',
      href: 'https://github.com/OwaisZakir',
      color: 'from-accent to-primary',
    },
    {
      icon: MessageSquare,
      label: 'Discord',
      value: 'OwaisZakir#1234',
      href: '#',
      color: 'from-primary to-accent',
    },
  ];

  const workingHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PKT' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM PKT' },
    { day: 'Sunday', hours: 'By Appointment' },
  ];

  return (
    <section ref={containerRef} id="contact" className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 30, 0],
          rotate: 360,
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, -30, 0],
          rotate: -360,
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '120px' } : {}}
            transition={{ duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
          />

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Let's{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Connect
            </span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Got a project in mind? Let's work together to bring your ideas to life. I'm always excited to collaborate on new and interesting projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <motion.form
              onSubmit={handleSubmit}
              className="relative p-8 rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm overflow-hidden group hover:border-primary/50 transition-colors"
              whileHover={{ y: -4 }}
            >
              {/* Form background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
              />

              <div className="relative z-10">
                {/* Name Field */}
                <div className="mb-6">
                  <label className="block text-sm font-display font-bold text-foreground mb-2">
                    Your Name
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/80 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <label className="block text-sm font-display font-bold text-foreground mb-2">
                    Your Email
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/80 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                {/* Message Field */}
                <div className="mb-6">
                  <label className="block text-sm font-display font-bold text-foreground mb-2">
                    Message
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or idea..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/80 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent text-white font-display font-bold tracking-wider uppercase transition-all disabled:opacity-70"
                >
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    animate={isSubmitting ? { scale: [1, 0.95, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        Sending...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        ✓ Message Sent!
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.div>
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center"
                  >
                    Thank you! I'll get back to you soon.
                  </motion.div>
                )}
              </div>
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            <div>
              <h3 className="text-lg font-display font-bold text-foreground mb-4">
                Get In Touch
              </h3>

              <div className="space-y-3">
                {contactMethods.map((method, index) => {
                  const { icon: Icon } = method;
                  return (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 8 }}
                      className="group block p-4 rounded-lg border border-primary/20 hover:border-primary/60 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          className={`p-2 rounded-lg bg-gradient-to-r ${method.color} text-white mt-0.5`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon size={20} />
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-sm font-mono text-muted-foreground">
                            {method.label}
                          </p>
                          <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                            {method.value}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-4 rounded-lg border border-accent/20 bg-accent/5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-accent" />
                <h4 className="font-display font-bold text-foreground">
                  Working Hours
                </h4>
              </div>

              <div className="space-y-2">
                {workingHours.map((hours) => (
                  <div key={hours.day} className="text-sm">
                    <p className="font-mono text-muted-foreground">{hours.day}</p>
                    <p className="text-foreground">{hours.hours}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={() => downloadResume('pdf')}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-lg bg-primary/10 border-2 border-primary/50 text-primary hover:bg-primary/20 hover:border-primary font-display font-bold tracking-wider uppercase transition-all"
            >
              Download Resume
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact3D;
