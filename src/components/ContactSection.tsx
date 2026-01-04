import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Send,
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#', color: 'hsl(187, 100%, 47%)' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hsl(274, 73%, 58%)' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hsl(152, 100%, 50%)' },
];

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@cyberdev.com',
    href: 'mailto:hello@cyberdev.com',
    color: 'hsl(187, 100%, 47%)',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Available Worldwide',
    href: null,
    color: 'hsl(274, 73%, 58%)',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    color: 'hsl(152, 100%, 50%)',
  },
];

// Helper to save submissions to localStorage
const saveSubmission = (data: { name: string; email: string; subject: string; message: string }) => {
  const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
  submissions.push({
    ...data,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
};

interface ContactCardProps {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string | null;
  color: string;
  index: number;
}

const ContactCard = ({ icon: Icon, label, value, href, color, index }: ContactCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="flex items-center gap-4 p-5 cyber-card cursor-pointer overflow-hidden"
        whileHover={{
          borderColor: color,
          boxShadow: `0 0 30px ${color}30`,
          x: 5,
        }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at left, ${color}10, transparent 70%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Icon */}
        <motion.div
          className="relative p-4 rounded-xl"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Icon size={22} style={{ color }} />
        </motion.div>

        {/* Content */}
        <div className="relative">
          <p className="text-muted-foreground text-sm mb-0.5">{label}</p>
          {href ? (
            <a
              href={href}
              className="font-semibold hover:text-primary transition-colors"
              style={{ color: isHovered ? color : undefined }}
            >
              {value}
            </a>
          ) : (
            <p className="font-semibold" style={{ color: isHovered ? color : undefined }}>
              {value}
            </p>
          )}
        </div>

        {/* Arrow indicator */}
        <motion.div
          className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={isHovered ? { x: [0, 5, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Zap size={16} style={{ color }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // 3D card effect
  const cardRef = useRef<HTMLFormElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 50);
    mouseY.set((rect.top + rect.height / 2 - e.clientY) / 50);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in your form', {
        description: 'Check that all fields are filled correctly.',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Save to localStorage
    saveSubmission(formData);

    toast.success('Message sent successfully!', {
      description: "Your message has been saved. I'll get back to you soon!",
      icon: <Sparkles className="w-4 h-4" />,
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setTouchedFields({});
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation on change
    if (touchedFields[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const inputClasses = (fieldName: string) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName];

    return `w-full px-5 py-4 bg-muted/30 border rounded-xl font-mono text-sm placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ${
      hasError && isTouched
        ? 'border-destructive ring-2 ring-destructive/20 bg-destructive/5'
        : focusedField === fieldName
          ? 'border-primary ring-2 ring-primary/20 bg-muted/50'
          : 'border-border hover:border-primary/50'
    }`;
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
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
            <span className="text-foreground">GET IN</span>{' '}
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
              TOUCH
            </motion.span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to collaborate on your next project? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="font-display text-2xl font-bold">Let's Connect</h3>
              </motion.div>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a project in mind, need cybersecurity training,
                or just want to chat about technology—I'm always open to new opportunities
                and collaborations.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <ContactCard key={item.label} {...item} index={index} />
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      rotate: [0, -10, 10, 0],
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="relative p-4 bg-card/50 border border-border rounded-xl text-muted-foreground transition-all group"
                    style={
                      {
                        '--hover-color': social.color,
                      } as React.CSSProperties
                    }
                    aria-label={social.name}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `radial-gradient(circle, ${social.color}20, transparent 70%)`,
                        boxShadow: `0 0 30px ${social.color}30`,
                      }}
                    />
                    <social.icon
                      className="w-5 h-5 relative z-10 group-hover:text-foreground transition-colors"
                      style={{ color: social.color }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form with 3D effect */}
          <motion.form
            ref={cardRef}
            onSubmit={handleSubmit}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="cyber-card p-8 space-y-6 relative overflow-hidden"
            style={{
              perspective: 1000,
              transformStyle: 'preserve-3d',
              rotateX,
              rotateY,
            }}
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, hsl(187 100% 47%), hsl(274 73% 58%), hsl(152 100% 50%), hsl(187 100% 47%))',
                backgroundSize: '300% 100%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="absolute inset-[1px] rounded-lg bg-card" />

            {/* Form content */}
            <div className="relative z-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-display text-sm uppercase tracking-wider text-muted-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={(e) => {
                      setFocusedField(null);
                      handleBlur(e);
                    }}
                    required
                    className={inputClasses('name')}
                    placeholder="John Doe"
                  />
                  {errors.name && touchedFields.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-xs font-medium"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-display text-sm uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={(e) => {
                      setFocusedField(null);
                      handleBlur(e);
                    }}
                    required
                    className={inputClasses('email')}
                    placeholder="john@example.com"
                  />
                  {errors.email && touchedFields.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-xs font-medium"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block font-display text-sm uppercase tracking-wider text-muted-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={(e) => {
                    setFocusedField(null);
                    handleBlur(e);
                  }}
                  required
                  className={inputClasses('subject')}
                  placeholder="Project Collaboration"
                />
                {errors.subject && touchedFields.subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-xs font-medium"
                  >
                    {errors.subject}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block font-display text-sm uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={(e) => {
                    setFocusedField(null);
                    handleBlur(e);
                  }}
                  required
                  rows={5}
                  className={`${inputClasses('message')} resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && touchedFields.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-xs font-medium"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px hsl(187 100% 47% / 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full cyber-btn py-5 bg-primary text-primary-foreground font-display uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />

                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
                {[
                  { icon: CheckCircle, text: 'Secure form' },
                  { icon: Zap, text: 'Fast response' },
                  { icon: Sparkles, text: 'Saved locally' },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <item.icon className="w-3.5 h-3.5 text-accent" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
