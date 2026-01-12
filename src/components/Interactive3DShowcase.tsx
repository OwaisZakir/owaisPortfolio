import { motion } from 'framer-motion';
import { useRef, Suspense, lazy, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Zap, Cpu, Code2, Globe, Rocket, Star } from 'lucide-react';

// 3D Scene Components - Space Themed

// Sun - Central star
const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* Main sun */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={1}
        />
      </mesh>
      {/* Sun glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          emissive="#FFA500"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

// Earth - Blue planet with glow
const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.y += 0.001;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[4, 1, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color="#4169E1"
        emissive="#00BFFF"
        emissiveIntensity={0.2}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
};

// Mars - Red planet
const Mars = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.y += 0.0008;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[-4, -1, 0]}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#CD5C5C"
        emissive="#FF4500"
        emissiveIntensity={0.15}
        metalness={0.2}
        roughness={0.5}
      />
    </mesh>
  );
};

// Jupiter - Large gas giant
const Jupiter = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.y += 0.0005;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[0, -3.5, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#DAA520"
        emissive="#FFB90F"
        emissiveIntensity={0.2}
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
  );
};

// Asteroid belt particles
const AsteroidBelt = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (particlesRef.current) {
      const animate = () => {
        if (particlesRef.current) {
          particlesRef.current.rotation.z += 0.0001;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  const asteroidCount = 200;
  const positions = new Float32Array(asteroidCount * 3);

  for (let i = 0; i < asteroidCount * 3; i += 3) {
    const radius = 5 + Math.random() * 2;
    const angle = Math.random() * Math.PI * 2;
    positions[i] = Math.cos(angle) * radius;
    positions[i + 1] = (Math.random() - 0.5) * 0.5;
    positions[i + 2] = Math.sin(angle) * radius;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={asteroidCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#B0C4DE"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Cosmic dust and stars
const CosmicDust = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const starCount = 500;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 40;
    positions[i + 1] = (Math.random() - 0.5) * 40;
    positions[i + 2] = (Math.random() - 0.5) * 40;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFFFFF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Orbital rings visualization
const OrbitalRings = () => {
  return (
    <group>
      {/* Earth orbit */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={64}
            array={new Float32Array(
              Array.from({ length: 64 }, (_, i) => {
                const angle = (i / 64) * Math.PI * 2;
                return [Math.cos(angle) * 4, 1 * Math.sin(angle * 0.1), Math.sin(angle) * 4];
              }).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00BFFF" transparent opacity={0.2} linewidth={1} />
      </line>

      {/* Mars orbit */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={64}
            array={new Float32Array(
              Array.from({ length: 64 }, (_, i) => {
                const angle = (i / 64) * Math.PI * 2;
                return [Math.cos(angle) * 4, -1 * Math.sin(angle * 0.1), Math.sin(angle) * 4];
              }).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FF4500" transparent opacity={0.2} linewidth={1} />
      </line>

      {/* Jupiter orbit */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={64}
            array={new Float32Array(
              Array.from({ length: 64 }, (_, i) => {
                const angle = (i / 64) * Math.PI * 2;
                return [Math.cos(angle) * 3.5, Math.sin(angle) * 3.5, Math.cos(angle) * 0.5];
              }).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FFB90F" transparent opacity={0.2} linewidth={1} />
      </line>
    </group>
  );
};

// Lights
const Lights = () => (
  <>
    <ambientLight intensity={0.4} />
    <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFD700" />
    <pointLight position={[10, 10, 10]} intensity={0.5} color="#00BFFF" />
    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF4500" />
  </>
);

// Main 3D Scene
const SpaceScene = () => {
  return (
    <>
      <Lights />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      <CosmicDust />
      <OrbitalRings />
      <Sun />
      <Earth />
      <Mars />
      <Jupiter />
      <AsteroidBelt />
      <OrbitControls
        enableZoom
        enablePan
        enableRotate
        autoRotate
        autoRotateSpeed={1}
        rotateSpeed={0.5}
      />
    </>
  );
};

// Loading Fallback
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-card/50">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
    />
  </div>
);

export const Interactive3DShowcase = () => {
  const prefersReducedMotion = useReducedMotion();
  const [canvasReady, setCanvasReady] = useState(false);

  const features = [
    { icon: Globe, label: 'Solar System Experience', desc: 'Explore planets, moons, and asteroids' },
    { icon: Rocket, label: 'Space Navigation', desc: 'Intuitive 3D camera controls and interactions' },
    { icon: Star, label: 'Cosmic Visualizations', desc: 'Real-time particle and orbital systems' },
  ];

  return (
    <section id="3d-showcase" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <motion.div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
          />
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">3D</span>{' '}
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
              SPACE EXPLORER
            </motion.span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore an interactive solar system with Three.js. Rotate, zoom, and discover the cosmos with intuitive controls.
          </p>
        </motion.div>

        {/* 3D Canvas Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-12 h-96 md:h-[600px] rounded-2xl overflow-hidden border border-primary/20 bg-card/30 backdrop-blur-sm"
        >
          {/* 3D Canvas */}
          {!prefersReducedMotion && (
            <Canvas
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                precision: 'mediump',
                stencil: false,
                depth: true,
                logarithmicDepthBuffer: false,
              }}
              style={{ width: '100%', height: '100%' }}
              onCreated={() => setCanvasReady(true)}
              dpr={[1, 1.5]}
            >
              <color attach="background" args={['#0a0a14']} />
              <Suspense fallback={null}>
                <SpaceScene />
              </Suspense>
            </Canvas>
          )}

          {/* Fallback for reduced motion or no WebGL */}
          {prefersReducedMotion && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
                <p className="text-muted-foreground">3D visualization disabled (reduced motion preference)</p>
              </div>
            </div>
          )}

          {/* Instruction Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute bottom-4 left-4 right-4 pointer-events-none"
          >
            <div className="bg-background/80 backdrop-blur-sm border border-primary/30 rounded-lg p-3 text-center">
              <p className="font-mono text-xs md:text-sm text-muted-foreground">
                🌍 Drag to rotate • Scroll to zoom • Double-click to reset
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10">
                <motion.div
                  className="p-3 bg-primary/10 border border-primary/30 rounded-lg inline-block mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>

                <h3 className="font-display text-lg font-bold mb-2 text-foreground">
                  {feature.label}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.desc}
                </p>

                {/* Animated border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Used */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="font-display text-xl font-bold mb-4 text-foreground">
            Technologies Used
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['React Three Fiber', 'Three.js', 'WebGL', 'Optimized Rendering', 'Real-time Animations'].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-sm"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/OwaisZakir"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px hsl(187 100% 47% / 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 font-display text-sm uppercase tracking-wider border-2 border-primary/50 text-primary rounded-xl hover:bg-primary/10 transition-colors"
          >
            <Code2 className="w-5 h-5" />
            Explore 3D Projects
            <Zap className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Interactive3DShowcase;
