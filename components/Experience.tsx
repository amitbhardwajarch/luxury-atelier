"use client";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, Environment, ContactShadows, MeshReflectorMaterial, Html } from "@react-three/drei";
import * as THREE from "three";

function Model({ config }: any) {
  // Use a different, more reliable public model URL
  const { scene } = useGLTF("https://raw.githubusercontent.com/pmndrs/drei-assets/master/cup.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.color = new THREE.Color(config.fabric);
          }
        }
      });
    }
  }, [scene, config.fabric]);

  return <primitive object={scene} scale={2} />;
}

// FALLBACK COMPONENT (Shows while loading or if model fails)
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.4em] font-bold">Refining Details...</p>
      </div>
    </Html>
  );
}

export default function Experience({ config }: any) {
  return (
    <div className="w-full h-full bg-[#f8f7f4]">
      <Canvas dpr={[1, 2]} shadows camera={{ position: [5, 2, 5], fov: 35 }}>
        <Suspense fallback={<LoadingFallback />}>
          <Stage intensity={0.5} environment={config.room} adjustCamera={false}>
            <Model config={config} />
          </Stage>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
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
              color="#202020"
              metalness={0.5}
              mirror={1}
            />
          </mesh>
          
          <Environment preset={config.room} />
          <ContactShadows scale={15} blur={2} opacity={0.2} far={5} />
        </Suspense>

        <OrbitControls enablePan={false} enableZoom={false} makeDefault />
      </Canvas>
    </div>
  );
}