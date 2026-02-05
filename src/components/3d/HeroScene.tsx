import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { FloatingProduct, FloatingSphere, FloatingTorus } from './FloatingProduct';

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#4f46e5" />
      
      {/* Floating 3D elements */}
      <FloatingProduct position={[-3.5, 1.5, -2]} color="#4f46e5" scale={0.8} speed={1.2} />
      <FloatingSphere position={[3.5, -1, -1]} color="#6366f1" scale={0.6} />
      <FloatingTorus position={[-2, -1.5, 1]} color="#818cf8" scale={0.5} speed={0.8} />
      <FloatingProduct position={[2.5, 2, 0]} color="#a5b4fc" scale={0.5} speed={1.5} />
      <FloatingSphere position={[0, 3, -3]} color="#c7d2fe" scale={0.4} />
      <FloatingTorus position={[4, 0.5, -2]} color="#4f46e5" scale={0.4} speed={1.1} />
      
      {/* Environment */}
      <Environment preset="city" />
    </>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};
