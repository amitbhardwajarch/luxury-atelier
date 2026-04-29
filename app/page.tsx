"use client";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "../components/LoadingScreen";
import Overlay from "../components/Overlay";

// SSR: false is mandatory to prevent the white screen crash
const Experience = dynamic(() => import("../components/Experience"), { 
  ssr: false,
  loading: () => <LoadingScreen />
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState({ fabric: "#f3f4f6", room: "city" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingScreen />;

  return (
    <main className="relative w-screen h-screen bg-[#050505] overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<LoadingScreen />}>
          <Experience config={config} />
        </Suspense>
      </div>

      {/* UI Overlay Layer */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        <Overlay config={config} setConfig={setConfig} price={4200} />
      </div>
    </main>
  );
}