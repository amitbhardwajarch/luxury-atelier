"use client";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "../components/LoadingScreen";
import Overlay from "../components/Overlay";

const Experience = dynamic(() => import("../components/Experience"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState({ 
    fabric: "#f3f4f6", 
    room: "city", 
    item: "modern_table" // Default model
  });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <LoadingScreen />;

  return (
    <main className="h-screen w-full bg-[#f8f7f4] overflow-hidden relative">
      {/* MODEL SELECTION MENU */}
      <div className="absolute top-24 left-10 z-20 space-y-4 pointer-events-auto">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">The Collection</p>
        <div className="flex flex-col gap-2">
          {["bed", "modern_table", "office_table"].map((m) => (
            <button 
              key={m} 
              onClick={() => setConfig({...config, item: m})}
              className={`text-left text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition-all ${config.item === m ? 'bg-black text-white' : 'bg-white/50 text-black border-black/10 hover:bg-white'}`}
            >
              {m.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <Suspense fallback={<LoadingScreen />}>
        <Experience config={config} />
      </Suspense>
      
      <Overlay config={config} setConfig={setConfig} price={8400} />
    </main>
  );
}