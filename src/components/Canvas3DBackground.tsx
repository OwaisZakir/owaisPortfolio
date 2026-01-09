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

    const initCanvas = async () => {
      try {
        // Dynamic import for Three.js
        const THREE = await import('three');
        
        const canvas = document.createElement('canvas');
        containerRef.current?.appendChild(canvas);

        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
          canvas, 
          alpha: true, 
          antialias: true 
        });

        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        camera.position.z = 50;

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCnt = 5000;
        const posArray = new Float32Array(particlesCnt * 3);

        for (let i = 0; i < particlesCnt * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 200;
          posArray[i + 1] = (Math.random() - 0.5) * 200;
          posArray[i + 2] = (Math.random() - 0.5) * 200;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Material
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.5,
          color: '#00eeff',
          transparent: true,
          opacity: 0.7,
          sizeAttenuation: true,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Create connecting lines
        const lineMaterial = new THREE.LineBasicMaterial({
          color: '#9d4edd',
          transparent: true,
          opacity: 0.1,
        });

        // Mouse tracking
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
          targetX = (e.clientX / width) * 2 - 1;
          targetY = -(e.clientY / height) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);

          mouseX += (targetX - mouseX) * 0.05;
          mouseY += (targetY - mouseY) * 0.05;

          // Rotate particles
          particlesMesh.rotation.x += 0.00003;
          particlesMesh.rotation.y += 0.00005;

          // Add mouse influence
          camera.position.x = mouseX * 50;
          camera.position.y = mouseY * 50;

          renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
          const newWidth = window.innerWidth;
          const newHeight = window.innerHeight;

          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(animationFrameId);
          renderer.dispose();
          particlesGeometry.dispose();
          particlesMaterial.dispose();
          canvas.remove();
        };
      } catch (error) {
        console.error('3D Background initialization failed:', error);
      }
    };

    const cleanup = initCanvas();

    return () => {
      cleanup?.then(fn => fn?.());
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
