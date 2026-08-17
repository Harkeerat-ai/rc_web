"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function FireflyField() {
  const count = 220;
  const meshRef = useRef<THREE.Points>(null);

  const [basePositions, phases, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phs = new Float32Array(count);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
      phs[i] = Math.random() * Math.PI * 2;
      vel[i] = 0.15 + Math.random() * 0.4;
    }
    return [pos, phs, vel];
  }, []);

  const positions = useMemo(() => basePositions.slice(), [basePositions]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const positionsAttr = meshRef.current.geometry.attributes.position;
    const array = positionsAttr.array as Float32Array;
    const sizesAttr = meshRef.current.geometry.attributes.aSize;
    const opacitiesAttr = meshRef.current.geometry.attributes.aOpacity;
    const sizeArray = sizesAttr.array as Float32Array;
    const opacityArray = opacitiesAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const phase = phases[i];
      const drift = Math.sin(time * 0.4 + phase) * 0.15;
      array[i * 3] = basePositions[i * 3] + drift;
      array[i * 3 + 1] =
        basePositions[i * 3 + 1] +
        Math.sin(time * velocities[i] + phase) * 1.6;
      array[i * 3 + 2] = basePositions[i * 3 + 2];

      sizeArray[i] = 0.04 + Math.max(0, Math.sin(time * 1.2 + phase)) * 0.05;
      opacityArray[i] =
        0.25 + Math.max(0, Math.sin(time * 1.2 + phase * 1.7)) * 0.45;
    }

    positionsAttr.needsUpdate = true;
    sizesAttr.needsUpdate = true;
    opacitiesAttr.needsUpdate = true;
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
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={new Float32Array(count).fill(0.04)}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          count={count}
          array={new Float32Array(count).fill(0.3)}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uColor: { value: new THREE.Color("#E2A83C") },
        }}
        vertexShader={`
          attribute float aSize;
          attribute float aOpacity;
          varying float vOpacity;
          void main() {
            vOpacity = aOpacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (260.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vOpacity;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d) * vOpacity;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  );
}

export default function Fireflies() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <motion.div style={{ y, scale: 1.2 }} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <FireflyField />
      </Canvas>
    </motion.div>
  );
}