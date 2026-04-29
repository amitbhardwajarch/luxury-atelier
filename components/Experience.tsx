"use client";
import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, Environment, ContactShadows, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

function Model({ config }: any) {
  const { scene }: any = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/sofa-leather/model.gltf");

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.color = new THREE.Color(config.fabric);
        }
      }
    });
  }, [scene, config.fabric]);

  return <primitive object={scene} scale={1.8} position={[0, -0.5, 0]} />;
}

export default function Experience({ config }: any) {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [5, 2, 5], fov: 35 }}>
      {/* Dynamic Environment Switcher */}
      <Suspense fallback={null}>
        <Environment preset={config.room} background blur={0.8} />
        
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
          />
        </mesh>
        <ContactShadows scale={15} blur={2} opacity={0.2} far={5} />
      </Suspense>

      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
}