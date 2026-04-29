"use client";
import { motion } from "framer-motion";

export default function Overlay({ config, setConfig, price }: any) {
  const rooms = [
    { id: "lobby", name: "Modern Grand Lobby" },
    { id: "drawing", name: "Minimalist Atelier" },
    { id: "bedroom", name: "Warm Suite" },
    { id: "study", name: "Executive Study" }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-10">
      {/* Top Section */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="bg-white/5 backdrop-blur-md p-6 border border-white/10 rounded-sm">
          <h1 className="text-2xl font-serif text-white tracking-tighter uppercase">Zenith</h1>
          <p className="text-[8px] tracking-[0.5em] text-white/40 uppercase">Interactive Interior Edition</p>
        </div>
        
        <div className="text-right">
          <p className="text-3xl font-serif text-white">${price.toLocaleString()}</p>
          <button className="mt-4 px-8 py-3 bg-white text-black text-[9px] font-bold uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all pointer-events-auto">
            Book Consultation
          </button>
        </div>
      </div>

      {/* Center Instruction (Fades away) */}
      <motion.div 
        initial={{ opacity: 0.5 }} animate={{ opacity: 0 }} transition={{ delay: 3, duration: 2 }}
        className="text-center text-white/20 text-[10px] uppercase tracking-[1em]"
      >
        Rotate to Explore Space
      </motion.div>

      {/* Bottom Section: The Room Simulator */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 pointer-events-auto">
        
        <div className="flex flex-col gap-2">
          <p className="text-[9px] uppercase tracking-widest text-white/40 mb-2">Simulate Environment</p>
          <div className="flex flex-wrap gap-2 max-w-sm">
            {rooms.map((r) => (
              <button 
                key={r.id} 
                onClick={() => setConfig({...config, room: r.id})}
                className={`px-4 py-2 text-[9px] uppercase tracking-widest transition-all border ${config.room === r.id ? 'bg-white text-black border-white' : 'text-white border-white/20 hover:border-white'}`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-black/80 backdrop-blur-3xl p-8 rounded-full border border-white/5 flex gap-6">
          {['#f3f4f6', '#171717', '#7c2d12'].map((c) => (
            <button 
              key={c} 
              onClick={() => setConfig({...config, fabric: c})}
              className={`w-10 h-10 rounded-full border-2 transition-all ${config.fabric === c ? 'border-white scale-125' : 'border-transparent scale-100 hover:scale-110'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}