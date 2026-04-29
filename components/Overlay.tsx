"use client";
import { motion } from "framer-motion";

export default function Overlay({ config, setConfig, price }: any) {
  const finishes = [
    { name: "Cream", color: "#f3f4f6" },
    { name: "Obsidian", color: "#171717" },
    { name: "Cognac", color: "#7c2d12" },
  ];

  const rooms = [
    { id: "city", name: "Modern Penthouse" },
    { id: "studio", name: "Art Gallery" },
    { id: "sunset", name: "Sunset Lounge" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 p-12 flex flex-col justify-between">
      <div className="flex justify-between items-start pointer-events-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-6xl font-serif tracking-tighter text-white mix-blend-difference">Atelier Zenith</h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-500 font-bold">Simulation v2.0</p>
        </motion.div>
        
        <div className="text-right pointer-events-auto">
          <p className="text-3xl font-serif text-white mix-blend-difference">${price.toLocaleString()}</p>
          <button className="mt-4 px-10 py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-black hover:text-white transition-all shadow-2xl">
            Inquire Bespoke
          </button>
        </div>
      </div>

      <div className="flex justify-between items-end pointer-events-auto">
        {/* ROOM SIMULATOR */}
        <div className="bg-black/20 backdrop-blur-3xl p-8 rounded-[30px] border border-white/10 text-white">
          <p className="text-[9px] uppercase tracking-[0.4em] mb-4 opacity-50">Select Environment</p>
          <div className="flex flex-col gap-2">
            {rooms.map((r) => (
              <button 
                key={r.id} 
                onClick={() => setConfig({...config, room: r.id})}
                className={`text-left text-[10px] uppercase tracking-widest transition-all ${config.room === r.id ? "text-white font-bold" : "text-white/40 hover:text-white"}`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* MATERIAL CONFIGURATOR */}
        <div className="bg-white/90 backdrop-blur-2xl p-10 rounded-[40px] shadow-2xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6 font-bold text-center">Bespoke Finish</p>
          <div className="flex gap-8">
            {finishes.map((f) => (
              <button
                key={f.name}
                onClick={() => setConfig({ ...config, fabric: f.color })}
                className="group flex flex-col items-center gap-3"
              >
                <div 
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-500 ${config.fabric === f.color ? 'border-black scale-125' : 'border-transparent'}`}
                  style={{ backgroundColor: f.color }}
                />
                <span className="text-[7px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{f.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}