"use client";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "../components/LoadingScreen";
import Overlay from "../components/Overlay";

// SSR: false is critical for 3D performance
const Experience = dynamic(() => import("../components/Experience"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState({ 
    fabric: "#f3f4f6", 
    room: "city", 
    item: "modern_table" 
  });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <LoadingScreen />;

  return (
    <main className="h-screen w-full bg-[#f8f7f4] overflow-hidden relative font-sans">
      <Suspense fallback={<LoadingScreen />}>
        <Experience config={config} />
      </Suspense>
      
      <Overlay config={config} setConfig={setConfig} price={4200} />
    </main>
  );
}