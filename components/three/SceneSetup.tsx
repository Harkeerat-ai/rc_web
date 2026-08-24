"use client";

// removed

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
    </>
  );
}
