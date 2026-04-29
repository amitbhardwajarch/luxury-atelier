"use client";
import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, Environment, ContactShadows, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

function Model({ config }: any) {
  // Using a very stable, lightweight model for testing
  const { scene } = useGLTF("https://raw.githubusercontent.com/pmndrs/drei-assets/master/cup.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.color = new THREE.Color(config.fabric);
          }
        }
      });
    }
  }, [scene, config.fabric]);

  return <primitive object={scene} scale={2.5} />;
}

export default function Experience({ config }: any) {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]} shadows camera={{ position: [5, 2, 5], fov: 35 }}>
        <Suspense fallback={null}>
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
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
}