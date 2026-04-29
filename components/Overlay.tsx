"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Overlay({ config, setConfig, price }: any) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* HUD UI */}
      <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-12">
        <header className="flex justify-between items-start pointer-events-auto">
          <div>
            <h2 className="text-3xl font-serif italic text-white mix-blend-difference">The Zenith Sofa</h2>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Collection 2025</p>
          </div>
          <div className="text-right">
             <p className="text-2xl font-serif text-white mix-blend-difference">${price.toLocaleString()}</p>
             <button onClick={() => setShowForm(true)} className="mt-4 px-8 py-3 bg-white text-black text-[10px] uppercase tracking-widest hover:invert transition-all rounded-full pointer-events-auto">
               Request Bespoke Quote
             </button>
          </div>
        </header>

        <footer className="flex justify-between items-end pointer-events-auto">
          <div className="space-y-6">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-2">Select Finish</p>
              <div className="flex gap-4">
                {["#d4d4d8", "#262626", "#451a03"].map(c => (
                  <button key={c} onClick={() => setConfig({...config, fabric: c})} style={{backgroundColor: c}} className="w-8 h-8 rounded-full border border-white/20" />
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* MODAL FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="max-w-md w-full bg-white p-12 rounded-3xl">
              <button onClick={() => setShowForm(false)} className="float-right text-xs uppercase tracking-widest">Close</button>
              <h3 className="text-3xl font-serif mb-8">Bespoke Inquiry</h3>
              <form className="space-y-6">
                <input type="text" placeholder="FULL NAME" className="w-full border-b border-black/10 py-4 text-xs tracking-widest focus:outline-none focus:border-black" />
                <input type="email" placeholder="EMAIL ADDRESS" className="w-full border-b border-black/10 py-4 text-xs tracking-widest focus:outline-none focus:border-black" />
                <textarea placeholder="SPECIAL REQUIREMENTS" className="w-full border-b border-black/10 py-4 text-xs tracking-widest h-24 focus:outline-none focus:border-black" />
                <button className="w-full bg-black text-white py-6 text-[10px] uppercase tracking-widest">Send Request</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}