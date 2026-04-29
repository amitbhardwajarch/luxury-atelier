"use client";
import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, Environment, ContactShadows, MeshReflectorMaterial, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";

function Model({ config }: any) {
  // Path points to your public/models folder
  const { scene } = useGLTF(`/models/${config.item}.glb`);

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            // Apply the UI color to the model
            child.material.color = new THREE.Color(config.fabric);
          }
        }
      });
    }
  }, [scene, config.fabric]);

  return <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

// Custom Loader for big files like the 45MB Bed
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center bg-white/80 p-10 rounded-full backdrop-blur-md shadow-2xl">
        <div className="text-[10px] uppercase tracking-[0.5em] font-bold mb-2">Downloading Luxury</div>
        <div className="w-24 h-[2px] bg-black/10">
          <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 text-[8px] font-mono">{Math.round(progress)}%</div>
      </div>
    </Html>
  );
}

export default function Experience({ config }: any) {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]} shadows camera={{ position: [5, 2, 5], fov: 35 }}>
        <Suspense fallback={<Loader />}>
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
              color="#151515"
              metalness={0.5}
            />
          </mesh>
          <Environment preset={config.room} />
          <ContactShadows opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>
        <OrbitControls enablePan={false} autoRotate />
      </Canvas>
    </div>
  );
}