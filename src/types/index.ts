/**
 * Navigation item type
 */
export interface NavItem {
  name: string;
  href: string;
}

/**
 * Project item type
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category?: 'frontend' | 'backend' | 'fullstack';
}

/**
 * Skill item type
 */
export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

/**
 * Experience item type
 */
export interface Experience {
  id: string;
  position: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

/**
 * Floating icon type for Hero section
 */
export interface FloatingIcon {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

/**
 * Mouse position type
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Ripple animation type
 */
export interface Ripple {
  id: number;
  x: number;
  y: number;
}

/**
 * Theme type
 */
export type Theme = 'light' | 'dark';

/**
 * Animation variant type
 */
export type AnimationVariant = 'fadeIn' | 'slideIn' | 'scaleIn' | 'slideInUp';
