"use client";
import { motion } from "framer-motion";

export default function Overlay({ config, setConfig, price }: any) {
  const finishes = [
    { name: "Ivory Bouclé", color: "#f3f4f6" },
    { name: "Obsidian Leather", color: "#171717" },
    { name: "Cognac Velvet", color: "#7c2d12" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 p-12 flex flex-col justify-between">
      <div className="flex justify-between items-start pointer-events-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-6xl font-serif tracking-tighter text-black">Atelier Zenith</h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 font-bold ml-1">Bespoke Italian Craft</p>
        </motion.div>
        
        <div className="text-right pointer-events-auto">
          <p className="text-3xl font-serif">${price.toLocaleString()}</p>
          <button className="mt-4 px-10 py-4 bg-black text-white text-[10px] uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-transform shadow-2xl">
            Order Commission
          </button>
        </div>
      </div>

      <div className="flex justify-between items-end pointer-events-auto">
        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[40px] shadow-2xl border border-white/50">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6 font-bold">Configure Surface</p>
          <div className="flex gap-8">
            {finishes.map((f) => (
              <button
                key={f.name}
                onClick={() => setConfig({ ...config, fabric: f.color })}
                className="group flex flex-col items-center gap-3"
              >
                <div 
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-500 ${config.fabric === f.color ? 'border-black scale-125' : 'border-transparent'}`}
                  style={{ backgroundColor: f.color }}
                />
                <span className="text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-[9px] uppercase tracking-[0.5em] text-gray-400 max-w-[200px] leading-relaxed text-right">
          Interactive Simulation v1.0 <br />
          360° Studio View Enabled
        </div>
      </div>
    </div>
  );
}