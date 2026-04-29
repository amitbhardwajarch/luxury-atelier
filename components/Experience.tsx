"use client";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  useGLTF, OrbitControls, Environment, 
  ContactShadows, PerspectiveCamera, Float,
  useProgress, Html 
} from "@react-three/drei";
import * as THREE from "three";

function Table({ config }: any) {
  const { scene } = useGLTF("/models/modern_table.glb");

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.color = new THREE.Color(config.fabric);
          child.material.metalness = 0.2;
          child.material.roughness = 0.1;
        }
      }
    });
  }, [scene, config.fabric]);

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <primitive object={scene} scale={1.6} position={[0, 0, 0]} />
    </Float>
  );
}

function Atmosphere({ room }: { room: string }) {
  // These presets use real-world photographic lighting data
  const presets: any = {
    bedroom: { map: "apartment", bg: "#1a1a1a", intensity: 1 },
    drawing: { map: "lobby", bg: "#f0f0f0", intensity: 0.8 },
    lobby: { map: "city", bg: "#050505", intensity: 1.2 },
    study: { map: "warehouse", bg: "#222", intensity: 0.7 }
  };
  const active = presets[room] || presets.drawing;

  return (
    <>
      <Environment 
        preset={active.map} 
        background 
        blur={0.05} // Low blur makes the "room" feel real and sharp
      />
      <ambientLight intensity={active.intensity} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
    </>
  );
}

export default function Experience({ config }: any) {
  return (
    <div className="w-full h-full bg-black">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [5, 3, 5], fov: 40 }}>
        <Suspense fallback={<Html center className="text-white uppercase tracking-[1em] text-[10px]">Atelier Loading...</Html>}>
          
          <Atmosphere room={config.room} />
          
          <group position={[0, -1, 0]}>
            <Table config={config} />
            
            {/* The "Invisible" Shadow Floor - Makes the table look like it's ON the photo floor */}
            <ContactShadows 
              opacity={0.6} 
              scale={12} 
              blur={2.4} 
              far={4} 
              resolution={1024} 
              color="#000000" 
            />
          </group>

          <OrbitControls 
            makeDefault 
            autoRotate 
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 2} 
            minDistance={3}
            maxDistance={10}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}