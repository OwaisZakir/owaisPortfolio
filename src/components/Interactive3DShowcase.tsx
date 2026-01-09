import { motion } from 'framer-motion';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Zap, Cpu, Code2 } from 'lucide-react';

// 3D Scene Components
const RotatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[-3, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial
        color="#00eeff"
        emissive="#00eeff"
        emissiveIntensity={0.5}
        wireframe={false}
      />
    </mesh>
  );
};

const FloatingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[3, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#9d4edd"
        emissive="#9d4edd"
        emissiveIntensity={0.3}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
};

const PulsatingOctahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[0, 2, 0]}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshPhongMaterial
        color="#00ff9d"
        emissive="#00ff9d"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
};

const TorusKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[0, -2, 0]}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshPhongMaterial
        color="#ff00ff"
        emissive="#ff00ff"
        emissiveIntensity={0.3}
        wireframe={true}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Particle System
const ParticleSystem = () => {
  const particlesRef = useRef<THREE.Points>(null);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={300}
          array={new Float32Array(
            Array.from({ length: 300 * 3 }, () => (Math.random() - 0.5) * 20)
          )}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00eeff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Lights
const Lights = () => (
  <>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1} color="#00eeff" />
    <pointLight position={[-10, -10, 10]} intensity={0.5} color="#9d4edd" />
    <pointLight position={[0, 0, 10]} intensity={0.8} color="#00ff9d" />
  </>
);

// Main 3D Scene
const Scene = () => {
  return (
    <>
      <Lights />
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
      <ParticleSystem />
      <RotatingCube />
      <FloatingSphere />
      <PulsatingOctahedron />
      <TorusKnot />
      <OrbitControls
        enableZoom
        enablePan
        enableRotate
        autoRotate
        autoRotateSpeed={3}
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

  const features = [
    { icon: Cpu, label: 'Interactive Controls', desc: 'Mouse-driven 3D manipulation' },
    { icon: Code2, label: 'React Three Fiber', desc: 'Advanced WebGL rendering' },
    { icon: Zap, label: 'Real-time Animation', desc: 'Smooth 60 FPS performance' },
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
              SHOWCASE
            </motion.span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore my Three.js expertise with this interactive 3D experience. Drag, rotate, and zoom with your mouse.
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
              }}
              style={{ width: '100%', height: '100%' }}
            >
              <color attach="background" args={['#0a0a14']} />
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          )}

          {/* Fallback for reduced motion or no WebGL */}
          {prefersReducedMotion && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Cpu className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
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
                💡 Drag to rotate • Scroll to zoom • Double-click to reset
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
            {['React Three Fiber', 'Three.js', 'WebGL', 'GLSL Shaders', 'Framer Motion'].map((tech, i) => (
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
            View 3D Projects on GitHub
            <Zap className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Interactive3DShowcase;
