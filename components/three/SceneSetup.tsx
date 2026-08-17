"use client";

import { Environment, ContactShadows } from "@react-three/drei";

export default function SceneSetup() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        color="#E2A83C"
      />
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.5}
        color="#C85A1E"
      />
      <Environment preset="sunset" />
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
      />
    </>
  );
}
