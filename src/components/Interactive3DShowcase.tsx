import { motion } from 'framer-motion';
import { useRef, Suspense, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Zap, Code2, Globe, Rocket, Star } from 'lucide-react';

// 3D Scene Components - Space Themed

// Sun - Central star
const Sun = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main sun */}
      <mesh position={[0, 0, 0]}>
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

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

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

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0008;
    }
  });

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

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

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

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.z += 0.0001;
    }
  });

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
  const starCount = 500;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 40;
    positions[i + 1] = (Math.random() - 0.5) * 40;
    positions[i + 2] = (Math.random() - 0.5) * 40;
  }

  return (
    <points>
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
  const earthOrbitPoints: [number, number, number][] = [];
  const marsOrbitPoints: [number, number, number][] = [];
  const jupiterOrbitPoints: [number, number, number][] = [];

  // Pre-calculate orbit points
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    earthOrbitPoints.push([Math.cos(angle) * 4, 1 * Math.sin(angle * 0.1), Math.sin(angle) * 4]);
    marsOrbitPoints.push([Math.cos(angle) * 4, -1 * Math.sin(angle * 0.1), Math.sin(angle) * 4]);
    jupiterOrbitPoints.push([Math.cos(angle) * 3.5, Math.sin(angle) * 3.5, Math.cos(angle) * 0.5]);
  }

  return (
    <group>
      {/* Earth orbit */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={earthOrbitPoints.length}
            array={new Float32Array(earthOrbitPoints.flat())}
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
            count={marsOrbitPoints.length}
            array={new Float32Array(marsOrbitPoints.flat())}
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
            count={jupiterOrbitPoints.length}
            array={new Float32Array(jupiterOrbitPoints.flat())}
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
        autoRotateSpeed={0.8}
        rotateSpeed={0.5}
        autoRotateMinZoom={5}
        autoRotateMaxZoom={20}
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
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const features = [
    { icon: Globe, label: 'Interactive Solar System', desc: 'Explore planets with smooth controls' },
    { icon: Rocket, label: 'Orbital Mechanics', desc: 'Realistic celestial body movements' },
    { icon: Star, label: 'Cosmic Visualization', desc: 'Stunning space environment' },
  ];

  return (
    <section id="3d-showcase" className="relative py-20 md:py-28 overflow-hidden bg-background/50">
      {/* Minimal background */}
      <motion.div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            <span className="text-foreground">3D</span>{' '}
            <span className="text-primary">SPACE EXPLORER</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Interactive solar system. Drag to rotate • Scroll to zoom
          </p>
        </motion.div>

        {/* 3D Canvas Container - Optimized */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative mb-10 h-80 md:h-[500px] rounded-2xl overflow-hidden border border-primary/20 bg-black/80"
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
                preserveDrawingBuffer: false,
              }}
              style={{ width: '100%', height: '100%' }}
              onCreated={() => setIsCanvasReady(true)}
              dpr={[1, 1.5]}
              frameloop="always"
            >
              <color attach="background" args={['#0a0a14']} />
              <Suspense fallback={null}>
                <SpaceScene />
              </Suspense>
            </Canvas>
          )}

          {/* Fallback for reduced motion */}
          {prefersReducedMotion && (
            <div className="w-full h-full flex items-center justify-center bg-card/30 backdrop-blur">
              <div className="text-center">
                <Globe className="w-12 h-12 mx-auto mb-3 text-primary opacity-50" />
                <p className="text-muted-foreground text-sm">Interactive 3D disabled (reduced motion)</p>
              </div>
            </div>
          )}

          {/* Instruction Overlay - Subtle */}
          {isCanvasReady && !prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-3 left-0 right-0 text-center pointer-events-none"
            >
              <p className="text-xs text-muted-foreground/70 font-mono">
                🌍 Drag • Scroll • Double-click to reset
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Features Grid - Clean and Focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="p-4 rounded-lg border border-primary/15 bg-card/40 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="p-2 bg-primary/10 rounded inline-block flex-shrink-0"
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">
                    {feature.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.a
            href="https://github.com/OwaisZakir"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-2 text-sm font-mono border border-primary/40 text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            <Code2 className="w-4 h-4" />
            View 3D Projects
            <Zap className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Interactive3DShowcase;
