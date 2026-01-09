import ParticleField from '@/components/ParticleField';
import MouseFollower from '@/components/MouseFollower';
import CyberNavbar from '@/components/CyberNavbar';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SkipLink from '@/components/SkipLink';
import ThemeToggle from '@/components/ThemeToggle';
import Canvas3DBackground from '@/components/Canvas3DBackground';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const Index = () => {
  return (
    <ErrorBoundary>
      <SkipLink />
      <ThemeToggle />
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* 3D Background Canvas */}
        <Canvas3DBackground />

        {/* Mouse Follower Effect */}
        <MouseFollower />

        {/* Background Particle System */}
        <ParticleField />

        {/* Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Navigation */}
        <CyberNavbar />

        {/* Main Content */}
        <main id="main-content" className="relative z-10">
          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <AboutSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <SkillsSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <ProjectsSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <ExperienceSection />
          </ErrorBoundary>
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
