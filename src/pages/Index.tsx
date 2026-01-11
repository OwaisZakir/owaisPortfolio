import ParticleField from '@/components/ParticleField';
import MouseFollower from '@/components/MouseFollower';
import CyberNavbar3D from '@/components/CyberNavbar3D';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SkipLink from '@/components/SkipLink';
import ThemeToggle from '@/components/ThemeToggle';
import SchemaInjector from '@/components/SchemaInjector';
import Canvas3DBackground from '@/components/Canvas3DBackground';
import Hero3DAdvanced from '@/components/Hero3DAdvanced';
import SEOHead from '@/components/SEOHead';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import Interactive3DShowcase from '@/components/Interactive3DShowcase';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const Index = () => {
  return (
    <ErrorBoundary>
      <SEOHead />
      <SchemaInjector />
      <SkipLink />
      <ThemeToggle />
      <div className="relative bg-background text-foreground overflow-x-hidden">
        {/* 3D Background Canvas */}
        <Canvas3DBackground />

        {/* Mouse Follower Effect */}
        <MouseFollower />

        {/* Background Particle System */}
        <ParticleField />

        {/* Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Navigation */}
        <CyberNavbar3D />

        {/* Main Content with depth-based immersion */}
        <main id="main-content" className="relative z-10">
          {/* Hero Section */}
          <ErrorBoundary>
            <Hero3DAdvanced />
          </ErrorBoundary>

          {/* About Section */}
          <ErrorBoundary>
            <AboutSection />
          </ErrorBoundary>

          {/* Skills Section */}
          <ErrorBoundary>
            <SkillsSection />
          </ErrorBoundary>

          {/* Projects Section - Main showcase */}
          <ErrorBoundary>
            <ProjectsSection />
          </ErrorBoundary>

          {/* Interactive 3D Showcase */}
          <ErrorBoundary>
            <Interactive3DShowcase />
          </ErrorBoundary>

          {/* Experience Section */}
          <ErrorBoundary>
            <ExperienceSection />
          </ErrorBoundary>

          {/* Contact Section */}
          <ErrorBoundary>
            <ContactSection />
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
