import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const Canvas3DBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isWebGLAvailable] = useState(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('webgl2')));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (prefersReducedMotion || !isWebGLAvailable || !containerRef.current) return;

    let animationFrameId: number;
    let cleanupFn: (() => void) | null = null;

    const initCanvas = async () => {
      try {
        // Dynamic import for Three.js with error handling
        const THREE = await import('three');

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl2', {
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
        });

        if (!context) {
          console.warn('WebGL2 not available, skipping 3D background');
          return;
        }

        containerRef.current?.appendChild(canvas);

        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        });

        renderer.setSize(width, height);
        // Mobile friendly pixel ratio
        const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5);
        renderer.setPixelRatio(pixelRatio);
        renderer.setClearColor(0x000000, 0);
        camera.position.z = 50;

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        // Adaptive particle count based on device
        const isMobile = window.innerWidth < 768;
        const particlesCnt = isMobile ? 1000 : 2000;
        const posArray = new Float32Array(particlesCnt * 3);

        for (let i = 0; i < particlesCnt * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 200;
          posArray[i + 1] = (Math.random() - 0.5) * 200;
          posArray[i + 2] = (Math.random() - 0.5) * 200;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Material with optimized settings
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.5,
          color: '#00eeff',
          transparent: true,
          opacity: 0.6, // Reduced from 0.7
          sizeAttenuation: true,
          fog: false,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Mouse tracking with throttling
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let lastMouseUpdateTime = 0;

        const handleMouseMove = (e: MouseEvent) => {
          const now = performance.now();
          if (now - lastMouseUpdateTime < 16) return; // Throttle to ~60fps

          lastMouseUpdateTime = now;
          targetX = (e.clientX / width) * 2 - 1;
          targetY = -(e.clientY / height) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Animation loop with performance monitoring
        let frameCount = 0;
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);

          mouseX += (targetX - mouseX) * 0.02; // Reduce smoothing further
          mouseY += (targetY - mouseY) * 0.02;

          // Rotate particles at consistent speed
          particlesMesh.rotation.x += 0.00002;
          particlesMesh.rotation.y += 0.00003;

          // Add mouse influence with reduced intensity for mobile
          const influenceScale = isMobile ? 30 : 50;
          camera.position.x = mouseX * influenceScale;
          camera.position.y = mouseY * influenceScale;

          renderer.render(scene, camera);
          frameCount++;
        };

        animate();

        // Handle resize with debouncing
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
          }, 300);
        };

        window.addEventListener('resize', handleResize, { passive: true });

        // Cleanup function
        cleanupFn = () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
          clearTimeout(resizeTimeout);
          cancelAnimationFrame(animationFrameId);
          renderer.dispose();
          particlesGeometry.dispose();
          particlesMaterial.dispose();
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        };
      } catch (error) {
        console.error('3D Background initialization failed:', error);
      }
    };

    initCanvas();

    return () => {
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, [prefersReducedMotion, isWebGLAvailable]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: prefersReducedMotion ? 0 : 1 }}
    />
  );
};

export default Canvas3DBackground;
