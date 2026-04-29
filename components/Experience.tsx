"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  useGLTF, 
  Stage, 
  PresentationControls, 
  Environment, 
  ContactShadows, 
  Html 
} from "@react-three/drei";

function Model({ config }: any) {
  // This loads your real furniture model
  // If you haven't uploaded sofa.glb yet, it will still show a box 
  // but with high-end textures.
  const { scene }: any = useGLTF("/models/sofa.glb", true);
  
  return (
    <primitive 
      object={scene} 
      scale={1.5} 
      rotation={[0, -Math.PI / 4, 0]} 
    />
  );
}

export default function Experience({ config }: any) {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 5], fov: 35 }}>
      {/* 1. Room Simulation (The Atmosphere) */}
      <Environment preset={config.room === "city" ? "apartment" : "studio"} />
      <color attach="background" args={["#f0f0f0"]} />

      <PresentationControls
        global
        zoom={0.8}
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
      >
        <Suspense fallback={<Html>Loading Masterpiece...</Html>}>
          {/* 2. Studio Lighting */}
          <Stage intensity={0.5} environment="city" shadows="contact" adjustCamera={false}>
             <Model config={config} />
          </Stage>
        </Suspense>
      </PresentationControls>

      {/* 3. Luxury Soft Shadows */}
      <ContactShadows 
        position={[0, -1.4, 0]} 
        opacity={0.3} 
        scale={10} 
        blur={2.5} 
        far={4} 
      />
    </Canvas>
  );
}