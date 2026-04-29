"use client";
import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  useGLTF, Stage, OrbitControls, Environment, 
  ContactShadows, MeshReflectorMaterial, PivotControls,
  PerspectiveCamera, Float
} from "@react-three/drei";
import * as THREE from "three";

function Table({ config }: any) {
  // Path to your 6MB model
  const { scene } = useGLTF("/models/modern_table.glb");

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.color = new THREE.Color(config.fabric);
        }
      }
    });
  }, [scene, config.fabric]);

  return (
    <PivotControls 
      activeAxes={[true, false, true]} // Only move on X and Z (the floor)
      depthTest={false} 
      anchor={[0, 0, 0]} 
      scale={0.75}
      lineWidth={2}
      fixed={false}
    >
      <primitive object={scene} scale={1.4} />
    </PivotControls>
  );
}

function Room({ type }: { type: string }) {
  // Supreme Room Textures/Colors
  const roomStyles: any = {
    bedroom: { wall: "#e3d5ca", floor: "#780000", env: "sunset", label: "Master Suite" },
    lobby: { wall: "#ffffff", floor: "#1a1a1a", env: "city", label: "Grand Lobby" },
    study: { wall: "#264653", floor: "#262626", env: "apartment", label: "Executive Study" },
    drawing: { wall: "#f8f9fa", floor: "#e5e5e5", env: "studio", label: "Main Atelier" }
  };

  const style = roomStyles[type] || roomStyles.drawing;

  return (
    <group>
      {/* WALLS (The Corner) */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color={style.wall} roughness={1} />
      </mesh>
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color={style.wall} roughness={1} />
      </mesh>

      {/* LUXURY REFLECTIVE FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={style.floor}
          metalness={0.5}
        />
      </mesh>
      <Environment preset={style.env} />
    </group>
  );
}

export default function Experience({ config }: any) {
  return (
    <div className="w-full h-full bg-[#111]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [8, 5, 8], fov: 35 }}>
        <Suspense fallback={null}>
          <Room type={config.room} />
          <Table config={config} />
          <ContactShadows opacity={0.4} scale={15} blur={2.5} far={10} />
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}