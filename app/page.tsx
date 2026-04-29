"use client";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "../components/LoadingScreen";
import Overlay from "../components/Overlay";

// CRITICAL FIX: This disables Server-Side Rendering for the 3D part
const Experience = dynamic(() => import("../components/Experience"), { 
  ssr: false,
  loading: () => <LoadingScreen /> 
});

export default function Home() {
  const [config, setConfig] = useState({ 
    fabric: "#f3f4f6", 
    room: "city" 
  });
  const [price] = useState(8400);

  return (
    <main className="h-screen w-full bg-[#f8f7f4] overflow-hidden relative">
      <Suspense fallback={<LoadingScreen />}>
        {/* The 3D scene only loads on the client side now */}
        <Experience config={config} />
      </Suspense>
      
      <Overlay config={config} setConfig={setConfig} price={price} />
    </main>
  );
}