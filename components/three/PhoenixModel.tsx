"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PhoenixModelProps {
  mouseX?: number;
  mouseY?: number;
  scrollProgress?: number;
}

function createFeatherShape(len: number, w: number): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(w * 0.6, len * 0.15, w * 0.7, len * 0.5, w * 0.3, len * 0.85);
  s.quadraticCurveTo(0, len, -w * 0.05, len);
  s.quadraticCurveTo(-w * 0.7, len * 0.5, -w * 0.6, len * 0.15);
  s.quadraticCurveTo(0, 0, 0, 0);
  return s;
}

function createSweptWingShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.8, 0.35, 1.8, 0.45, 2.6, 0.3);
  s.bezierCurveTo(3.0, 0.22, 3.2, 0.1, 3.0, -0.05);
  s.bezierCurveTo(2.6, -0.2, 1.8, -0.15, 1.2, -0.1);
  s.bezierCurveTo(0.6, -0.05, 0.2, 0, 0, 0);
  return s;
}

export default function PhoenixModel({ mouseX = 0, mouseY = 0, scrollProgress = 0 }: PhoenixModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const rightFeathers = useRef<THREE.Mesh[]>([]);
  const leftFeathers = useRef<THREE.Mesh[]>([]);
  const tailFeathers = useRef<THREE.Mesh[]>([]);
  const flamesRef = useRef<THREE.Mesh[]>([]);

  const model = useMemo(() => {
    const g = new THREE.Group();
    rightFeathers.current = [];
    leftFeathers.current = [];
    tailFeathers.current = [];
    flamesRef.current = [];

    const gold = new THREE.MeshStandardMaterial({ color: "#D4A030", metalness: 0.6, roughness: 0.3, emissive: "#D4A030", emissiveIntensity: 0.15 });
    const lightGold = new THREE.MeshStandardMaterial({ color: "#F0D060", metalness: 0.4, roughness: 0.3, emissive: "#F0D060", emissiveIntensity: 0.2 });
    const darkGold = new THREE.MeshStandardMaterial({ color: "#A07820", metalness: 0.5, roughness: 0.4, emissive: "#A07820", emissiveIntensity: 0.1 });
    const crimson = new THREE.MeshStandardMaterial({ color: "#B91C1C", metalness: 0.2, roughness: 0.5, emissive: "#B91C1C", emissiveIntensity: 0.2, side: THREE.DoubleSide });
    const wingGold = new THREE.MeshStandardMaterial({ color: "#C8961E", metalness: 0.4, roughness: 0.3, emissive: "#D4A030", emissiveIntensity: 0.2, side: THREE.DoubleSide });
    const crimsonGold = new THREE.MeshStandardMaterial({ color: "#B8860B", metalness: 0.4, roughness: 0.3, emissive: "#CD5C5C", emissiveIntensity: 0.2, side: THREE.DoubleSide });
    const eyeMat = new THREE.MeshStandardMaterial({ color: "#FFD700", emissive: "#FFD700", emissiveIntensity: 1.2 });
    const beakMat = new THREE.MeshStandardMaterial({ color: "#E8A030", metalness: 0.3, roughness: 0.5, emissive: "#D4A030", emissiveIntensity: 0.1 });

    const body = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 24), gold);
    body.scale.set(1.3, 0.85, 0.7);
    body.position.set(0, 0.05, 0);
    g.add(body);

    const chest = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), lightGold);
    chest.scale.set(1.2, 1.0, 0.8);
    chest.position.set(0, -0.02, -0.35);
    g.add(chest);

    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), lightGold);
    belly.scale.set(1.3, 0.6, 0.5);
    belly.position.set(0, -0.18, -0.1);
    g.add(belly);

    const neckMat = gold.clone();
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.07 - t * 0.015, 0.09 - t * 0.015, 0.07, 8), neckMat);
      const zPos = -0.35 - i * 0.07;
      const xOff = Math.sin(i * 0.45) * 0.04;
      const yPos = 0.15 + i * 0.065;
      seg.position.set(xOff, yPos, zPos);
      seg.rotation.z = Math.sin(i * 0.3) * 0.12;
      seg.rotation.x = -0.05 + t * 0.1;
      g.add(seg);
    }

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), lightGold);
    head.position.set(0, 0.52, -0.72);
    g.add(head);

    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.13, 6), beakMat);
    beak.rotation.x = 0.25;
    beak.position.set(0, 0.47, -0.84);
    g.add(beak);

    for (let i = 0; i < 5; i++) {
      const c = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.1 + i * 0.025, 4), lightGold);
      c.position.set((i - 2) * 0.025, 0.56 + i * 0.02, -0.68 + (i - 2) * 0.015);
      c.rotation.x = -0.2 + i * 0.12;
      (c.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + i * 0.1;
      g.add(c);
    }

    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), eyeMat);
      eye.position.set(side * 0.055, 0.535, -0.76);
      g.add(eye);
    }

    function makeWing(side: number) {
      const wg = new THREE.Group();

      const baseShape = createSweptWingShape();
      const baseGeo = new THREE.ShapeGeometry(baseShape);
      const baseMesh = new THREE.Mesh(baseGeo, wingGold);
      baseMesh.position.set(0, 0.05, 0);
      baseMesh.scale.z = side;
      wg.add(baseMesh);

      const counts = [6, 5, 4];

      for (let layer = 0; layer < 3; layer++) {
        const n = counts[layer];
        for (let i = 0; i < n; i++) {
          const t = i / (n - 1);
          const fLen = 0.3 + t * 0.35 + layer * 0.15;
          const fW = 0.03 + t * 0.04;
          const tilt = 0.1 - t * 0.15;

          const shape = createFeatherShape(fLen, fW);
          const cl = layer === 0 ? wingGold.clone() : crimsonGold.clone();
          const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), cl);

          const x = 0.4 + t * 1.8 + layer * 0.1;
          const y = (1 - t) * 0.06 + layer * 0.04;
          const zOff = (1 - t) * 0.06 * side + layer * 0.03 * side;

          mesh.position.set(x, y, zOff);
          mesh.rotation.z = tilt * side;
          mesh.scale.z = side;

          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15 + (1 - t) * 0.1;

          mesh.userData = { layer, idx: i, side, baseT: t };
          wg.add(mesh);

          if (side > 0) rightFeathers.current.push(mesh);
          else leftFeathers.current.push(mesh);
        }
      }

      return wg;
    }

    const rw = makeWing(1);
    rw.position.set(0, 0.12, 0.4);
    rw.name = "rightWing";
    g.add(rw);

    const lw = makeWing(-1);
    lw.position.set(0, 0.12, -0.4);
    lw.name = "leftWing";
    g.add(lw);

    const tg = new THREE.Group();
    tg.name = "tailGroup";
    tg.position.set(0, -0.15, 0.45);

    const tailCount = 9;
    for (let i = 0; i < tailCount; i++) {
      const t = (i - (tailCount - 1) / 2) / ((tailCount - 1) / 2);
      const fLen = 0.5 + (1 - Math.abs(t)) * 0.7;
      const fW = 0.025 + (1 - Math.abs(t)) * 0.025;
      const isCrimson = i % 2 === 0;
      const mat = isCrimson ? crimson.clone() : darkGold.clone();

      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(fW * 0.5, fLen * 0.2, fW * 0.6, fLen * 0.6, fW * 0.2, fLen * 0.85);
      shape.quadraticCurveTo(0, fLen, -fW * 0.2, fLen);
      shape.bezierCurveTo(-fW * 0.6, fLen * 0.6, -fW * 0.5, fLen * 0.2, 0, 0);

      const feather = new THREE.Mesh(new THREE.ShapeGeometry(shape), mat);
      feather.position.set(t * 0.12, -Math.abs(t) * 0.08 - 0.02, t * 0.08);
      feather.rotation.x = 0.25 + Math.abs(t) * 0.1;
      feather.rotation.z = t * 0.12;

      feather.userData = { tailIdx: i, t, baseLen: fLen };
      tg.add(feather);
      tailFeathers.current.push(feather);
    }

    g.add(tg);

    const flameMat = new THREE.MeshStandardMaterial({
      color: "#FF4400",
      emissive: "#FF2200",
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.55,
    });

    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.3;
      const r = 0.35 + Math.random() * 0.25;
      const fl = new THREE.Mesh(new THREE.SphereGeometry(0.025 + Math.random() * 0.03, 6, 6), flameMat.clone());
      fl.scale.y = 1.5 + Math.random() * 0.8;
      fl.position.set(Math.cos(angle) * r, -0.05 + Math.random() * 0.25, Math.sin(angle) * r);
      fl.userData = { angle, r, speed: 0.4 + Math.random() * 0.6, phase: Math.random() * Math.PI * 2, baseY: fl.position.y, baseScale: fl.scale.y };
      g.add(fl);
      flamesRef.current.push(fl);
    }

    for (const side of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.18, 6), darkGold);
      leg.position.set(side * 0.13, -0.28, 0.05);
      leg.rotation.z = side * 0.08;
      g.add(leg);

      for (let j = 0; j < 3; j++) {
        const talon = new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.035, 4), darkGold);
        talon.position.set(side * 0.13 + Math.cos(j * 2.1) * 0.035, -0.38, 0.05 + Math.sin(j * 2.1) * 0.035);
        talon.rotation.x = Math.sin(j * 2.1) * 0.35;
        g.add(talon);
      }
    }

    g.scale.setScalar(0.55);
    g.rotation.y = 0.15;
    return g;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    const targetRotY = mouseX * 0.4;
    const targetRotX = mouseY * 0.25;
    groupRef.current.rotation.y += (targetRotY - (groupRef.current.rotation.y - 0.15)) * 0.04;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;

    const baseY = Math.sin(t * 0.8) * 0.12;
    const s = 1 - scrollProgress * 0.7;
    groupRef.current.scale.setScalar(Math.max(0.25, 0.55 * s));
    groupRef.current.position.y = -scrollProgress * 3 + baseY;

    const rWing = groupRef.current.getObjectByName("rightWing");
    const lWing = groupRef.current.getObjectByName("leftWing");

    if (rWing && lWing) {
      const flap = Math.sin(t * 1.8) * 0.35;
      rWing.rotation.x = -0.4 + flap;
      lWing.rotation.x = 0.4 - flap;
    }

    rightFeathers.current.forEach((f, i) => {
      const phase = i * 0.3;
      f.rotation.x += Math.sin(t * 1.8 + phase) * 0.0008;
    });
    leftFeathers.current.forEach((f, i) => {
      const phase = i * 0.3;
      f.rotation.x += Math.sin(t * 1.8 + phase) * 0.0008;
    });

    const tg = groupRef.current.getObjectByName("tailGroup");
    if (tg) {
      tg.rotation.x = Math.sin(t * 1.2) * 0.06;
      tg.rotation.z = Math.sin(t * 0.7) * 0.04;
      tg.position.y = -0.15 + Math.sin(t * 1.5) * 0.02;
    }

    tailFeathers.current.forEach((f, i) => {
      const phase = i * 0.5;
      f.rotation.x += Math.sin(t * 1.2 + phase) * 0.0005;
      (f.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15 + Math.sin(t * 0.8 + phase) * 0.05;
    });

    interface FlameData { baseScale: number; speed: number; phase: number; }
    flamesRef.current.forEach((f) => {
      const u = f.userData as FlameData;
      f.scale.y = u.baseScale + Math.sin(t * u.speed + u.phase) * 0.3;
      (f.material as THREE.MeshStandardMaterial).opacity = 0.4 + Math.sin(t * u.speed + u.phase) * 0.15;
    });
  });

  return <primitive ref={groupRef} object={model} />;
}
