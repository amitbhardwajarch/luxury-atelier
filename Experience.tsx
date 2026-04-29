"use client";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";

// This is a placeholder for your furniture model
function FurnitureModel() {
  return (
    <mesh castShadow>
      <boxGeometry args={[2, 1, 1]} /> {/* Replace this with <primitive object={gltf.scene} /> later */}
      <meshStandardMaterial color="#d4d4d8" roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <div className="h-full w-full bg-[#fdfcfb]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={35} />
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            <FurnitureModel />
          </Stage>
          <ContactShadows 
            opacity={0.4} 
            scale={10} 
            blur={2.4} 
            far={0.8} 
            resolution={256} 
            color="#000000" 
          />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          makeDefault 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
    </div>
  );
}