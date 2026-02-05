import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingProductProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}

export const FloatingProduct = ({ position, color, scale = 1, speed = 1 }: FloatingProductProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <RoundedBox
        ref={meshRef}
        args={[1, 1, 1]}
        radius={0.1}
        smoothness={4}
        position={position}
        scale={scale}
      >
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </RoundedBox>
    </Float>
  );
};

export const FloatingSphere = ({ position, color, scale = 1 }: FloatingProductProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

export const FloatingTorus = ({ position, color, scale = 1, speed = 1 }: FloatingProductProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.y += 0.008 * speed;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.4, 32, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};
