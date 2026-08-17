"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneSetup from "./SceneSetup";

function FireParticles({ count = 500 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i] = 0.5 + Math.random() * 1.5;
      off[i] = Math.random() * Math.PI * 2;
    }
    return [pos, vel, off];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionsAttr = meshRef.current.geometry.attributes.position;
    const array = positionsAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3] += Math.sin(time * 0.5 + offsets[i]) * 0.002;
      array[i * 3 + 1] += velocities[i] * 0.008;
      array[i * 3 + 2] += Math.cos(time * 0.3 + offsets[i]) * 0.002;

      if (array[i * 3 + 1] > 3) {
        array[i * 3] = (Math.random() - 0.5) * 6;
        array[i * 3 + 1] = -2;
        array[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#C85A1E"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <SceneSetup />
      <FireParticles />
    </Canvas>
  );
}
