"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AmbientScene() {
  const count = 100;
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10 - 5
        ),
        velocity: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      pos[i * 3] = p.position.x;
      pos[i * 3 + 1] = p.position.y;
      pos[i * 3 + 2] = p.position.z;
    });
    return pos;
  }, [particles]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const positionsAttr = meshRef.current.geometry.attributes.position;
    const array = positionsAttr.array as Float32Array;

    particles.forEach((p, i) => {
      array[i * 3 + 1] =
        p.position.y + Math.sin(time * p.velocity + p.offset) * 1.5;
    });

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
        size={0.05}
        color="#D4A030"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
