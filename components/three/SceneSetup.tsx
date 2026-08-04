"use client";

import { Environment, ContactShadows } from "@react-three/drei";

export default function SceneSetup() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        color="#D4A030"
      />
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.5}
        color="#B91C1C"
      />
      <Environment preset="night" />
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
      />
    </>
  );
}
