"use client";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "../components/LoadingScreen";
import Overlay from "../components/Overlay";

// SSR: false prevents the Vercel crash
const Experience = dynamic(() => import("../components/Experience"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState({ 
    fabric: "#f3f4f6", 
    room: "drawing", 
    item: "modern_table" 
  });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <LoadingScreen />;

  return (
    <main className="h-screen w-full bg-[#0a0a0a] overflow-hidden relative">
      {/* ROOM SIMULATOR SELECTOR */}
      <div className="absolute top-10 left-10 z-20 space-y-4 pointer-events-auto">
        <div className="bg-black/60 backdrop-blur-2xl p-8 rounded-[40px] border border-white/10 shadow-2xl w-64">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 font-bold text-center">Simulate Space</p>
          <div className="grid grid-cols-1 gap-3">
            {["bedroom", "drawing", "study", "lobby"].map((r) => (
              <button 
                key={r} 
                onClick={() => setConfig({...config, room: r})}
                className={`w-full py-3 rounded-full text-[9px] uppercase tracking-widest transition-all border ${config.room === r ? 'bg-white text-black border-white shadow-lg' : 'text-white border-white/10 hover:border-white/40'}`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/5 rounded-2xl">
            <p className="text-[8px] text-white/50 text-center leading-relaxed uppercase tracking-tighter">
              Use the axis arrows to move the table to any corner of the room.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<LoadingScreen />}>
        <Experience config={config} />
      </Suspense>
      
      <Overlay config={config} setConfig={setConfig} price={4200} />
    </main>
  );
}