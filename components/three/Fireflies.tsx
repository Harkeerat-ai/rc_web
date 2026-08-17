"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function FireflyField() {
  const count = 320;
  const meshRef = useRef<THREE.Points>(null);

  const [basePositions, phases, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phs = new Float32Array(count);
    const vel = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#E8B85C"),
      new THREE.Color("#C85A1E"),
      new THREE.Color("#F0C469"),
      new THREE.Color("#E3B250"),
      new THREE.Color("#F5D98A"),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
      phs[i] = Math.random() * Math.PI * 2;
      vel[i] = 0.15 + Math.random() * 0.4;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, phs, vel, col];
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

      sizeArray[i] = 0.1 + Math.max(0, Math.sin(time * 1.2 + phase)) * 0.08;
      opacityArray[i] =
        0.4 + Math.max(0, Math.sin(time * 1.2 + phase * 1.7)) * 0.4;
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
          array={new Float32Array(count).fill(0.1)}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          count={count}
          array={new Float32Array(count).fill(0.4)}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float aSize;
          attribute float aOpacity;
          attribute vec3 aColor;
          varying float vOpacity;
          varying vec3 vColor;
          void main() {
            vOpacity = aOpacity;
            vColor = aColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (260.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vOpacity;
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float core = smoothstep(0.3, 0.0, d) * vOpacity;
            float halo = smoothstep(0.5, 0.2, d) * vOpacity * 0.45;
            float alpha = core + halo;
            gl_FragColor = vec4(vColor, alpha);
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