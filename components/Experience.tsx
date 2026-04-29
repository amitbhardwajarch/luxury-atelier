"use client";
import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, Environment, ContactShadows, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

function TableModel({ config }: any) {
  // Use your local model
  const { scene } = useGLTF("/models/modern_table.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          if (child.material) {
            child.material.color = new THREE.Color(config.fabric);
            child.material.roughness = 0.3;
          }
        }
      });
    }
  }, [scene, config.fabric]);

  return <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

export default function Experience({ config }: any) {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [5, 3, 5], fov: 35 }}>
        <Suspense fallback={null}>
          {/* Room Atmosphere */}
          <Environment preset={config.room === "city" ? "city" : "apartment"} background blur={0.5} />
          
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            <TableModel config={config} />
          </Stage>

          {/* LUXURY FLOOR - This makes the user feel in a real room */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#151515"
              metalness={0.5}
            />
          </mesh>
          <ContactShadows opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>

        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}