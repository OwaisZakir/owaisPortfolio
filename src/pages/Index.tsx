import { lazy, Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import SkeletonLoader from '@/components/SkeletonLoader';

// Import critical components immediately (no lazy load)
import SEOHead from '@/components/SEOHead';
import SchemaInjector from '@/components/SchemaInjector';
import SkipLink from '@/components/SkipLink';
import ThemeToggle from '@/components/ThemeToggle';

// Lazy load non-critical components
const Canvas3DBackground = lazy(() => import('@/components/Canvas3DBackground'));
const ParticleField = lazy(() => import('@/components/ParticleField'));
const MouseFollower = lazy(() => import('@/components/MouseFollower'));
const CyberNavbar3D = lazy(() => import('@/components/CyberNavbar3D'));
const ScrollProgressBar = lazy(() => import('@/components/ScrollProgressBar'));
const Hero3DAdvanced = lazy(() => import('@/components/Hero3DAdvanced'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const Skills3DSection = lazy(() => import('@/components/Skills3DSection'));
const Projects3D = lazy(() => import('@/components/Projects3D'));
const Interactive3DShowcase = lazy(() => import('@/components/Interactive3DShowcase'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const Contact3D = lazy(() => import('@/components/Contact3D'));
const Footer = lazy(() => import('@/components/Footer'));

// Lightweight loading component
const SectionSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <SkeletonLoader />
  </div>
);

const Index = () => {
  return (
    <ErrorBoundary>
      {/* Critical components - always load immediately */}
      <SEOHead />
      <SchemaInjector />
      <SkipLink />
      <ThemeToggle />

      <div className="relative bg-background text-foreground overflow-x-hidden">
        {/* 3D Background Canvas */}
        <Suspense fallback={null}>
          <Canvas3DBackground />
        </Suspense>

        {/* Mouse Follower Effect */}
        <Suspense fallback={null}>
          <MouseFollower />
        </Suspense>

        {/* Background Particle System */}
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>

        {/* Scroll Progress Bar */}
        <Suspense fallback={null}>
          <ScrollProgressBar />
        </Suspense>

        {/* Navigation */}
        <Suspense fallback={null}>
          <CyberNavbar3D />
        </Suspense>

        {/* Main Content with depth-based immersion */}
        <main id="main-content" className="relative z-10">
          {/* Hero Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <Hero3DAdvanced />
            </Suspense>
          </ErrorBoundary>

          {/* About Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <AboutSection />
            </Suspense>
          </ErrorBoundary>

          {/* Skills Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <Skills3DSection />
            </Suspense>
          </ErrorBoundary>

          {/* Projects Section - Main showcase */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <Projects3D />
            </Suspense>
          </ErrorBoundary>

          {/* Interactive 3D Showcase - Space themed */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <Interactive3DShowcase />
            </Suspense>
          </ErrorBoundary>

          {/* Experience Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <ExperienceSection />
            </Suspense>
          </ErrorBoundary>

          {/* Contact Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <Contact3D />
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
