"use client";
import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  useGLTF, 
  Stage, 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  MeshReflectorMaterial
} from "@react-three/drei";
import * as THREE from "three";

function Model({ config }: any) {
  // Using a high-quality public sofa model for immediate results
  const { scene }: any = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/sofa-leather/model.gltf");

  useEffect(() => {
    // This logic finds the "Fabric" part of the 3D model and changes its color
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Apply the color from our UI to the model
        if (child.material) {
          child.material.color = new THREE.Color(config.fabric);
          child.material.roughness = 0.4;
        }
      }
    });
  }, [scene, config.fabric]);

  return <primitive object={scene} scale={2} position={[0, -0.5, 0]} />;
}

export default function Experience({ config }: any) {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [5, 2, 5], fov: 35 }}>
      <color attach="background" args={["#f8f7f4"]} />
      
      {/* Luxury Lighting */}
      <Suspense fallback={null}>
        <Stage intensity={0.5} environment="city" adjustCamera={false}>
          <Model config={config} />
        </Stage>

        {/* The Showroom Floor (Reflective) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.01, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#101010"
            metalness={0.5}
            mirror={0}
          />
        </mesh>

        <Environment preset="apartment" />
        <ContactShadows resolution={1024} scale={15} blur={2} opacity={0.15} far={5} />
      </Suspense>

      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 2} 
      />
    </Canvas>
  );
}