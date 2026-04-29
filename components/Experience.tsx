"use client";
import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, Environment, ContactShadows, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

function Model({ config }: any) {
  // Points exactly to your 6MB file
  const { scene } = useGLTF("/models/modern_table.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            // This allows the color buttons to work on the table top
            child.material.color = new THREE.Color(config.fabric);
          }
        }
      });
    }
  }, [scene, config.fabric]);

  // Adjusted scale for a table (tables usually look better slightly smaller in 3D space)
  return <primitive object={scene} scale={1.2} position={[0, -0.2, 0]} />;
}

export default function Experience({ config }: any) {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]} shadows camera={{ position: [4, 2, 4], fov: 35 }}>
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment={config.room} adjustCamera={false}>
            <Model config={config} />
          </Stage>

          {/* The Luxury Showroom Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={50}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#1a1a1a"
              metalness={0.5}
            />
          </mesh>
          <Environment preset={config.room} />
          <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.1} // Prevents looking under the floor
        />
      </Canvas>
    </div>
  );
}